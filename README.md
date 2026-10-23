# Explorations — 2026

A quiet digital exhibition: a showcase of this year's exploration through image, gesture, and object. Artworks lead. Object mockups appear as studies, with no cart, checkout, price, or stock claim. Telegram `@thicklll` is the sole contact.

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

The static export is written to `out/`. `npm run preview` serves the generated output locally at `http://localhost:4173`. The deployed site needs no server or database.

## Image pipeline

- `assets/originals/` contains unchanged source copies selected from the supplied image folder.
- `assets/image-sources.json` maps those files to stable IDs.
- Run `npm run assets:build` to generate responsive WebP variants in `public/images/` and update `src/content/generated-manifest.json`.
- The static site uses native `srcset` and `sizes`; it does not require a runtime image optimizer.
- Original assets are kept outside `public/`; only optimized derivatives are served.
- The full read-only inventory of the supplied collection is in `docs/asset-manifest.csv` and `docs/asset-manifest.json`.

## Content editing

Artwork facts that have not been confirmed remain `null` in `src/content/gallery.json`. `IMAGE`, `GESTURE`, `SURFACE`, and `MARK` are presentation labels, not asserted titles or media. The object images remain studies with unconfirmed associations, availability, and prices. `src/config/contact.json` is the only contact configuration; it contains Telegram `@thicklll` only. The visible handle is copyable. The destination is not linked until verified.

## GitHub Pages

The included GitHub Actions workflow builds and deploys the static export after pushes to `main`. Pull requests run the same checks and build without deployment.

1. Create an empty GitHub repository and push the `main` branch.
2. In repository **Settings → Pages**, choose **GitHub Actions** as the publishing source.
3. The workflow computes the correct repository path for both project pages and `username.github.io` sites.
4. Open the deployment URL from the workflow run.

For a custom domain, configure it through GitHub Pages settings and DNS. No repository URL or domain is assumed in this project.

## Design and motion

The implementation follows `docs/design-board.md`. Scroll remains native. CSS reveals play once via IntersectionObserver; reduced-motion visitors see the images immediately. There is no WebGL, scroll hijacking, hover-only action, cart, or checkout.

## Project structure

```text
src/app/                 static page, metadata, and global CSS
src/components/          responsive image, reveal behavior, Telegram action
src/config/              centralized contact configuration
src/content/             artwork/object data and generated image map
src/lib/                 GitHub Pages base-path helper
assets/originals/         unchanged source copies (not served by the site)
assets/image-sources.json source-to-ID map
public/images/            responsive WebP output served by the site
scripts/                  image generation, preview, and validation
tests/                    Node built-in content/accessibility checks
.github/workflows/        build and Pages deployment
```

## Initial performance budgets

- Mobile lead image: target at or below 500 KB; desktop lead image: target at or below 1.2 MB.
- Keep initial route JavaScript at or below 150 KB compressed where practical.
- Track LCP at or below 2.5 s, CLS at or below 0.1, and INP at or below 200 ms on a representative mobile profile before public release.
- Current responsive WebP variants total about 1.38 MB; each viewport should download only suitable candidates.

## Before public release

Confirm artist identity, work titles/year/medium, mockup-to-artwork associations, object details, and Telegram destination. Until those are supplied, the site uses descriptive visual text, copyable Telegram contact, and no availability or pricing claims.
