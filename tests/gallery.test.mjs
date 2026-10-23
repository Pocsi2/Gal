import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const gallery = JSON.parse(await readFile(path.join(root, 'src/content/gallery.json'), 'utf8'));
const contact = JSON.parse(await readFile(path.join(root, 'src/config/contact.json'), 'utf8'));
const images = JSON.parse(await readFile(path.join(root, 'src/content/generated-manifest.json'), 'utf8'));
const byId = new Map(images.images.map((image) => [image.id, image]));

test('the exhibition presents four works in sequence without inventing metadata', () => {
  assert.equal(gallery.artworks.length, 4);
  assert.deepEqual(gallery.artworks.map((work) => work.order), [1, 2, 3, 4]);
  for (const work of gallery.artworks) {
    assert.ok(work.alt.trim());
    assert.equal(work.title, null);
    assert.equal(work.year, null);
    assert.equal(work.medium, null);
  }
});

test('object studies do not promise stock or price or assert an unconfirmed association', () => {
  assert.equal(gallery.objects.length, 8);
  for (const object of gallery.objects) {
    assert.ok(object.alt.trim());
    assert.equal(object.availability, null);
    assert.equal(object.price, null);
    assert.equal(object.associationConfirmed, false);
  }
});

test('Telegram is the sole contact and no unverified destination is configured', () => {
  assert.deepEqual(contact, { platform: 'Telegram', handle: '@thicklll', destinationVerified: false });
});

test('every artwork and object image has responsive local WebP variants', async () => {
  const ids = [gallery.opening.imageId, ...gallery.artworks.map((work) => work.imageId), ...gallery.objects.map((object) => object.imageId)];
  for (const id of ids) {
    const image = byId.get(id);
    assert.ok(image, `missing image manifest entry ${id}`);
    assert.ok(image.variants.length > 0, `missing responsive variants ${id}`);
    for (const variant of image.variants) {
      assert.ok(variant.path.startsWith('/images/'));
      assert.ok((await stat(path.join(root, 'public', variant.path.slice(1)))).size > 0);
      assert.ok(variant.path.endsWith('.webp'));
    }
  }
});

test('the responsive and reduced-motion compositions are present', async () => {
  const css = await readFile(path.join(root, 'src/app/globals.css'), 'utf8');
  const imageComponent = await readFile(path.join(root, 'src/components/ResponsiveImage.tsx'), 'utf8');
  assert.match(css, /@media\s*\(max-width:\s*560px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(imageComponent, /srcSet=/);
  assert.match(imageComponent, /sizes=/);
});

test('keyboard skip access and a live contact status are included', async () => {
  const layout = await readFile(path.join(root, 'src/app/layout.tsx'), 'utf8');
  const contactComponent = await readFile(path.join(root, 'src/components/TelegramInvitation.tsx'), 'utf8');
  assert.match(layout, /Skip to the showcase/);
  assert.match(contactComponent, /aria-live="polite"/);
  assert.match(contactComponent, /Copy Telegram handle/);
});
