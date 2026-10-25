'use client';

import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';

type MatchImage = { id: string; alt: string; src: string; width: number; height: number; ground: string };
type MatchPair = { id: string; label: string; imageIds: string[] };

export default function ObjectMatch({ images, pairs }: { images: MatchImage[]; pairs: MatchPair[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [message, setMessage] = useState('Choose two views of the same object.');
  const drag = useRef<{ id: string; element: HTMLButtonElement; x: number; y: number } | null>(null);
  const suppressClick = useRef(false);

  function pairFor(first: string, second: string) {
    return pairs.find((pair) => pair.imageIds.includes(first) && pair.imageIds.includes(second) && first !== second);
  }

  function choose(id: string) {
    if (matched.some((pairId) => pairs.find((pair) => pair.id === pairId)?.imageIds.includes(id))) return;
    if (!selected) {
      setSelected(id);
      setMessage('Now find its other view.');
      return;
    }
    const result = pairFor(selected, id);
    if (result) {
      setMatched((current) => [...current, result.id]);
      setSelected(null);
      setMessage(result.label);
    } else if (selected === id) {
      setSelected(null);
      setMessage('Choose two different views.');
    } else {
      setSelected(null);
      setMessage('Those views belong to different objects. Try another pair.');
    }
  }

  function pointerDown(event: PointerEvent<HTMLButtonElement>, id: string) {
    if (event.button !== 0 || event.pointerType === 'mouse' && event.buttons !== 1) return;
    drag.current = { id, element: event.currentTarget, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    const active = drag.current;
    if (!active) return;
    const dx = event.clientX - active.x;
    const dy = event.clientY - active.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) {
      active.element.classList.add('is-dragging');
      active.element.style.translate = `${dx}px ${dy}px`;
      active.element.style.zIndex = '5';
    }
  }

  function pointerUp(event: PointerEvent<HTMLButtonElement>) {
    const active = drag.current;
    if (!active) return;
    const moved = active.element.classList.contains('is-dragging');
    active.element.classList.remove('is-dragging');
    active.element.style.translate = '';
    active.element.style.zIndex = '';
    drag.current = null;
    if (!moved) return;
    suppressClick.current = true;
    active.element.style.pointerEvents = 'none';
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-match-image]');
    active.element.style.pointerEvents = '';
    const targetId = target?.dataset.matchImage;
    if (targetId && targetId !== active.id) choosePair(active.id, targetId);
    else {
      setSelected(active.id);
      setMessage('Release a view over its match.');
    }
  }

  function choosePair(first: string, second: string) {
    const result = pairFor(first, second);
    if (result) {
      setMatched((current) => current.includes(result.id) ? current : [...current, result.id]);
      setSelected(null);
      setMessage(result.label);
    } else {
      setSelected(null);
      setMessage('Those views belong to different objects. Try another pair.');
    }
  }

  function reset() {
    setMatched([]);
    setSelected(null);
    setMessage('Choose two views of the same object.');
  }

  const solved = matched.length === pairs.length;
  return (
    <section className="match-room" aria-labelledby="match-title">
      <div className="match-heading">
        <p className="overline">A SMALL ACT OF LOOKING</p>
        <h3 id="match-title">Bring them<br /><em>together.</em></h3>
        <p>Move two views of the same object close to one another.<br />Drag, or select one image and then its match.</p>
      </div>
      <div className="match-instruction" aria-live="polite">
        <span>{solved ? 'THE OBJECTS REVEALED' : `${String(matched.length).padStart(2, '0')} / ${String(pairs.length).padStart(2, '0')} PAIRS`}</span>
        <span>{message}</span>
      </div>
      <div className={`match-field${solved ? ' is-solved' : ''}`}>
        {images.map((image, index) => {
          const pair = pairs.find((candidate) => candidate.imageIds.includes(image.id));
          const isMatched = Boolean(pair && matched.includes(pair.id));
          return (
            <button
              type="button"
              className={`match-card match-card--${index + 1}${selected === image.id ? ' is-selected' : ''}${isMatched ? ' is-matched' : ''}`}
              key={image.id}
              data-match-image={image.id}
              aria-label={`${image.alt}${selected === image.id ? ', selected' : ''}${isMatched ? ', matched' : ''}`}
              aria-pressed={selected === image.id}
              disabled={isMatched}
              onClick={() => {
                if (suppressClick.current) { suppressClick.current = false; return; }
                choose(image.id);
              }}
              onPointerDown={(event) => pointerDown(event, image.id)}
              onPointerMove={pointerMove}
              onPointerUp={pointerUp}
              style={{ '--match-ground': image.ground } as CSSProperties}
            >
              <span className="match-card-image">
                {/* eslint-disable-next-line @next/next/no-img-element -- Static export serves locally generated WebP variants. */}
                <img src={image.src} width={image.width} height={image.height} alt="" draggable={false} loading="lazy" decoding="async" />
              </span>
              <span className="match-card-caption">VIEW / {String(index + 1).padStart(2, '0')}</span>
            </button>
          );
        })}
        <div className="match-reveals" aria-label="Matched object views">
          {pairs.filter((pair) => matched.includes(pair.id)).map((pair) => (
            <div className="match-reveal" key={pair.id}>
              {pair.imageIds.map((id) => {
                const image = images.find((item) => item.id === id);
                return image ? <img key={id} src={image.src} width={image.width} height={image.height} alt="" loading="lazy" decoding="async" /> : null;
              })}
              <span>{pair.label}</span>
            </div>
          ))}
          {solved && <p className="match-complete">Each object, seen again.</p>}
        </div>
      </div>
      <div className="match-controls">
        <span>NO SCORE. TAKE YOUR TIME.</span>
        <button type="button" onClick={reset}>RESET THE ROOM ↗</button>
      </div>
    </section>
  );
}
