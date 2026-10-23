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
    variants,
  });
}

await fs.writeFile(path.join(root, 'src', 'content', 'generated-manifest.json'), JSON.stringify({ generatedAt: new Date().toISOString(), format: 'webp', quality: 86, images: built }, null, 2) + '\n');
console.log(`Built ${built.length} responsive image sets (${built.reduce((n, image) => n + image.variants.length, 0)} WebP files).`);

