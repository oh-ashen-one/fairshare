# Contributing to Fairshare

Thank you for helping people research more clearly.

- Use synthetic examples. Never include names, claim IDs, notices, receipts, or private research in issues, PRs, screenshots, or commits.
- Cite primary sources for new source directories or legal/process claims. Date the review and state jurisdiction and access limitations. Do not add an unmaintained list of allegedly open claims.
- Keep AGENT_GUIDE.md canonical. Agent-specific files should point to it rather than drift into separate workflows.
- Preserve the user-controlled filing boundary and optional intake. No trackers, profile forms, backend, paid funnel, affiliate redirects, or unsupported guarantees.
- Keep the static site accessible, mobile-first, dependency-free, and readable without JavaScript. Use relative asset paths so GitHub Pages project paths work.
- When changing the visible prompt, update dist/prompt.txt to the exact same text.
- Run `python3 scripts/validate.py` and `node --check dist/app.js`. For design changes, manually check narrow and wide screens, keyboard navigation, 200% text size, reduced motion, FAQs, clipboard failure, and text download in your browser; report which checks you actually performed.
- Don't edit .openai/hosting.json to target another owner's project. Forks should remove or replace that optional deployment configuration.

Open an issue for a public product/source problem with a minimal synthetic reproduction. For sensitive exposures, follow SECURITY.md. MIT licensing applies to contributions.
