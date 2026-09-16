# Agent instructions

For settlement research, read README.md and AGENT_GUIDE.md first. AGENT_GUIDE.md is the canonical workflow for every agent.

For code contributions: keep the site buildless and static, preserve accessibility and mobile layouts, add no personal-data intake or trackers, and keep dist/prompt.txt synchronized with the visible prompt. Run `python3 scripts/validate.py` and `node --check dist/app.js` before committing. Use synthetic examples only. Never commit claimant data, credentials, local reports, or private context. See CONTRIBUTING.md.
