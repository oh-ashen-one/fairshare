# Fairshare agent walkthrough

The current site uses four interactive, pre-rendered Remotion stages: context, search, verification, and results. They demonstrate the agent workflow, not a Fairshare server-side service. The example service and dollar amounts are explicitly fictional.

## Reproduce

```sh
cd motion
npm ci
npm run lint
npm run render
```

`render-demo.mjs` renders desktop (1080 × 650) and mobile (720 × 850) versions of all four stages, plus a final-frame JPEG poster for each. Every clip is silent H.264, 30 fps, 96 frames / 3.2 seconds. Rendering runs on the Mac Studio in this task-owned checkout.

Editable composition: src/Composition.tsx. Outputs: ../dist/assets/demo-*.mp4 and demo-*.jpg. After rendering, run `python3 scripts/version-assets.py` from the repository root.

## Playback

- Native, keyboard-accessible stage tabs select the appropriate clip and description.
- The first visible stage plays briefly, then holds its final result. Selecting another stage plays that stage.
- No pause control and no endless autoplay loop.
- Watch/replay provides explicit playback when needed; reduced-motion and save-data preferences default to still posters.
- The browser loads only the chosen layout/stage; Remotion and React remain authoring dependencies, not visitor dependencies.
- The former magnifying-glass illustration is removed from the public site. Its original generated source is archived in art/.

Original code is MIT licensed with the repository. Third-party dependencies retain their licenses and applicable terms.
