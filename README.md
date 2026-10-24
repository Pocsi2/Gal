# Explorations — 2026

A quiet digital exhibition: a showcase of this year's exploration through image, gesture, and object. The opening is a single artwork; the image field then makes all 28 distinct images available through a full-frame viewer, keyboard and touch navigation, and a complete visual index. Object interpretations remain studies with no cart, checkout, price, stock, or availability claim. Telegram `@thicklll` is the sole contact.

Live site: <https://pocsi2.github.io/Gal/>.

## Local setup

Requirements: Node.js 24 LTS (or Node.js 20.9+), npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Checks and production export

```bash
npm test
npm run content:check
npm run typecheck
npm run build
npm run export:check
npm run preview
```

The static export is written to `out/`. `npm run preview` serves it locally at `http://localhost:4173`. The deployed site needs no server or database.

## Image pipeline

- `assets/originals/` contains unchanged copies of 28 unique images from the supplied folder. The 29-file inventory includes one exact duplicate, which is documented but not repeated in the visual sequence.
- `assets/image-sources.json` maps the source files to stable IDs, image descriptions, filename-led groups, and presentation roles.
- Run `npm run assets:build` to generate responsive WebP variants in `public/images/` and update `src/content/generated-manifest.json`.
- The static image field uses native `srcset` and `sizes`; it does not require a runtime image optimizer. The image pipeline also samples a restrained, darkened ground color for each image so the exhibition atmosphere shifts with the artwork.
- Original assets are kept outside `public/`; only optimized derivatives are served.
- The full read-only inventory is in `docs/asset-manifest.csv` and `docs/asset-manifest.json`.

## Content editing

Unconfirmed artwork facts remain `null` in `src/content/gallery.json`. The six image studies have no invented titles, years, or media. The 22 object studies have no asserted artwork association, specifications, price, or availability. `src/config/contact.json` is the only contact configuration; it contains Telegram `@thicklll` only. The visible handle is copyable. The destination is not linked until verified.

## GitHub Pages

The GitHub Actions workflow builds and deploys the static export after pushes to `main`. Pull requests run the same checks and build without deployment. The configured live URL is <https://pocsi2.github.io/Gal/>.

The workflow computes the correct repository path for both project pages and `username.github.io` sites. For a custom domain, configure it through GitHub Pages settings and DNS.

## Design and motion

The image field follows `docs/design-board.md`. The visitor can move frame by frame, use left/right keys, swipe on touch screens, or choose from the complete horizontal filmstrip. Each image is presented at a scale suited to its natural orientation, against a color sampled from the image itself. CSS provides a restrained image transition and a blurred echo of the active frame; there is no auto-advance. Reduced-motion visitors receive a static, complete presentation. Scroll remains native, with no WebGL, scroll hijacking, hover-only action, cart, or checkout.

## Project structure

```text
src/app/                 static page, metadata, and global CSS
src/components/          responsive image, image explorer, reveal behavior, Telegram action
src/config/              centralized contact configuration
src/content/             artwork/object data and generated image map
src/lib/                 GitHub Pages base-path helper
assets/originals/         unchanged source copies (not served by the site)
assets/image-sources.json source-to-ID and visual-description map
public/images/            responsive WebP output served by the site
scripts/                  image generation, preview, and validation
tests/                    Node built-in content and interaction checks
.github/workflows/        build and Pages deployment
```

## Initial performance budgets

- Mobile lead image: target at or below 500 KB; desktop lead image: target at or below 1.2 MB.
- Keep initial route JavaScript at or below 150 KB compressed where practical.
- Track LCP at or below 2.5 s, CLS at or below 0.1, and INP at or below 200 ms on a representative mobile profile before public release.
- The 70 responsive WebP variants total about 2.47 MB; the browser selects only the active full-size image and suitable thumbnail candidates.

## Before public release

Confirm artist identity, work titles/year/medium, mockup associations, object details, and Telegram destination. Until supplied, the site uses visual descriptions, a copyable Telegram handle, and no availability or pricing claims.
