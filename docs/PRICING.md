# DreamPlay Pricing Reference

This is the **canonical source of truth** for all DreamPlay product pricing.
When prices change, update this file first, then update all codebase references to match.

Last updated: 2026-04-10

---

## Products

### DreamPlay One
The core instrument with standard key width.

| Price Type | Value | Notes |
|---|---|---|
| MSRP | $1,499 | "Compare at" / full retail price |
| Sale / Market Price | $999 | Active selling price on checkout and marketing |
| 50% Deposit | ~$499.50 | Used in the current deposit checkout model |

### DreamPlay One Pro
Premium tier with elevated finishes (Aztec Gold, Nightmare Black).

| Price Type | Value | Notes |
|---|---|---|
| MSRP | $2,499 | "Compare at" / full retail price |
| Sale / Market Price | $1,899 | Active selling price on checkout and marketing |
| 50% Deposit | ~$949.50 | Used in the current deposit checkout model |
| Founder's Upgrade Fee | $200 | Upgrade cost for existing One reservation holders |

---

## Where These Prices Appear in the Codebase

| File | Context | Price Used |
|---|---|---|
| `src/app/(website-pages)/product-information/page.tsx` | Spec/comparison tables | Both MSRP and sale |
| `src/app/(website-pages)/checkout/page.tsx` | `comparePrice` field | MSRP (strike-through) |
| `src/app/(website-pages)/my-reservation/ReservationDecisionModule.tsx` | Buyer portal pricing cards | Sale price |
| `src/config/journeys.ts` | Journey config | Sale price |
| `src/components/extended-offer/pricing-section.tsx` | Pricing section | MSRP |
| `src/components/extended-offer/countdown-banner.tsx` | Banner | MSRP |
| `src/components/intro-offer/comparison-table-section.tsx` | Comparison table | MSRP |
| `src/components/UrgencySubtext.tsx` | Urgency copy | MSRP |
| `src/actions/reservation-actions.ts` | Email templates | Sale price |

---

## Rules

1. **Marketing pages** (intro-offer, extended-offer, product-information) use **MSRP** as the "compare at" value to communicate retail value.
2. **Checkout** uses the **sale price** as the actual charge, with MSRP as `comparePrice` for the strikethrough.
3. **Buyer portal** (`/my-reservation`) uses the **sale price**.
4. The **Founder's Upgrade Fee of $200** applies only to existing reservation holders upgrading from One to One Pro — it is not a public-facing price and should only appear on the `/my-reservation` page.
