import gallery from '@/content/gallery.json';
import ResponsiveImage from '@/components/ResponsiveImage';
import ImageExplorer from '@/components/ImageExplorer';
import TelegramInvitation from '@/components/TelegramInvitation';

export default function Home() {
  const opening = gallery.opening;
  const imageCount = gallery.artworks.length + gallery.objects.length;

  return (
    <main id="top">
      <header className="masthead">
        <a className="signature" href="#top" aria-label="Explorations, 2026">EXPLORATIONS <span>/</span> 2026</a>
        <a className="index-link" href="#exploration">Explore <span>{String(imageCount).padStart(2, '0')} IMAGES</span></a>
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
          <h1 id="opening-title">A year<br />of <em>looking.</em></h1>
          <p className="intro">A showcase of this year’s exploration<br className="desktop-break" /> through image, gesture and object.</p>
        </div>
        <a className="scroll-cue" href="#exploration"><span>Enter the image field · {imageCount} images</span><i aria-hidden="true">↓</i></a>
        <span className="frame-count" aria-hidden="true">01 — {String(imageCount).padStart(2, '0')}</span>
      </section>

      <ImageExplorer />

      <TelegramInvitation />
    </main>
  );
}

