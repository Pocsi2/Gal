# Design board — Explorations / 2026

**Review direction · Benchmark image field · Implemented for the GitHub Pages review**

The site should show the full body of this year's exploration while keeping the interface quiet. The first image is an invitation into the collection; it is not the only image. The collection contains 29 files, including one exact duplicate, so the visual sequence presents all 28 distinct images.

## Experience tableau

| Moment | Composition | Words on screen | Interaction / motion |
|---|---|---|---|
| Enter | One artwork fills a near-black viewport. The copy sits low and left; a small count and explicit action make the larger collection discoverable. | **A year of looking.** / “A showcase of this year’s exploration through image, gesture and object.” / `ENTER THE IMAGE FIELD · 28 IMAGES` | The lead image resolves once. The entry action scrolls to the full image sequence. |
| Image field | One large frame occupies the center. A soft blurred echo of the same image adds depth; the image stays the protagonist. | `IMAGE FIELD / 2026` / `01 — 28` | Previous/next controls, left/right keys, touch swipe, and direct selection from a 28-image visual index. The active image changes with one short blur-to-focus transition. No autoplay. |
| Image studies | Six primary image studies appear first, each full-frame and uncropped where the source allows. | `IMAGE STUDY` and a running number | Every image can be selected directly. Titles, years, and media remain absent until confirmed. |
| Object studies | Twenty-two visual object studies follow in the same sequence. No product-card language, specifications, or sales claims. | `OBJECT STUDY` and a running number | The same controls and image index apply. The one exact duplicate clock image is not repeated. |
| Index | All 28 images appear as small, irregularly proportioned visual selectors under the active image. It works as an index, not a storefront grid. | Image count and frame number | Tap/click a frame to jump; active frame receives a restrained outline. Mobile uses a compact four-column index. |
| Invitation | A quiet closing image field leads to one human contact action. | **If something stays with you, let’s talk.** / `@thicklll` | Copy the Telegram handle. No other contact channel, cart, or checkout. |

## Visual system

| Element | Direction |
|---|---|
| Color | Near-black `#090909`, soft white `#ecebe7`, and one warm paper interruption. Use the image's own color as the accent. |
| Typography | One neutral sans for navigation and labels; a restrained editorial serif italic for a few large phrases. |
| Scale | One active image at a time, with a clear count and a quiet visual index. No product-card layout. |
| Space | Large margins around the image, but a clear invitation to explore so the first image does not read as the whole site. |
| Texture | The active image creates its own low-opacity blurred field. No decorative grain, neon, gold, or heavy glass effects. |
| Navigation | Visible image count, previous/next, keyboard arrows, touch swipe, and 28 direct image selectors. |
| Contact | Telegram `@thicklll` only. The handle is copyable; no unverified destination link is used. |

## Motion principles

- The opening resolves once and then holds.
- A selected frame changes with a single restrained blur-to-focus transition; no persistent movement or autoplay.
- CSS handles the transition; native pointer events support swiping; keyboard arrows and buttons provide equivalent access.
- Reduced motion removes transition movement while preserving the complete index and all navigation.
- The active image uses responsive WebP variants. Index images use the smallest responsive candidates and native lazy loading.

## Content guardrails

The site says it is a showcase of this year's exploration. It displays 28 distinct images from the source folder; one exact duplicate remains documented in the full 29-file asset manifest but is not shown twice. Image descriptions reflect visible content. Titles, years, media, edition, dimensions, material, availability, and prices remain unclaimed. Object-to-artwork relationships remain unconfirmed. Telegram `@thicklll` is the only contact.

## Review points

1. Does the image field make the full collection obvious from the opening?
2. Does frame-by-frame movement feel like a digital exhibition rather than a standard carousel?
3. Does the visual index help visitors find images without competing with the active work?
4. Confirm names, dates, media, object associations, and the Telegram destination before adding them.
