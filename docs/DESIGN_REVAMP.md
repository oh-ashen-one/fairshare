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

## Mobile playback follow-up

A user reported no visible animation on their phone. The initial one-shot clip could finish while they read the copy, and autoplay rejection offered only a small control. This was an identified design weakness; the user's exact browser/device cause was not reproduced.

The site now loops while at least half of the illustration is visible, pauses off-screen/in background tabs, and preserves a deliberate user pause. Muted/inline properties are explicitly set before source loading. A large Play animation overlay appears whenever playback is stopped or rejected. Reduced-motion and data-saving defaults still avoid autoplay; users can explicitly play. The hero text and artwork also have brief native entrance transitions when reduced motion is off. The settlement prompt remains unchanged.

Fifteen combined automated copy/playback checks passed, including simulated autoplay rejection, reduced motion, save-data, explicit play/pause, viewport return, and tab visibility. A 390px browser check confirmed visible playback, overlay play/pause, off-screen pause and return/resume without horizontal overflow. Physical phone confirmation remains with the user.

## Agent-workflow replacement

The user requested removal of the picture and pause control, with a visual explanation of the actual research process. The page now centers the copy action over a wide, interactive agent-view panel. Four native tabs reveal context intake, a discovery query, rule checks with an unresolved evidence requirement, and a fictional example shortlist. The example is labeled on the video and adjacent page copy, including the illustrative payout range. There is no suggestion of a shared Fairshare research backend.

Four desktop and four mobile Remotion clips replace the decorative lens clip. Each is 3.2 seconds, 96 frames at 30 fps, then holds its final state. Stage selection is user-controlled with accessible tab state and arrow/Home/End keys. There is no Pause animation control, video controls, or autoplay loop. Reduced-motion/data-saving preferences keep posters, with explicit watch/replay available. The settlement prompt is unchanged.

The compositions rendered and passed TypeScript/lint. Mobile and desktop posters were visually inspected. Browser checks verified stage switching, the dedicated mobile media source, final-state hold, and no horizontal overflow at the checked phone width. Automated checks cover stage selection, keyboard navigation, media fallbacks, preferences, resize behavior, and the existing copy flow. The older animation descriptions above are historical.
