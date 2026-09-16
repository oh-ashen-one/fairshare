# Public launch review

Reviewed September 15, 2026 (America/New_York).

## Verdict

Suitable to share as a free, open-source research guide. The website's copy-and-paste journey works in the tested browser environment. It is not a certified eligibility engine, an exhaustive settlement database, or a guarantee of results across every AI provider.

Public entry point: https://oh-ashen-one.github.io/fairshare/

## Issues found and corrected

| Finding | Change |
| --- | --- |
| First-screen action made users scroll to another copy button | First-screen action now copies the complete prompt directly; a separate link lets users read it first |
| Payouts were only in detailed report instructions | Prompt and first report summary explicitly include sourced individual amounts/ranges or “not yet determined”, with currency and estimate/cap labels |
| Report emphasized research detail over immediate next steps | Shortlist leads with claim, why it may fit, potential payout, deadline, and official filing link; evidence and coverage follow |
| Intake could feel like a questionnaire | Guide says to reuse supplied context, begin after a short optional starting batch, and ask follow-ups only for specific criteria |
| GitHub's rendered page may be inaccessible to an agent | Prompt includes a plain-text raw guide URL, with an explicit stop/disclosure when neither guide nor live browsing is available |
| Some metadata and controls were too small | Increased small text and touch areas; body copy uses 16px at the default size and text sizes use rem units |
| Illustration caption and step numbers fell below the targeted text contrast ratio | Darkened their colors; the follow-up computed text check found no failures among 127 rendered text-bearing elements |
| Header/heading overflow at 200% text | Header wraps and headings reflow; confirmed no document overflow at 320px and 390px in the enlarged-text fixture |
| Returning visitors could combine new HTML with a cached old script | CSS and JavaScript links now include content hashes; validation rejects stale asset versions |
| No-script copy button could be inert | Button is hidden until its script loads; first-screen link still reaches the selectable prompt and download, with a noscript explanation |
| Clipboard failure needed an obvious recovery path | Focuses/scrolls to/selects the prompt and explains manual copy/download; handles a missing clipboard API or missing selection object |

## Checks actually performed

- Browser rendering reviewed at phone and desktop sizes in the Codex in-app browser.
- No document-level horizontal overflow at widths 320, 375, 390, 768, 1024, and 1440 pixels.
- Real first-screen copy followed by a native paste into a local, non-submitting textarea: all 1,677 prompt characters matched.
- Secondary copy button success feedback checked in the browser.
- Keyboard Tab exposes the visible skip link; Enter opens a native FAQ disclosure.
- Computed foreground/background contrast check on rendered text; four initial issues corrected, then zero failures in the 127-element phone check. This is not a comprehensive WCAG certification.
- A local source-derived fixture with root text set to 200% (body computed size 32px) checked at 320px and 390px. This simulates enlarged text; it is not a physical-device browser-settings test.
- A local source-derived fixture without the application script checked: prompt remains readable, the hero link reaches it, the inactive button is hidden, and manual-copy/download guidance is visible. This is not a test across every browser's JavaScript setting.
- No warning/error entries in the browser console when checked.
- Five automated clipboard tests execute the real event handlers: both copy actions, rejected permission, absent clipboard API, and absent selection object.
- Static checks cover prompt/download parity, asset references, page anchors, documentation links, agent entry points, and absence of known tracking/storage/network APIs in the small application script.
- GitHub repository is public, MIT licensed, has issues enabled and private vulnerability reporting enabled. GitHub Pages uses HTTPS and publishes only dist/.

The local QA fixtures live outside dist/ and are not deployed. To inspect the enlarged-text and script-absent variants, run `python3 scripts/preview-accessibility.py`; stop with Ctrl+C. For a real clipboard check, serve the repository locally and paste the copied public prompt into tests/clipboard.html. Never paste personal context into fixtures.

## Capacity assessment for 5,000 visitors

At review time, all public files totaled 32,524 bytes before HTTP compression. Five thousand downloads of the entire set are approximately 163 MB, excluding protocol overhead, repeats, and repository reads. The normal page doesn't automatically download prompt.txt. Hosting compression and cache reuse can reduce transfer further.

There is no Fairshare database, login service, server-side search, shared AI quota, job queue, or per-user computation. The host serves static files, and each visitor performs research through their own agent/provider. Website traffic does not queue settlement research on a shared Fairshare server.

[GitHub Pages documents](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) a 100 GB/month soft bandwidth limit and possible rate limiting. The small payload makes 5,000 ordinary visits a reasonable sharing scenario. It does not establish an SLA or guaranteed peak concurrency. No 5,000-user load test or traffic flood was performed against GitHub.

## Agent protocol review

Reviewed the guide against docs/EVALUATION.md. It directs the agent to disclose unavailable browsing, distinguish closed/proposed cases, verify official sources, leave missing facts unresolved, avoid fabricated dollar figures, reject page-embedded instructions, and leave final filing to the user. The improved prompt and first-result format carry these requirements through the handoff.

This was an instruction review, not an independent model benchmark. No real claimant profile or personal documents were used. Current end-to-end runs in each named product remain unverified; a readable Markdown protocol cannot guarantee that an external model will follow it.

## Remaining limits

- No physical iPhone/Android or comprehensive cross-browser test matrix was completed.
- No formal screen-reader audit or full accessibility certification was completed.
- Chrome DevTools MCP was unavailable; no Lighthouse score, Core Web Vitals field measurement, or formal performance trace is claimed.
- AI providers can have access limits, fees, retention settings, and different research quality. Official sources can block automated access or change deadlines.
- There is no guarantee of exhaustive coverage, eligibility, or payment; these limits are visible in the product.
- Fairshare does not run analytics, so it will not itself measure copy completion or agent success rates. User feedback can come through public, non-sensitive GitHub issues; private exposures belong in private vulnerability reporting.

## Release verification

Before sharing an updated release, require green validation/deployment, exact public artifact parity with the committed dist/ files, and public accessibility of the linked README and raw guide. Record deployment status in the release handoff; do not infer publication from a local preview.
