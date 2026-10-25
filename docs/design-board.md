# Design board — Resilient Explorations

**Review direction · Vertical exhibition with six minimal object pairings · Updated for review**

The site presents a showcase of this stage’s exploration as a quiet exhibition. Sixteen selected images are shown in a vertical, paced sequence. `chore` opens the exhibition and `one` returns at the closing invitation. The remaining emergency references stay out of the public sequence.

## Experience tableau

| Moment | Composition | Words on screen | Interaction / motion |
|---|---|---|---|
| Enter | The `chore` line drawing replaces the opening image. It is inverted into a pale drawing on the dark ground. | **Resilient Explorations** / “A showcase of this stage’s exploration through image, gesture and object.” / `ENTER THE EXHIBITION · 16 WORKS` | The drawing resolves into view with the existing slow opening movement. |
| Image studies | Four large wall hangings, one at a time through native vertical scroll. Each keeps its original aspect ratio and receives generous surrounding space. | `IMAGE STUDY` and a quiet sequence number | The four works use alternating placement and scale. IntersectionObserver reveals each wall gently. |
| Object studies | Twelve views gather as six quiet two-image pairings, recalling the matching exercise without adding controls or game instructions. | **A Life of looking.** / “Frames from this stage’s exploration.” / “Move through them at your own pace.” / “Six designs applied, by the same hands” | Pairings stay static as a single compact composition; native scroll and a slight shared hover lift on desktop. |
| Closing | The `one` drawing replaces the previous closing image and sits beside the direct human invitation. | `END OF THIS YEAR’S EXPLORATION` / `@thicklll` | A slow, restrained drift on the closing image. A single Telegram contact action. No checkout. |

## Visual system

| Element | Direction |
|---|---|
| Color | Near-black room tone. Each wall uses a darkened color sampled from the image’s outer edge, with a soft blurred echo for atmosphere. |
| Typography | One extra-light sans-serif family for the title, with compact leading. Labels and body copy remain restrained and clean. |
| Scale | The four primary images receive near-viewport hangings. Twelve object views sit close in six restrained pairs. |
| Space | Wide margins and uneven intervals create distinct encounters rather than a product grid or carousel. |
| Navigation | A minimal fixed identity, a direct “Exhibition” link, and a visible entry cue. Scroll stays native. |
| Contact | Telegram `@thicklll` only. No unverified contact URLs. |

## Motion principles

- The opening resolves once and holds.
- `chore` begins the experience; `one` closes it. Both receive a slow, restrained image movement.
- Each hanging enters through a short, restrained reveal as it reaches the viewport.
- There is no auto-advance, carousel, horizontal gesture dependency, or scroll hijacking.
- Reduced-motion visitors receive the full static exhibition without reveal clipping or transitions.
- Images use responsive WebP variants and native lazy loading.

## Image selection

- The public exhibition contains 16 images selected by ID in `src/content/gallery.json`.
- All 12 emergency reference IDs remain recorded. `chore` and `one` appear at the beginning and end; the other ten remain out of the public sequence.
- All 28 distinct images remain preserved, with the duplicate documented separately in the asset manifest.
- Titles, years, media, object details, artwork associations, price, and availability remain unclaimed until confirmed.

## Review points

1. Does the vertical pacing feel like entering a gallery room?
2. Do the four large works lead the experience before the grouped object views?
3. Do all twelve object views read as six clear, minimal pairings?
4. Are the twelve withheld images correctly preserved for emergency reference?
