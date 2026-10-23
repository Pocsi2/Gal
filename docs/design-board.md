# Design board — Explorations / 2026

**Review draft · Direction: the work is the interface · Implemented as a static GitHub-ready site**

This is a deliberately quiet digital exhibition for a single purpose: to show this year's visual exploration, then invite a human conversation with the artist on Telegram.

## Design tableau

| Moment | Composition | Words on screen | Interaction / motion |
|---|---|---|---|
| Opening | One image fills the screen. Copy sits low and left. A hairline header is the only persistent chrome. | **A year of looking.** / “A showcase of this year’s exploration through image, gesture and object.” | A single 1.8-second image resolve, followed by near-imperceptible scale drift. “Enter the showcase” scrolls naturally to the work. |
| Showcase 01 | The Jump image rests in a black field, contained with generous margins. | `01 / IMAGE` | Image reveals once as it enters view. No pinned scroll and no cursor effect. |
| Showcase 02 | The fine-line drawing sits alone on a warm paper field. The light section resets the eye after the dark opening. | `02 / GESTURE` | One vertical image reveal. Natural document scroll. |
| Showcase 03 | The close portrait floats in a dim room, with its image doing all the visual work. | `03 / SURFACE` | Same one-time reveal. Crop changes intentionally on mobile. |
| Showcase 04 | Small line mark centered in near-black; it is not enlarged beyond its source quality. | `04 / MARK` | Static after reveal; no artificial motion. |
| Object study | Eight supplied product mockups arranged as a loose, uncarded object study on a pale field. It stays after the artwork sequence and carries no price or availability claims. | “The exploration takes another shape.” / `OBJECT STUDY` | A slow image reveal. The section avoids price, stock, and product specifications until confirmed. |
| Invitation | The closing artwork returns as a dim image field. Text and one action take priority. | **If something stays with you, let’s talk.** / **Copy Telegram handle — @thicklll** | A quiet underline/arrow response. The action is after the full showcase. It copies the readable handle so the visitor can find the artist in Telegram. |

## Visual system

| Element | Direction |
|---|---|
| Color | Near-black `#090909`, soft white `#ecebe7`, and one warm paper interruption `#e7e5df`. Use the artwork's own color as the accent. |
| Typography | One neutral sans for navigation, labels and explanatory text; Georgia as a restrained editorial italic for a few large phrases. No display-font collection or tiny metadata clutter. |
| Scale | One large statement per scene; captions remain small and optional. Images retain their natural aspect ratio unless a deliberate portrait crop improves mobile composition. |
| Space | Large margins and quiet gaps between works. No grid on the main path, no cards, borders only where they communicate a transition or action. |
| Texture | No film grain, gradients as decoration, glass, glow, gold, or ornamental shapes. Atmosphere comes from the original image and the contrast between black and paper. |
| Navigation | Minimal year mark and one “The showcase ↓” anchor. No index overlay or premature contact link. |
| Contact | Telegram is the sole channel: `@thicklll`. No secondary social handle or invented email. |

## Motion principles

- **Reveal, then hold.** A scene enters once; it does not keep asking for attention.
- **Scroll remains native.** No scroll hijacking, snap stops, pinned chapters, or forced horizontal movement.
- **One pacing rule.** Artwork reveal runs about 1.3 seconds with a soft ease. The opening takes 1.8 seconds to resolve; its image drifts very slowly afterward.
- **Every image stays legible.** Motion is an enhancement, never a loading gate. IntersectionObserver triggers reveals, CSS handles the transition, and `prefers-reduced-motion` presents the artwork immediately.
- **Mobile is composed vertically.** Crops, margins, and type scale are tuned for a narrow frame; no hover-only behavior is required.

## Content guardrails

The site now explicitly introduces itself as a **showcase of this year's exploration**. “Image,” “gesture,” and “surface” are presentation labels, not claimed artwork titles or media. The product image is labeled “Object study”; specific availability, size, edition, material, price, and shipping remain unclaimed. `@thicklll` is the only contact shown. The handle is copyable; no unverified deep link is used.

## Review questions

1. Does the opening statement describe the intended showcase accurately?
2. Does the pace between the four images feel considered, or should the work move faster?
3. Should the object study remain after the artwork sequence?
4. Is `@thicklll` the exact Telegram handle?

## Handoff

The reviewed direction is implemented in the GitHub-ready static site under `outputs/gallery-site/`. After design/content review and confirmation of the artist facts, connect the local repository to the artist’s GitHub repository and enable GitHub Pages. The deployment workflow is ready but has not been run against a remote repository.


