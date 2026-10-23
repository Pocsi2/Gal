import gallery from '@/content/gallery.json';
import ResponsiveImage from '@/components/ResponsiveImage';
import TelegramInvitation from '@/components/TelegramInvitation';

export default function Home() {
  const opening = gallery.opening;

  return (
    <main id="top">
      <header className="masthead">
        <a className="signature" href="#top" aria-label="Explorations, 2026">EXPLORATIONS <span>/</span> 2026</a>
        <a className="index-link" href="#showcase">The showcase <span aria-hidden="true">↓</span></a>
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
        <a className="scroll-cue" href="#showcase"><span>Enter the showcase</span><i aria-hidden="true">↓</i></a>
        <span className="frame-count" aria-hidden="true">01 — 04</span>
      </section>

      <section className="showcase" id="showcase" aria-label="This year's visual explorations">
        {gallery.artworks.map((work, index) => (
          <article className={`work work-${work.label.toLowerCase()}`} aria-label={`Image study ${work.order}`} key={work.id}>
            <div className="work-image" data-reveal>
              <ResponsiveImage
                image={{ id: work.imageId, alt: work.alt }}
                sizes={index === 0 ? '(max-width: 600px) 100vw, 76vw' : '(max-width: 600px) 90vw, 80vw'}
              />
            </div>
            <p className="work-number">{String(work.order).padStart(2, '0')} <span>/</span> {work.label}</p>
          </article>
        ))}
      </section>

      <section className="object-study" aria-labelledby="object-title">
        <header className="object-heading">
          <p className="overline">Image / object</p>
          <h2 id="object-title">The exploration<br /><em>takes another shape.</em></h2>
          <p>Object studies from the visual archive. Ask the artist about a particular piece.</p>
        </header>
        <div className="object-sequence">
          {gallery.objects.map((object, index) => (
            <figure className={`object-item object-item-${index + 1}`} key={object.id} data-reveal>
              <ResponsiveImage
                image={{ id: object.imageId, alt: object.alt }}
                sizes="(max-width: 600px) 86vw, (max-width: 1000px) 45vw, 34vw"
              />
              <figcaption><span>{object.label}</span><span>{String(index + 1).padStart(2, '0')}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <TelegramInvitation />
    </main>
  );
}

