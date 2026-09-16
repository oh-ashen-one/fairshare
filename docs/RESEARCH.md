# Product research

Reviewed September 15, 2026. These notes summarize public product descriptions, not hands-on testing or an endorsement. Features, prices, and policies can change. No reviews or marketing payout claims are treated as verified consumer outcomes.

| Product | Primary source | Observed positioning | What it informed |
| --- | --- | --- | --- |
| Collect – Settlement Finder | [Apple App Store](https://apps.apple.com/us/app/collect-settlement-finder/id6752740187) | Finds open settlements, presents estimated payouts and proof requirements, supports claim tracking and notifications; subscription required for all features | Make discovery and requirements easy to understand; keep Fairshare's instructions freely readable |
| Settlemate: Claim Savings | [Apple App Store](https://apps.apple.com/us/app/settlemate-claim-savings/id6737785495) | Settlement discovery and tracking alongside broader savings/refund opportunities; in-app subscriptions | Clearly separate class actions from other refunds and avoid suggesting every lead is a claim |
| TapClaim: Class Action Claims | [Apple App Store](https://apps.apple.com/us/app/tapclaim-class-action-claims/id6787419467), [privacy policy](https://tapclaim.app/legal/privacy) | Settlement discovery and tracking; policy describes user filing on an administrator's site | Preserve the user-controlled official filing handoff |

## Fairshare's design decisions

- A website explaining a portable, open-source agent workflow; no centralized personal intake.
- Optional product, location, and employment context; no identity needed for broad discovery.
- Current official-source verification, rather than a static catalogue that silently goes stale.
- Clear distinction among lead, possible match, open claim, filed claim, accepted claim, and paid claim.
- No “searches every lawsuit” or guaranteed-payout promise.
- Precise privacy language: local interface and local model are different, and external web research still sends requests.
- Plain static site, native FAQ controls, no third-party scripts or font requests, and one primary copy-prompt action.

## Operational source lessons

The [FTC refund directory](https://www.ftc.gov/enforcement/refunds) names programs and administrators. Its [refund FAQ](https://www.ftc.gov/enforcement/recent-ftc-cases-resulting-refunds/refund-programs-frequently-asked-questions) supports checking notices against official program information. These are government refund resources, not a complete class-action database. Fairshare keeps that distinction explicit.

The [FTC's refund/recovery scam guidance](https://consumer.ftc.gov/articles/refund-and-recovery-scams) supports caution around unsolicited recovery offers and upfront fees. It does not mean every legitimate non-FTC settlement follows identical identity-verification rules.

## Validation boundary

Research used primary app listings, published privacy information, and official government pages. No competitor app subscription was purchased. No user claim was filed, no personal profile was researched, and compatibility across individual agent products has not been end-to-end certified.
