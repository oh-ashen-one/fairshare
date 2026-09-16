# Fairshare motion

A 4.8-second, silent Remotion composition supporting the landing page. The user explicitly selected Remotion for the redesign. All video rendering was performed on the Mac Studio host, in this task-owned directory.

## Reproduce

Requires Node.js and the Remotion browser/runtime dependencies installed by the CLI.

```sh
cd motion
npm ci
npm run lint
npm run poster
npm run render
```

The composition is `ResearchFlow`: 800 × 680 pixels, 30 fps, 144 frames. It reveals three stages: your context, official sources, and your shortlist. It uses the generated research-lens illustration, not real claims or fake payout data.

- Editable source: src/Composition.tsx
- Optimized illustration: public/research-lens.webp
- Site poster: ../dist/assets/research-flow.jpg
- Site video: ../dist/assets/research-flow.mp4
- Generation prompt and provenance: ../art/README.md

The web page plays the video once when visible, without sound. Reduced-motion and data-saving preferences default to the poster. Play/pause/replay remains user-controlled. Remotion and React are build-time dependencies only; no React/Remotion runtime ships to visitors.

Original code is MIT licensed with the repository. Third-party dependencies retain their own licenses, including Remotion's applicable terms.
