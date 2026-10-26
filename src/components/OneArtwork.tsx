'use client';

import { useRef, useState, type PointerEvent } from 'react';
import styles from './PrototypeGallery.module.css';

export default function OneArtwork({
  src,
  srcSet,
  width,
  height,
}: {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isInverted, setIsInverted] = useState(false);

  function movePolarityLens(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    buttonRef.current?.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
    buttonRef.current?.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${styles.contactArtwork} ${isHovering ? styles.polarityHover : ''} ${isInverted ? styles.polarityInverted : ''}`}
      aria-label={isInverted ? 'Show One as black lines on white' : 'Reveal One as white lines on black'}
      aria-pressed={isInverted}
      onPointerEnter={(event) => setIsHovering(event.pointerType === 'mouse' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)}
      onPointerMove={movePolarityLens}
      onPointerLeave={() => setIsHovering(false)}
      onClick={() => setIsInverted((current) => !current)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Uses the pre-generated responsive image manifest. */}
      <img className={styles.polarityBase} src={src} srcSet={srcSet} sizes="(max-width: 700px) 56vw, 38vw" width={width} height={height} alt="" loading="lazy" decoding="async" />
      <span className={styles.polarityLens} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- Uses the pre-generated responsive image manifest. */}
        <img src={src} srcSet={srcSet} sizes="(max-width: 700px) 56vw, 38vw" width={width} height={height} alt="" loading="lazy" decoding="async" />
      </span>
    </button>
  );
}
