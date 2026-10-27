# Prototype plan

## Mission contract

Create a bold, image-led gallery review experience for Resilient Explorations that makes the current stage/year of exploration clear and invites visitors to contact the artist directly on Telegram. Keep the existing palette and minimal contemporary typography.

## Scope

- New separate static route at /prototype/ using existing content and responsive image manifest.
- Threshold, five selected image studies, six object studies together, and Telegram close.
- CSS hover/focus enlargement, restrained section reveals, responsive layout, reduced-motion support, visible handle fallback, and an interactive black/white polarity lens for the closing One image.
- Design-board with three options and recommendation.

## Out of scope

- Modifying the current homepage, source artworks, contact configuration, or content relationships.
- Checkout, fabricated product facts, additional contact channels, additional dependencies, GSAP, or WebGL.

## Chosen approach

The quiet sequence: editorial image journey with a composed object study field. It combines spatial depth with restrained interaction while remaining static-export friendly. This choice is based on the user's approval to continue and on existing image/data architecture.

## Risks and rollback

Potential issues include CSS mask support, image weight, keyboard/hover discoverability, and Telegram deep-link availability. The base image remains visible without masking; touch/keyboard activation toggles the full inversion. Reduced-motion preference disables pointer tracking while keeping the toggle. Changes are confined to the new route/component and docs; rollback by reverting the prototype commits on main, leaving the original homepage in place.

## Verification

Typecheck, production static build, content validation, and static export validation passed before this enhancement. Re-run those checks after edits; verify the exported prototype copy and image URLs. Browser-level screen-reader and device testing remain review items. Automated tests were not requested.

