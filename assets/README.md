# Source and distribution assets

`originals/` contains unchanged copies of the selected source images used in this site. `image-sources.json` maps them to stable IDs. `npm run assets:build` writes responsive WebP variants under `public/images/` and updates `src/content/generated-manifest.json`.

The deployed site serves only the generated derivatives in `public/images`. Originals are retained in the repository so the asset pipeline can be rerun; they are not copied to the public directory.
