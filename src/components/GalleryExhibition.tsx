import type { CSSProperties } from 'react';
import gallery from '@/content/gallery.json';
import manifest from '@/content/generated-manifest.json';
import { withBasePath } from '@/lib/site-paths';

const records = [
  ...gallery.artworks.map((item) => ({ ...item, kind: 'image' as const })),
  ...gallery.objects.map((item) => ({ ...item, kind: 'object' as const })),
];

const exhibition = gallery.exhibitionImageIds.flatMap((id) => {
  const record = records.find((item) => item.imageId === id);
  const asset = manifest.images.find((item) => item.id === id);
  return record && asset ? [{ ...record, asset }] : [];
});

const primaryWorks = exhibition.filter((item) => item.kind === 'image');
const objectStudies = exhibition.filter((item) => item.kind === 'object');
const objectPairs = Array.from({ length: Math.ceil(objectStudies.length / 2) }, (_, index) =>
  objectStudies.slice(index * 2, index * 2 + 2),
);

function responsiveSet(variants: typeof exhibition[number]['asset']['variants']) {
  return variants.map((variant) => `${withBasePath(variant.path)} ${variant.width}w`).join(', ');
}

export default function GalleryExhibition() {
  return (
    <section className="exhibition" id="exhibition" aria-labelledby="exhibition-title">
      <header className="exhibition-intro">
        <p className="overline">THE EXHIBITION / 2026</p>
        <h2 id="exhibition-title">A Life of<br /><em>looking.</em></h2>
        <p>Frames from this stage’s exploration.</p>
        <p>Move through them at your own pace.</p>
        <span className="exhibition-count">04 IMAGE STUDIES <i>/</i> 12 OBJECT STUDIES</span>
      </header>

      <div className="primary-gallery" role="group" aria-label="Four image studies">
        {primaryWorks.map((item, index) => {
          const image = item.asset.variants[item.asset.variants.length - 1];
          return (
            <figure
              className={`primary-work primary-work--${item.asset.orientation}`}
              key={item.id}
              data-reveal
              style={{ '--wall-ground': item.asset.groundColor } as CSSProperties}
            >
              <div className="primary-work-wall">
                <div className="wall-echo" aria-hidden="true" style={{ backgroundImage: `url("${withBasePath(item.asset.variants[1]?.path ?? image.path)}")` }} />
                {/* eslint-disable-next-line @next/next/no-img-element -- Static export uses locally generated responsive WebP variants. */}
                <img
                  src={withBasePath(image.path)}
                  srcSet={responsiveSet(item.asset.variants)}
                  sizes="(max-width: 700px) 92vw, 72vw"
                  width={image.width}
                  height={image.height}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption><span>IMAGE STUDY</span><span>{String(index + 1).padStart(2, '0')} <i>/</i> 04</span></figcaption>
            </figure>
          );
        })}
      </div>

      <header className="objects-intro">
        <p className="overline">AN EXTENSION OF THE IMAGE</p>
        <h3>Objects<br /><em>in view.</em></h3>
        <p>Six designs applied, by the same hands</p>
      </header>

      <div className="object-gallery" role="group" aria-label="Six paired arrangements of object studies">
        {objectPairs.map((pair, pairIndex) => (
          <div className="object-pair" key={`pair-${pairIndex + 1}`}>
            {pair.map((item, itemIndex) => {
              const index = pairIndex * 2 + itemIndex;
              const image = item.asset.variants[Math.min(1, item.asset.variants.length - 1)];
              return (
                <figure
                  className={`object-work object-work--${String(index + 1).padStart(2, '0')}`}
                  key={item.id}
                  data-reveal
                  style={{ '--wall-ground': item.asset.groundColor } as CSSProperties}
                >
                  <div className="object-work-wall">
                    <div className="wall-echo" aria-hidden="true" style={{ backgroundImage: `url("${withBasePath(item.asset.variants[0].path)}")` }} />
                    {/* eslint-disable-next-line @next/next/no-img-element -- Static export uses locally generated responsive WebP variants. */}
                    <img
                      src={withBasePath(image.path)}
                      srcSet={responsiveSet(item.asset.variants)}
                      sizes="(max-width: 600px) 70vw, 36vw"
                      width={image.width}
                      height={image.height}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption><span>{String(index + primaryWorks.length + 1).padStart(2, '0')}</span></figcaption>
                </figure>
              );
            })}
          </div>
        ))}
      </div>

      <p className="exhibition-endnote">END OF THIS STAGE’S EXPLORATION</p>
    </section>
  );
}
