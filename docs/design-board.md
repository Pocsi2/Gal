# Design board — Resilient abuse & Speechless explorations.

**Review direction · Vertical exhibition with unified object wall · Updated for review**

The site presents a showcase of this year’s exploration as a quiet exhibition. Sixteen selected images are shown in a vertical, paced sequence. Twelve images remain preserved in the source archive as emergency references and are not rendered in public view.

## Experience tableau

| Moment | Composition | Words on screen | Interaction / motion |
|---|---|---|---|
| Enter | One work fills a dark opening scene. Artist identity and entry cue remain spare. | **Resilient abuse & Speechless explorations.** / “A showcase of this year’s exploration through image, gesture and object.” / `ENTER THE EXHIBITION · 16 WORKS` | The image resolves once. The entry cue moves to the exhibition. |
| Image studies | Four large wall hangings, one at a time through native vertical scroll. Each keeps its original aspect ratio and receives generous surrounding space. | `IMAGE STUDY` and a quiet sequence number | The four works use alternating placement and scale. IntersectionObserver reveals each wall gently. |
| Object studies | All twelve object images appear together in one staggered wall installation. Related views sit in the same visual field. | `OBJECT STUDY` and a sequence number / “Six designs applied, by the same hands” | Native page scroll; no sales claims. The images are presented together, with no separate interaction section. |
| Closing | The exhibition ends with a small colophon and one direct human invitation. | `END OF THIS YEAR’S EXPLORATION` / `@thicklll` | A single Telegram contact action. No checkout. |

## Visual system

| Element | Direction |
|---|---|
| Color | Near-black room tone. Each wall uses a darkened color sampled from the image’s outer edge, with a soft blurred echo for atmosphere. |
| Typography | One extra-light sans-serif family for the title, with compact leading. Labels and body copy remain restrained and clean. |
| Scale | The four primary images receive near-viewport hangings. All twelve object studies share one irregular, museum-like wall arrangement. |
| Space | Wide margins and uneven intervals create distinct encounters rather than a product grid or carousel. |
| Navigation | A minimal fixed identity, a direct “Exhibition” link, and a visible entry cue. Scroll stays native. |
| Contact | Telegram `@thicklll` only. No unverified contact URLs. |

## Motion principles

- The opening resolves once and holds.
- Each hanging enters through a short, restrained reveal as it reaches the viewport.
- There is no auto-advance, carousel, horizontal gesture dependency, or scroll hijacking.
- Reduced-motion visitors receive the full static exhibition without reveal clipping or transitions.
- Images use responsive WebP variants and native lazy loading.

## Image selection

- The public exhibition contains 16 images selected by ID in `src/content/gallery.json`.
- The 12 artist-designated emergency references stay in the source files and image manifest, but the exhibition component does not render them.
- All 28 distinct images remain preserved, with the duplicate documented separately in the asset manifest.
- Titles, years, media, object details, artwork associations, price, and availability remain unclaimed until confirmed.

## Review points

1. Does the vertical pacing feel like entering a gallery room?
2. Do the four large works lead the experience before the unified object wall?
3. Do all twelve object views read as one considered collection?
4. Are the twelve withheld images correctly preserved for emergency reference?
