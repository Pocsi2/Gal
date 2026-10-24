'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import gallery from '@/content/gallery.json';
import manifest from '@/content/generated-manifest.json';
import { withBasePath } from '@/lib/site-paths';

const sequence = [
  ...gallery.artworks.map((item) => ({ ...item, kind: 'image' as const })),
  ...gallery.objects.map((item) => ({ ...item, kind: 'object' as const })),
].flatMap((item) => {
  const asset = manifest.images.find((candidate) => candidate.id === item.imageId);
  return asset ? [{ ...item, asset }] : [];
});

function responsiveSet(variants: typeof sequence[number]['asset']['variants']) {
  return variants.map((variant) => `${withBasePath(variant.path)} ${variant.width}w`).join(', ');
}

export default function ImageExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const active = sequence[activeIndex];
  const activeVariant = active.asset.variants[active.asset.variants.length - 1];
  const ambientVariant = active.asset.variants[Math.min(1, active.asset.variants.length - 1)];

  function moveBy(delta: number) {
    setActiveIndex((current) => (current + delta + sequence.length) % sequence.length);
  }

  function handleKeys(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveBy(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveBy(-1);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') touchStart.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLElement>) {
    if (touchStart.current === null) return;
    const distance = event.clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) > 48) moveBy(distance < 0 ? 1 : -1);
  }

  if (!active) return null;

  return (
    <section
      className="image-exploration"
      id="exploration"
      aria-labelledby="exploration-title"
      onKeyDown={handleKeys}
      style={{ '--image-ground': active.asset.groundColor } as CSSProperties}
    >
      <header className="exploration-heading">
        <p className="overline">IMAGE FIELD / 2026</p>
        <h2 id="exploration-title">Enter the <em>image field.</em></h2>
        <p>Move through the images, or choose a frame below.</p>
        <span className="exploration-total">{sequence.length} IMAGES / OBJECT STUDIES</span>
      </header>

      <div
        className="explorer-stage"
        role="region"
        aria-label="Image exploration"
        aria-roledescription="carousel"
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { touchStart.current = null; }}
      >
        <div
          className="explorer-ambient"
          aria-hidden="true"
          style={{ backgroundImage: `url("${withBasePath(ambientVariant.path)}")` }}
        />
        <button className="explorer-control explorer-previous" type="button" onClick={() => moveBy(-1)} aria-label="Previous image">
          <span aria-hidden="true">←</span><small>PREVIOUS</small>
        </button>
        <figure className={`explorer-frame explorer-frame--${active.asset.orientation}`} key={active.id}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Static export uses locally generated responsive WebP variants. */}
          <img
            src={withBasePath(activeVariant.path)}
            srcSet={responsiveSet(active.asset.variants)}
            sizes="(max-width: 700px) 96vw, 76vw"
            width={activeVariant.width}
            height={activeVariant.height}
            alt={active.alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption>
            <span>{active.kind === 'image' ? 'IMAGE STUDY' : 'OBJECT STUDY'}</span>
            <span>{String(activeIndex + 1).padStart(2, '0')} <i>/</i> {String(sequence.length).padStart(2, '0')}</span>
          </figcaption>
        </figure>
        <button className="explorer-control explorer-next" type="button" onClick={() => moveBy(1)} aria-label="Next image">
          <small>NEXT</small><span aria-hidden="true">→</span>
        </button>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {active.kind === 'image' ? 'Image study' : 'Object study'} {activeIndex + 1} of {sequence.length}: {active.alt}
        </p>
      </div>

      <nav className="image-index" id="exploration-index" aria-label="Choose an image">
        {sequence.map((item, index) => {
          const thumbnail = item.asset.variants[0];
          return (
            <button
              className={`image-index-item${index === activeIndex ? ' is-current' : ''}`}
              type="button"
              key={item.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${item.kind === 'image' ? 'image study' : 'object study'} ${index + 1} of ${sequence.length}: ${item.alt}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- Small contact-sheet images use the smallest local variant. */}
              <img
                src={withBasePath(thumbnail.path)}
                srcSet={responsiveSet(item.asset.variants)}
                sizes="(max-width: 560px) 21vw, 12vw"
                width={thumbnail.width}
                height={thumbnail.height}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </button>
          );
        })}
      </nav>
      <p className="exploration-note">Six image studies. Twenty-two object studies. One continuous field.</p>
    </section>
  );
}
