# Fairshare

### A little research. A possible share.

**A free, open-source settlement research guide for your own AI agent.** Tell your agent about the products you use, places you have lived, and jobs you have held. It researches possible matches, verifies official sources, and helps you understand the next steps. You review and file yourself.

[Visit the website](https://oh-ashen-one.github.io/fairshare/) · [Copy the prompt](dist/prompt.txt) · [Read the agent guide](AGENT_GUIDE.md) · [Privacy](docs/PRIVACY.md)

## Start here — humans

1. Copy [the Fairshare prompt](dist/prompt.txt) into an agent that can read files and browse the live web. Claude Code, Codex, Cursor, or another capable agent can use the same Markdown instructions; no plugin, paid Fairshare account, or vendor-specific API is required.
2. Let it read this README and [AGENT_GUIDE.md](AGENT_GUIDE.md).
3. Share only what you choose: country/state, up to ten products or services and approximate years, and optionally employers, roles, and employment dates. You can skip any field.
4. Get a short list of potential claims: why each may fit, sourced individual payout amounts or “not yet determined”, deadlines, and official filing links. Supporting details follow the shortlist.
5. If a match appears to fit, use the verified official site to review and submit your own claim.

**No browsing available?** Download this repository using GitHub’s Code → Download ZIP, or clone it. Give the agent the README and AGENT_GUIDE. Without live research, it must provide a research checklist, not current eligibility claims. If a chat cannot follow repository links, attach those files explicitly.

**A local app is not necessarily a local model.** Cloud-backed agents may transmit messages and files to their provider. Review provider settings. Fairshare does not receive your research conversation; web searches and official claim sites have their own data handling. See [privacy boundaries](docs/PRIVACY.md).

## Start here — agents

Read **[AGENT_GUIDE.md](AGENT_GUIDE.md)** before interviewing or researching. Then use:

- [Source directory](docs/SOURCES.md): official authorities versus discovery leads.
- [Optional intake](examples/intake.md): ask conversationally; do not require a completed form.
- [Report template](examples/report.md): source-linked findings, unknowns, deadlines, and coverage.
- [Claim preparation checklist](docs/CLAIM_PREPARATION.md): user-controlled next steps.
- [Behavior checks](docs/EVALUATION.md): scenarios a compliant agent must handle.

This repository provides instructions, not an executable search engine, legal service, or comprehensive settlement database. The quality and reach of results depend on the agent’s tools, sources, and the context the user chooses to provide. Support for an agent means it can read the guide; integrations have not been individually certified.

## What Fairshare does

- Starts with ordinary context, not a name or sensitive identity details.
- Searches broadly across consumer, privacy, data-breach, subscription, product, and employment cases.
- Verifies possible matches against official notices and administrator information.
- Separates **potential match**, **needs information**, **not a match**, and **unverified lead** from whether a claim window is open.
- Produces a dated report with official sources, evidence requirements, and filing instructions.
- Accepts “no verified open matches” as a valid result.

## What it cannot promise

There is no universal database of every lawsuit. Not every lawsuit leads to a settlement or requires a claim form. Past awards, verdicts, investigations, proposed settlements, and expired filing windows are not current opportunities. Fairshare cannot guarantee coverage, eligibility, a payout, or a payout date. Administrators apply settlement rules. This is research assistance, not legal advice.

The source directory starts with U.S. resources. Agents must establish jurisdiction and explain country-specific gaps. They must not export U.S. assumptions to other countries.

## Privacy by design

The landing page is plain HTML, CSS, and JavaScript with locally hosted, pre-rendered media. No profile form, backend, analytics, cookies set by our code, advertising scripts, remote fonts, tracking pixels, or browser storage. The copy button writes only the public prompt to your clipboard. It does not read your clipboard. Hosting providers may retain ordinary request logs.

Do not put personal research into this public repository. `private/`, `personal/`, and `reports/` are ignored as a backstop, not a guarantee; keep personal files outside the checkout whenever possible. Never force-add them. Do not share claims, addresses, receipts, or identification in issues or pull requests.

## Run the website locally

No package installation or build is needed to run the website. The optional Remotion authoring project has its own dependencies; see [motion/README.md](motion/README.md). Requires Python 3 for the convenience server (any static server also works):

```sh
git clone https://github.com/oh-ashen-one/fairshare.git
cd fairshare
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:4173`. Stop with Ctrl+C. Clipboard access usually requires HTTPS or localhost; a manual selection and text-download fallback is provided. The page remains readable, with its prompt and native FAQ controls, without JavaScript.

## Project layout

```text
AGENT_GUIDE.md          Vendor-neutral research workflow
AGENTS.md / CLAUDE.md   Entry points for coding agents
.cursor/rules/         Cursor pointer to the same guide
dist/                  Authored, deployable static site, prompt, and rendered media
motion/                Editable Remotion composition and locked authoring toolchain
art/                   Generated illustration and its prompt/provenance
docs/                  Privacy, sources, research, contribution guidance
examples/              Blank intake and report templates
scripts/validate.py    Static integrity and privacy checks
.github/workflows/     Validation and GitHub Pages deployment
```

`dist/` contains authored source and is tracked intentionally. Edit it directly. Keep its visible prompt and `dist/prompt.txt` identical.

## Checks and publishing

```sh
python3 scripts/validate.py
node --check dist/app.js
node --test scripts/test-copy.cjs
```

GitHub Actions validates every push/PR. On `main`, the Pages workflow publishes only `dist/`; repository settings must use GitHub Actions as the Pages source. Forks should update repository/website links before enabling their own deployment. The optional `.openai/hosting.json` connects this checkout to the public ChatGPT Site; fork owners should remove it or register their own project before using Sites.

## Launch review

See [the launch review](docs/LAUNCH_REVIEW.md) for corrected issues, browser checks, the 5,000-visitor capacity estimate, and explicit testing limits.

## Why this exists

Apps such as Collect, Settlemate, and TapClaim helped establish demand for settlement discovery. Fairshare takes an open, agent-readable approach: use your existing tools and decide what to share. See the [dated research notes](docs/RESEARCH.md), including primary-source links. Fairshare is independent and is not affiliated with those apps, any defendant, administrator, court, or AI provider.

## Contribute

Read [CONTRIBUTING.md](CONTRIBUTING.md). Source-verification improvements, accessibility fixes, and documented country-specific resources are welcome. Please keep all examples synthetic.

**License:** [MIT](LICENSE). No subscription or share of claims goes to Fairshare. Your AI or search provider may charge for usage.
