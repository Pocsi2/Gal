import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const gallery = JSON.parse(await fs.readFile(path.join(root, 'src', 'content', 'gallery.json'), 'utf8'));
const contacts = JSON.parse(await fs.readFile(path.join(root, 'src', 'config', 'contact.json'), 'utf8'));
const manifest = JSON.parse(await fs.readFile(path.join(root, 'src', 'content', 'generated-manifest.json'), 'utf8'));
const errors = [];
const records = [...gallery.artworks, ...gallery.objects];
if (!gallery.opening.alt?.trim()) errors.push('Missing opening image alt text.');
if (gallery.artworks.some((work) => work.title !== null || work.year !== null || work.medium !== null)) errors.push('Unconfirmed artwork metadata must remain null.');
if (gallery.objects.some((object) => object.associationConfirmed !== false)) errors.push('Unconfirmed object associations must remain unconfirmed.');
const exhibitionIds = gallery.exhibitionImageIds ?? [];
const emergencyIds = gallery.emergencyReferenceImageIds ?? [];
const archivedStudyIds = gallery.archivedStudyImageIds ?? [];
const catalogIds = new Set(records.map((record) => record.imageId));
const assignedIds = [...exhibitionIds, ...emergencyIds, ...archivedStudyIds];
if (new Set(assignedIds).size !== manifest.images.length || assignedIds.some((id) => !catalogIds.has(id))) {
  errors.push('Every source image must be assigned once to the exhibition, archived studies, or emergency references.');
}
if (exhibitionIds.length !== 11) errors.push('The public exhibition must contain 11 selected images.');
if (emergencyIds.length !== 12) errors.push('The emergency reference list must contain 12 images.');
if (archivedStudyIds.length !== 6) errors.push('Six repetitive object studies must stay archived from the public exhibition.');
const objectDisplayIds = exhibitionIds.filter((id) => gallery.objects.some((object) => object.imageId === id));
if (objectDisplayIds.length !== 6) errors.push('The public exhibition must show six selected object studies.');
const referencedIds = [gallery.opening.imageId, ...assignedIds];
const seenIds = new Set();
const assetsById = new Map(manifest.images.map((image) => [image.id, image]));

for (const record of records) {
  if (seenIds.has(record.id)) errors.push(`Duplicate content id: ${record.id}`);
  seenIds.add(record.id);
  if (!record.alt?.trim()) errors.push(`Missing alt text: ${record.id}`);
}
for (const imageId of referencedIds) {
  const image = assetsById.get(imageId);
  if (!image) {
    errors.push(`Missing generated image manifest entry: ${imageId}`);
    continue;
  }
  if (!image.variants?.length) errors.push(`Missing responsive variants: ${imageId}`);
  for (const variant of image.variants ?? []) {
    if (!await fs.stat(path.join(root, 'public', variant.path.replace(/^\//, ''))).catch(() => null)) {
      errors.push(`Missing image asset: ${variant.path}`);
    }
  }
}
if (contacts.platform !== 'Telegram' || contacts.handle !== '@thicklll') errors.push('The only configured contact must be Telegram @thicklll.');
if (gallery.artworks.length !== 7) errors.push('Expected seven catalogued image studies from the supplied collection.');
if (gallery.objects.length !== 22) errors.push('Expected all 22 catalogued object studies from the supplied collection.');
if (gallery.objects.some((object) => object.availability !== null || object.price !== null)) errors.push('Availability and price must stay unconfirmed.');
if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Content checks passed: ${exhibitionIds.length} exhibited images, ${archivedStudyIds.length} archived repetitive studies, ${emergencyIds.length} emergency references, ${manifest.images.length} distinct source images, Telegram only.`);
}

