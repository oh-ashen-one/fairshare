# Fairshare visual redesign

September 15, 2026. Replaces the initial green, editorial landing page with a compact blue-and-white design.

## Product choices

- One headline: **Find your share.**
- One prominent action: copy the free prompt directly from the first screen.
- The full prompt moves into a native disclosure, with download and manual-copy fallbacks.
- Three concrete trust points: inspectable open source, no personal intake on this website, and official-source checks.
- Three short steps and three expandable answers replace the longer promotional sections.
- X @ashen_one and TikTok @ashenbot remain in the footer. No personal-name credit.
- The research guide, privacy boundaries, final-filing boundary, and source-backed payout instructions remain intact.

## Artwork and motion

The supporting image was generated once with Codex's built-in image tool. [Original artwork and prompt](../art/README.md) are preserved. A task-owned [Remotion project](../motion/README.md) creates the image-based process animation on the Mac Studio host. The user explicitly requested Remotion for this redesign.

The animation is a silent 4.8-second H.264 clip, 800 × 680, 30 fps, 144 frames, approximately 137 KB. It plays once when visible, with pause/replay controls. A still poster is the default for reduced-motion or data-saving preferences. The Remotion/React authoring dependencies are not shipped to browsers.

Sampled frames at 0, 1, 2, 3, and 4 seconds were inspected. The artwork stays stable while the three process stages appear; no actual settlement, payout, or endorsement is represented. The final frame supplies the static poster.

## Verification

- Remotion TypeScript and lint checks passed; render and poster completed.
- Actual output metadata verified: H.264, 800 × 680, 30 fps, 144 frames, 4.8 seconds; no audio track.
- Copy success and expandable full prompt checked in the browser.
- Browser playback reached its end at 4.8 seconds, muted, with Replay available.
- No document overflow at 320, 390, 768, 1024, or 1440 CSS pixels in the checked browser.
- 200% text fixture checked at a 390px phone width (32px computed body text).
- Eleven automated behavior checks passed: copy actions and manual fallback/disclosure, reduced-motion and data-saving defaults, visibility-gated playback, play/pause, preference changes, and media failure fallback.
- The unchanged visible/downloaded prompt remains identical. Static asset URLs use content hashes.

These are scoped browser and source checks, not a complete physical-device or screen-reader certification. The earlier launch review's 33 KB site estimate predates the requested media and no longer applies. All site media remains static; there is still no shared AI backend or personal-data intake.
