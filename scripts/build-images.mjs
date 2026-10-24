import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const root = process.cwd();
const sourceRoot = path.join(root, 'assets', 'originals');
const outputRoot = path.join(root, 'public', 'images');
const map = JSON.parse(await fs.readFile(path.join(root, 'assets', 'image-sources.json'), 'utf8'));
const widths = [480, 768, 1200, 1600, 2000];
await fs.mkdir(outputRoot, { recursive: true });
const built = [];

for (const source of map.sources) {
  const sourcePath = path.join(sourceRoot, source.file);
  const input = await fs.readFile(sourcePath);
  const sourceHash = crypto.createHash('sha256').update(input).digest('hex');
  const metadata = await sharp(input, { animated: false }).rotate().metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Could not read dimensions for ${source.file}`);
  const edgePixels = await sharp(input, { animated: false })
    .rotate()
    .flatten({ background: '#090909' })
    .resize(32, 32, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer();
  const border = [];
  for (let y = 0; y < 32; y += 1) {
    for (let x = 0; x < 32; x += 1) {
      if (x < 2 || x >= 30 || y < 2 || y >= 30) border.push((y * 32 + x) * 3);
    }
  }
  const edgeColor = [0, 1, 2].map((channel) => border.reduce((sum, offset) => sum + edgePixels[offset + channel], 0) / border.length);
  const groundColor = `#${edgeColor.map((channel) => Math.max(8, Math.min(68, Math.round(channel * 0.34))).toString(16).padStart(2, '0')).join('')}`;
  const sourceWidth = metadata.width;
  const variants = [];
  const targetWidths = [...new Set([...widths.filter((width) => width < sourceWidth), sourceWidth])].sort((a, b) => a - b);

  for (const width of targetWidths) {
    const fileName = `${source.id}-${width}.webp`;
    const outputPath = path.join(outputRoot, fileName);
    await sharp(input, { animated: false })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6, smartSubsample: true })
      .toFile(outputPath);
    const outputMetadata = await sharp(outputPath).metadata();
    const stat = await fs.stat(outputPath);
    variants.push({ width: outputMetadata.width, height: outputMetadata.height, path: `/images/${fileName}`, bytes: stat.size });
  }

  built.push({
    id: source.id,
    sourceFilename: source.file,
    role: source.role,
    group: source.group,
    alt: source.alt,
    sourceHash,
    sourceFormat: metadata.format,
    sourceWidth,
    sourceHeight: metadata.height,
    orientation: sourceWidth > metadata.height ? 'landscape' : sourceWidth < metadata.height ? 'portrait' : 'square',
    groundColor,
    variants,
  });
}

await fs.writeFile(path.join(root, 'src', 'content', 'generated-manifest.json'), JSON.stringify({ generatedAt: new Date().toISOString(), format: 'webp', quality: 86, images: built }, null, 2) + '\n');
console.log(`Built ${built.length} responsive image sets (${built.reduce((n, image) => n + image.variants.length, 0)} WebP files).`);

