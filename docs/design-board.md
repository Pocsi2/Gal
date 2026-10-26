# Design board — Resilient Explorations

Status: local review concept. No deployment or change to the existing home route.

## Intent

Present the supplied works as a record of this year's exploration. The interface should recede, let images carry the experience, and end in one direct human invitation through Telegram. Keep the existing near-black / white palette and contemporary minimal typography; do not invent artwork facts or merchandise terms.

## Three creative directions

### 1. Rooms of one — spatial exhibition

- **Home:** Chore appears alone against a dark field; the exhibition title arrives as a quiet caption.
- **Navigation:** A small fixed index for Works, Objects, Contact; current position shown as a number.
- **Artwork:** One work per spacious “wall”, with its source image and a restrained blurred echo forming the wall light.
- **Transitions:** Scroll reveals each wall with a slow opacity and scale change.
- **Typography:** Hairline sans for titles; tiny tracked sans for index and metadata.
- **Objects:** An asymmetrical constellation, one object enlarging on hover or keyboard focus.
- **Contact:** Closing wall resolves into Telegram invitation.
- **Mobile:** Vertical walls, touch-first, no hover dependency.
- **Complexity:** Low–medium; CSS plus existing IntersectionObserver.
- **Strength:** Maximum contemplation and gallery presence.
- **Weakness:** Long scroll and a spatial metaphor that may overstate relationships.

### 2. The quiet sequence — editorial exhibition (recommended)

- **Home:** A single image and title form a threshold; “A Life of looking” frames the current stage.
- **Navigation:** Discreet wordmark, Works / Objects / Contact anchors, and a small progress index.
- **Artwork:** Four large, individually composed frames unfold as one sequence; varied scale and negative space make the images feel curated rather than tiled.
- **Transitions:** Native scroll and short CSS crossfades; foreground art stays crisp while a same-image echo creates depth.
- **Typography:** One neutral sans family, thin display weight, compact uppercase wayfinding.
- **Objects:** All six works appear together as a loose “study table”; focus expands one image while the rest soften. The lower-corner sock pair is held smaller within its frame so both socks remain visible. No unverified object-to-artwork pairing is implied.
- **Contact:** A larger rendering of one closes the sequence; a pointer-following polarity lens reveals white linework on black. Touch and keyboard activation toggle the full inversion. The Telegram invitation remains direct, with @thicklll visible as fallback.
- **Mobile:** Recompose the table as two columns; keep tap/focus reveal and reduce movement.
- **Complexity:** Low; existing Next static export, CSS, semantic HTML, existing content and image variants.
- **Strength:** Distinctive pacing with low dependency and performance cost.
- **Weakness:** More editorial than spatial; image order must carry the rhythm.

### 3. The matching table — interactive object study

- **Home:** Title acts as a quiet label above a field of image fragments.
- **Navigation:** Index opens a compact overlay; direct jump between Works and Objects.
- **Artwork:** Users drag or tap fragments into a large field; grouped images become a composition.
- **Transitions:** Pointer-led easing and spring-like movement.
- **Typography:** Minimal sans with sparse numbered annotations.
- **Objects:** The main interaction is arranging or matching studies.
- **Contact:** A contact marker appears at the end of the play sequence.
- **Mobile:** Tap-to-select and tap-to-place instead of dragging.
- **Complexity:** Medium–high; needs interaction state, touch handling, and validation of any claimed relationships.
- **Strength:** Strong play and visitor agency.
- **Weakness:** Risks turning the archive into a puzzle and falsely asserting object relationships; more code and accessibility/performance work.

## Recommendation

Build **The quiet sequence** as a review prototype. Borrow the depth and single-work pacing of Rooms of one, and the satisfying hover/focus enlargement from the matching table, without claiming unverified matches or requiring a drag game. Use existing images and build tools. Keep the current live route intact and create a separate static /prototype/ route.

## Content rules

Use existing image IDs, alt text, and the framing “A showcase of this stage’s exploration.” Factual title, year, medium, biography, object details, price, edition, availability, and shipping remain absent unless present and verified. The only contact is Telegram @thicklll.

The opening image is chore and the closing image is one, preserving the requested visual bookend. The exhibition uses four selected image studies and six distinct object studies; archived repeats and emergency references remain outside the public route. The image IDs come from the existing gallery content model. The object-section endline reads “A On Objects Impressions.” The closing image shifts between dark linework on a pale field and white linework on black.

## Design system and motion

- Palette: existing near-black and warm white; no new accent hue.
- Type: one system sans stack with thin weights; tracked micro-labels.
- Motion: 450–1150ms opacity/transform, restrained easing, no perpetual motion. The closing polarity lens follows the pointer without adding a large animation library.
- CSS for hover/focus, image scale, and responsive layout. Existing IntersectionObserver may reveal sections. No GSAP or WebGL: they add little value to this mostly editorial scroll experience.
- Reduced motion: remove scale/reveal choreography and disable pointer tracking while preserving the full image and its keyboard/touch inversion control.

## Stack and team

Keep Next.js static export, React, TypeScript, CSS Modules/global tokens, existing sharp-generated WebP variants, and current GitHub workflow. No new dependency. A small team can combine art direction + interaction design, and frontend + performance + accessibility; image processing and GitHub deployment remain covered by the existing scripts/workflow. WebGL/Three.js is not justified.

- **Creative / art direction + UI/UX:** owns image hierarchy, pacing, type, wayfinding, and editing out decoration.
- **Creative technologist + senior frontend:** owns the React/TypeScript composition, CSS motion primitives, responsive behavior, and integration.
- **Motion designer:** shapes timing and transitions with the creative technologist; no continuous animation.
- **Image pipeline + performance:** maintain existing generated variants, explicit dimensions, and mobile loading behavior.
- **Accessibility + GitHub/DevOps:** verify semantic navigation, keyboard/touch, reduced motion, static export paths, and review/deployment workflow.
- **WebGL engineer:** not needed for this concept.

Critical Codex skills: art direction, creative frontend, React/Next.js, TypeScript, responsive design, interaction/motion design, image optimization, accessibility, performance, and Git/GitHub. GSAP/ScrollTrigger, Three.js/GLSL, and advanced creative coding stay optional; the selected concept gains little from adding them.

Repository addition is limited to a prototype route and component plus design/implementation notes. Existing `src/content`, generated images, and GitHub Pages export remain the data and deployment path.

## MVP and workflow

1. Preserve main; build a separate prototype route on a local branch.
2. Show threshold, artwork sequence, object study table, and Telegram close.
3. Check narrow and wide layouts, keyboard/focus, reduced motion, image paths, and static export.
4. Review the route locally before any integration or online update.

The prototype's performance budget targets are LCP ≤2.5s, CLS ≤0.1, and INP ≤200ms at the 75th percentile, measured separately for mobile and desktop. The opening image receives high fetch priority from the existing responsive set; below-fold media is lazy-loaded; image dimensions are emitted; no client animation library is added. These are targets, not measurements: a deployed review build must be measured before launch. The thresholds follow the current Core Web Vitals recommendations from [web.dev](https://web.dev/articles/vitals).

## Risks and mitigations

- Large images: use generated responsive srcset, explicit dimensions, lazy loading below the fold.
- Hover-only behavior: mirror on keyboard focus; show all images on touch.
- Misleading grouping: keep object studies together but don't label inferred pairings.
- External contact link: visible @thicklll remains a manual fallback if Telegram can't open.
- Regression: separate route and branch; rollback by discarding the prototype branch.

## Review questions

1. Does the sequence feel like entering a digital exhibition rather than browsing a store?
2. Do the four works have enough negative space and variation to hold attention?
3. Does the object study composition invite exploration without implying unverified pairings?
4. Does the chore-to-one visual bookend give the visit a satisfying close?
