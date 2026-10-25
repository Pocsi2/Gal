import gallery from '@/content/gallery.json';
import ResponsiveImage from '@/components/ResponsiveImage';
import GalleryExhibition from '@/components/GalleryExhibition';
import TelegramInvitation from '@/components/TelegramInvitation';
import AmbientArtworks from '@/components/AmbientArtworks';

export default function Home() {
  const opening = gallery.opening;
  const imageCount = gallery.exhibitionImageIds.length;

  return (
    <main id="top">
      <AmbientArtworks />
      <header className="masthead">
        <a className="signature" href="#top" aria-label="Resilient abuse and speechless explorations">RESILIENT ABUSE</a>
        <a className="index-link" href="#exhibition">Exhibition <span>{String(imageCount).padStart(2, '0')} WORKS</span></a>
      </header>

      <section className="opening" aria-labelledby="opening-title">
        <div className="opening-image">
          <ResponsiveImage
            image={{ id: opening.imageId, alt: opening.alt }}
            sizes="100vw"
            priority
          />
        </div>
        <div className="opening-shade" aria-hidden="true" />
        <div className="opening-copy">
          <p className="overline">A visual record / 2026</p>
          <h1 id="opening-title"><span>Resilient abuse</span><span>&amp; Speechless</span><span>explorations.</span></h1>
          <p className="intro">A showcase of this year’s exploration<br className="desktop-break" /> through image, gesture and object.</p>
        </div>
        <a className="scroll-cue" href="#exhibition"><span>Enter the exhibition · {imageCount} works</span><i aria-hidden="true">↓</i></a>
        <span className="frame-count" aria-hidden="true">01 — {String(imageCount).padStart(2, '0')}</span>
      </section>

      <GalleryExhibition />

      <TelegramInvitation />
    </main>
  );
}

