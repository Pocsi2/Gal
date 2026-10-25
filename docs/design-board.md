# Design board — Explorations / 2026

**Review direction · Vertical exhibition with object matching · Updated for review**

The site presents a showcase of this year’s exploration as a quiet exhibition. Sixteen selected images are shown in a vertical, paced sequence. Twelve images remain preserved in the source archive as emergency references and are not rendered in public view.

## Experience tableau

| Moment | Composition | Words on screen | Interaction / motion |
|---|---|---|---|
| Enter | One work fills a dark opening scene. Artist identity and entry cue remain spare. | **A year of looking.** / “A showcase of this year’s exploration through image, gesture and object.” / `ENTER THE EXHIBITION · 16 WORKS` | The image resolves once. The entry cue moves to the exhibition. |
| Image studies | Four large wall hangings, one at a time through native vertical scroll. Each keeps its original aspect ratio and receives generous surrounding space. | `IMAGE STUDY` and a quiet sequence number | The four works use alternating placement and scale. IntersectionObserver reveals each wall gently. |
| Object studies | Six object images appear as a staggered wall installation. Six related views are held back for a quiet matching room. | `OBJECT STUDY` and a sequence number | Native page scroll; no sales claims. |
| Matching room | Six images sit apart in an irregular field, like prints waiting to be brought together. A correct pair resolves into a paired object study. | “Bring them together.” / pair count / understated feedback | Drag one view over its match, or select two images in sequence. No timer, score, or penalty. Reset returns all six images to the room. |
| Closing | The exhibition ends with a small colophon and one direct human invitation. | `END OF THIS YEAR’S EXPLORATION` / `@thicklll` | A single Telegram contact action. No checkout. |

## Visual system

| Element | Direction |
|---|---|
| Color | Near-black room tone. Each wall uses a darkened color sampled from the image’s outer edge, with a soft blurred echo for atmosphere. |
| Typography | Restrained sans labels and a single editorial serif italic for selected large phrases. |
| Scale | The four primary images receive near-viewport hangings. Object studies use an irregular, museum-like wall arrangement. |
| Space | Wide margins and uneven intervals create distinct encounters rather than a product grid or carousel. |
| Navigation | A minimal fixed identity, a direct “Exhibition” link, and a visible entry cue. Scroll stays native. |
| Contact | Telegram `@thicklll` only. No unverified contact URLs. |

## Motion principles

- The opening resolves once and holds.
- Each hanging enters through a short, restrained reveal as it reaches the viewport.
- There is no auto-advance, carousel, horizontal gesture dependency, or scroll hijacking.
- Matching pairs move into a quiet reveal panel after a correct drag or selection. Incorrect pairs receive brief text feedback and remain available.
- Pointer drag is supplemented by click, touch tap, and keyboard button activation. The field has no time limit or score pressure.
- Reduced-motion visitors receive the full static exhibition without reveal clipping or transitions.
- Images use responsive WebP variants and native lazy loading.

## Image selection

- The public exhibition contains 16 images selected by ID in `src/content/gallery.json`.
- The 12 artist-designated emergency references stay in the source files and image manifest, but the exhibition component does not render them.
- All 28 distinct images remain preserved, with the duplicate documented separately in the asset manifest.
- Titles, years, media, object details, artwork associations, price, and availability remain unclaimed until confirmed.

## Review points

1. Does the vertical pacing feel like entering a gallery room?
2. Do the four large works lead the experience before the object wall?
3. Does the matching room feel like a playful act of looking while keeping the images central?
4. Are the twelve withheld images correctly preserved for emergency reference?
