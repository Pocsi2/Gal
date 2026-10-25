# Design board — Resilient Explorations

**Review direction · Vertical exhibition with a curated object composition · Updated for review**

The site presents a showcase of this stage’s exploration as a quiet exhibition. Ten selected images are shown in a vertical, paced sequence. `chore` opens the exhibition and `one` returns at the closing invitation. Repetitive object views are archived; emergency references stay out of the public sequence.

## Experience tableau

| Moment | Composition | Words on screen | Interaction / motion |
|---|---|---|---|
| Enter | The `chore` line drawing replaces the opening image. It is inverted into a pale drawing on the dark ground. | **Resilient Explorations** / “A showcase of this stage’s exploration through image, gesture and object.” / `ENTER THE EXHIBITION · 10 WORKS` | The drawing resolves into view with the existing slow opening movement. |
| Image studies | Four large wall hangings, one at a time through native vertical scroll. Each keeps its original aspect ratio and receives generous surrounding space. | `IMAGE STUDY` and a quiet sequence number | The four works use alternating placement and scale. IntersectionObserver reveals each wall gently. |
| Object studies | Six distinct object views gather as one asymmetric display on pale image plates against the dark exhibition ground. Repeated angles and details are archived. | **A Life of looking.** / “Frames from this stage’s exploration.” / “Move through them at your own pace.” / “Six designs applied, by the same hands” | The composition stays still; a soft image scale on hover is optional and reduced-motion safe. |
| Closing | The `one` drawing replaces the previous closing image and sits beside the direct human invitation. | `END OF THIS YEAR’S EXPLORATION` / `@thicklll` | A slow, restrained drift on the closing image. A single Telegram contact action. No checkout. |

## Visual system

| Element | Direction |
|---|---|
| Color | Near-black room tone. Each wall uses a darkened color sampled from the image’s outer edge, with a soft blurred echo for atmosphere. |
| Typography | One extra-light sans-serif family for the title, with compact leading. Labels and body copy remain restrained and clean. |
| Scale | The four primary images receive near-viewport hangings. Six chosen object studies sit in one compact editorial arrangement. |
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

- The public exhibition contains ten images selected by ID in `src/content/gallery.json`: four image studies and six object studies.
- Six repetitive object views are preserved under `archivedStudyImageIds`; all 12 emergency reference IDs remain recorded separately. `chore` and `one` appear at the beginning and end.
- All 28 distinct images remain preserved, with the exact duplicate documented separately in the asset manifest.
- Titles, years, media, object details, artwork associations, price, and availability remain unclaimed until confirmed.

## Review points

1. Does the vertical pacing feel like entering a gallery room?
2. Do the four large works lead the experience before the grouped object views?
3. Do the six selected object views feel varied and easy to scan?
4. Are the repetitive studies and emergency references kept out of the public display?
