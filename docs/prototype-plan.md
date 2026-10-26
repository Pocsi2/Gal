# Prototype plan

## Mission contract

Create a bold, image-led gallery review experience for Resilient Explorations that makes the current stage/year of exploration clear and invites visitors to contact the artist directly on Telegram. Keep the existing palette and minimal contemporary typography.

## Scope

- New separate static route at /prototype/ using existing content and responsive image manifest.
- Threshold, four selected image studies, six object studies together, and Telegram close.
- CSS-only hover/focus enlargement, restrained section reveals, responsive layout, reduced-motion support, visible handle fallback.
- Design-board with three options and recommendation.

## Out of scope

- Modifying the current homepage, live GitHub repository, source artworks, contact configuration, or content relationships.
- Checkout, product facts, prices, artist biography, additional dependencies, GSAP, or WebGL.
- Pushing or deployment.

## Chosen approach

The quiet sequence: editorial image journey with a composed object study field. It combines spatial depth with restrained interaction while remaining static-export friendly. This choice is based on the user's approval to continue and on existing image/data architecture.

## Risks and rollback

Potential issues include CSS support for :has(), image weight, keyboard/hover discoverability, and Telegram deep-link availability. The core layout does not depend on :has(); focus/hover states and visible handle provide fallbacks. All changes are on the award-gallery-prototype branch and confined to the new route/component and docs. Rollback by switching to main or removing the branch.

## Verification

Run typecheck and production static build, inspect exported route and asset links, review the changed diff. Do not claim visual browser QA unless performed. Tests are not requested.

