import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const inputPath = path.join(root, 'assets', 'originals', 'One b.jfif');
const outputRoot = path.join(root, 'public', 'images');
await fs.mkdir(outputRoot, { recursive: true });

const metadata = await sharp(inputPath).metadata();
if (!metadata.width || !metadata.height) throw new Error('Could not read One b dimensions.');

for (const width of [480, 768, metadata.width]) {
  const { data, info } = await sharp(inputPath)
    .resize({ width, withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);

  for (let sourceOffset = 0, targetOffset = 0; sourceOffset < data.length; sourceOffset += 3, targetOffset += 4) {
    const luminance = Math.round((data[sourceOffset] + data[sourceOffset + 1] + data[sourceOffset + 2]) / 3);
    rgba[targetOffset] = 0;
    rgba[targetOffset + 1] = 0;
    rgba[targetOffset + 2] = 0;
    rgba[targetOffset + 3] = 255 - luminance;
  }

  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 90, effort: 6 })
    .toFile(path.join(outputRoot, `one-b-${info.width}.webp`));
}

console.log('Built transparent responsive variants for the closing One b artwork.');
