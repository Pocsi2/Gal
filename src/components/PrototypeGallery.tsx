import gallery from '@/content/gallery.json';
import manifest from '@/content/generated-manifest.json';
import { withBasePath } from '@/lib/site-paths';
import OneArtwork from '@/components/OneArtwork';
import styles from './PrototypeGallery.module.css';

const assetFor = (id: string) => manifest.images.find((image) => image.id === id);

const works = gallery.exhibitionImageIds
  .slice(0, 4)
  .map((id) => {
    const record = gallery.artworks.find((artwork) => artwork.imageId === id);
    const asset = assetFor(id);
    return record && asset ? { ...record, asset } : null;
  })
  .filter((item): item is NonNullable<typeof item> => item !== null);

const objects = gallery.exhibitionImageIds
  .slice(4)
  .map((id) => {
    const record = gallery.objects.find((object) => object.imageId === id);
    const asset = assetFor(id);
    return record && asset ? { ...record, asset } : null;
  })
  .filter((item): item is NonNullable<typeof item> => item !== null);

function imageSet(variants: { path: string; width: number }[]) {
  return variants.map((variant) => `${withBasePath(variant.path)} ${variant.width}w`).join(', ');
}

export default function PrototypeGallery() {
  const opening = assetFor(gallery.opening.imageId);
  const openingImage = opening?.variants.at(-1);
  const closing = assetFor('one');
  const closingImage = closing?.variants.at(-1);

  return (
    <main className={styles.gallery} id="top">
      <header className={styles.header}>
        <a className={styles.wordmark} href="#top">RESILIENT EXPLORATIONS</a>
        <nav aria-label="Exhibition">
          <a href="#works">Works</a>
          <a href="#objects">Objects</a>
          <a href="#contact">Contact <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className={styles.threshold} aria-labelledby="title">
        {opening && openingImage && (
          <div className={styles.thresholdImage}>
            <div className={styles.thresholdEcho} aria-hidden="true" style={{ backgroundImage: `url("${withBasePath(opening.variants[1]?.path ?? openingImage.path)}")` }} />
            {/* eslint-disable-next-line @next/next/no-img-element -- Uses the pre-generated responsive image manifest. */}
            <img
              src={withBasePath(openingImage.path)}
              srcSet={imageSet(opening.variants)}
              sizes="(max-width: 700px) 78vw, 42vw"
              width={openingImage.width}
              height={openingImage.height}
              alt={gallery.opening.alt}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        )}
        <div className={styles.thresholdCopy}>
          <p className={styles.kicker}>A VISUAL RECORD <span>—</span> 2026</p>
          <h1 id="title">Resilient<br /><span>Explorations</span></h1>
          <p>A showcase of this stage’s exploration.</p>
        </div>
        <a className={styles.enter} href="#works"><span>Enter the exhibition</span><span aria-hidden="true">↓</span></a>
        <span className={styles.thresholdIndex} aria-hidden="true">00 / 04</span>
      </section>

      <span id="exhibition" className={styles.skipTarget} />
      <section className={styles.works} id="works" aria-labelledby="works-title">
        <header className={styles.sectionIntro}>
          <div>
            <p className={styles.kicker}>THE EXHIBITION <span>—</span> 2026</p>
            <h2 id="works-title">A Life of<br /><i>looking.</i></h2>
          </div>
          <p className={styles.introNote}>Frames from this stage’s exploration.<br />Move through them at your own pace.</p>
        </header>

        <div className={styles.workSequence}>
          {works.map((work, index) => {
            const image = work.asset.variants.at(-1);
            if (!image) return null;
            return (
              <figure className={`${styles.work} ${styles[`work${index + 1}`] ?? ''}`} key={work.id} data-reveal>
                <div className={styles.workEcho} aria-hidden="true" style={{ backgroundImage: `url("${withBasePath(work.asset.variants[1]?.path ?? image.path)}")` }} />
                <div className={styles.workImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- Uses the pre-generated responsive image manifest. */}
                  <img
                    src={withBasePath(image.path)}
                    srcSet={imageSet(work.asset.variants)}
                    sizes="(max-width: 700px) 92vw, 76vw"
                    width={image.width}
                    height={image.height}
                    alt={work.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption><span>IMAGE STUDY</span><span>{String(index + 1).padStart(2, '0')} <i>/</i> 04</span></figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      <section className={styles.objects} id="objects" aria-labelledby="objects-title">
        <header className={styles.objectIntro}>
          <p className={styles.kicker}>AN EXTENSION OF THE IMAGE</p>
          <h2 id="objects-title">Objects<br /><i>in view.</i></h2>
          <p>Six designs applied, by the same hands</p>
          <span>OBJECT STUDIES <i>—</i> 06</span>
        </header>
        <div className={styles.objectField} role="group" aria-label="Six object studies">
          {objects.map((object, index) => {
            const image = object.asset.variants[Math.min(1, object.asset.variants.length - 1)];
            return (
              <figure className={`${styles.objectStudy} ${styles[`object${index + 1}`] ?? ''} ${object.imageId === 'vocal-socks' ? styles.fullPair : ''}`} key={object.id} tabIndex={0} data-reveal>
                <div className={styles.objectImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- Uses the pre-generated responsive image manifest. */}
                  <img
                    src={withBasePath(image.path)}
                    srcSet={imageSet(object.asset.variants)}
                    sizes="(max-width: 700px) 46vw, 24vw"
                    width={image.width}
                    height={image.height}
                    alt={object.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption><span>{String(index + 1).padStart(2, '0')}</span><span>STUDY</span></figcaption>
              </figure>
            );
          })}
        </div>
        <p className={styles.objectNote}>A On Objects Impressions.</p>
      </section>

      <section className={styles.contact} id="contact" aria-labelledby="contact-title">
        <div className={styles.contactEcho} aria-hidden="true" style={{ backgroundImage: closing?.variants[1] ? `url("${withBasePath(closing.variants[1].path)}")` : undefined }} />
        {closing && closingImage && (
          <OneArtwork
            src={withBasePath(closingImage.path)}
            srcSet={imageSet(closing.variants)}
            width={closingImage.width}
            height={closingImage.height}
          />
        )}
        <div className={styles.contactCopy}>
          <p className={styles.kicker}>AFTER THE EXHIBITION</p>
          <h2 id="contact-title">If something<br /><i>calls you,</i><br />request it directly.</h2>
          <p>For questions about an object, write to the artist.</p>
          <a className={styles.telegram} href="https://t.me/thicklll" target="_blank" rel="noreferrer">
            <span>Telegram</span><strong>@thicklll</strong><span aria-hidden="true">↗</span>
          </a>
          <p className={styles.contactFallback}>If Telegram does not open, find the artist in Telegram by the handle above.</p>
        </div>
        <footer className={styles.footer}>
          <a href="#top">RESILIENT EXPLORATIONS</a><span>END OF THIS STAGE’S EXPLORATION</span><a href="#top">BACK TO THE BEGINNING ↑</a>
        </footer>
      </section>
    </main>
  );
}

