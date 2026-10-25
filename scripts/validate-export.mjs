import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'out');
const errors = [];
for (const route of ['index.html', 'robots.txt', 'icon.svg', '404.html']) {
  if (!await fs.stat(path.join(output, route)).catch(() => null)) errors.push(`Missing static route/file: ${route}`);
}

const html = await fs.readFile(path.join(output, 'index.html'), 'utf8').catch(() => '');
if (!html.includes('<title>Resilient Explorations</title>')) errors.push('Gallery title is missing from the exported page.');
if (!html.includes('A Life of') || !html.includes('Frames from this stage’s exploration.') || !html.includes('Move through them at your own pace.')) {
  errors.push('The stage-exploration introduction is missing from the exported page.');
}
if (!html.includes('showcase of this stage')) errors.push('Stage-exploration framing is missing from the exported page.');
if (!html.includes('Six paired arrangements of object studies')) errors.push('Paired object presentation is missing from the exported page.');
if (!html.includes('@thicklll')) errors.push('Telegram handle is missing from the exported page.');
if (!html.includes('Copy Telegram handle')) errors.push('Telegram contact action is missing from the exported page.');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
if (basePath && (!html.includes(`${basePath}/images/`) || !html.includes(`${basePath}/_next/`))) {
  errors.push(`GitHub Pages base path is missing from exported assets: ${basePath}`);
}
if (html.includes('C:\\Users\\HP') || html.includes('C:/Users/HP')) errors.push('A local Windows path leaked into the exported page.');

const imagePaths = [...new Set([...html.matchAll(/\/images\/[a-z0-9-]+\.webp/gi)].map((match) => match[0]))];
for (const imagePath of imagePaths) {
  const relative = imagePath.replace(/^.*\/images\//, 'images/');
  if (!await fs.stat(path.join(output, relative)).catch(() => null)) errors.push(`Missing exported image: ${imagePath}`);
}
if (imagePaths.length === 0) errors.push('No responsive artwork images were found in the export.');

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Static export checks passed: required files present, ${imagePaths.length} referenced image variants found, no local Windows paths.`);
}
