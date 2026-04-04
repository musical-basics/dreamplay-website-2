# Website Pricing Update — Instructions for AI Agent

> Date: April 4, 2026
> Purpose: Update all pricing across dreamplaypianos.com to reflect new pricing structure.

---

## New Pricing Structure

| Product | MSRP | Market Price (Founder's Price) |
|---------|------|-------------------------------|
| DreamPlay One (keyboard only) | $1,499 | **$999** |
| DreamPlay One Premium Bundle (keyboard + bench + stand) | — | **$1,099** |
| DreamPlay One Pro (keyboard only) | $2,499 | **$1,899** |
| DreamPlay One Pro Premium Bundle (keyboard + bench + stand) | — | **$1,999** |

**Payment plan (DreamPlay One):** $499 deposit now, $500 due before shipping.

**Deposit tiers should be updated accordingly:**
- "Lock My Spot" reservation: $99 → **keep at $99** (no change)
- "Reserve (50%)" for One: was $274 → **$499** (50% of $999)

---

## File-by-File Changes

### 1. `src/app/(website-pages)/checkout/page.tsx`

**Current:**
```typescript
{
    id: "solo",
    title: "Keyboard Only",
    subtitle: "DreamPlay One",
    price: 1099,
    comparePrice: 1299,
    badge: null
},
{
    id: "full",
    title: "Complete Bundle",
    subtitle: "Keyboard, Stand, Bench, Pedal",
    price: 1199,
    comparePrice: 1499,
    badge: "Most Popular"
}
```

**Change to:**
```typescript
{
    id: "solo",
    title: "Keyboard Only",
    subtitle: "DreamPlay One",
    price: 999,
    comparePrice: 1499,
    badge: null
},
{
    id: "full",
    title: "Premium Bundle",
    subtitle: "Keyboard, Stand, Bench, Pedal",
    price: 1099,
    comparePrice: 1499,
    badge: "Most Popular"
}
```

Also update the installment text that says `Pay in 4 interest-free installments of <strong>${(activePackage.price / 4).toFixed(2)}</strong>` — the math will auto-update since it's calculated, but verify it renders correctly ($249.75 for solo, $274.75 for bundle).

---

### 2. `src/app/(website-pages)/customize/CustomizeClient.tsx`

**Update the `PRODUCT_CATALOG` object:**

**`reservation` tier** — NO CHANGE (keep at $99)

**`reserve50` tier — Change:**
```typescript
price: "$274",
description: "Pay 50% now, the rest (50% + shipping/taxes) when ready to ship.",
```
**To:**
```typescript
price: "$499",
description: "Pay 50% now ($499), the rest ($500 + shipping/taxes) when ready to ship.",
```

**`solo` tier — Change:**
```typescript
price: "$1,099",
retailPrice: null as string | null,
```
**To:**
```typescript
price: "$999",
retailPrice: "$1,499.00" as string | null,
```

**`full` tier — Change:**
```typescript
title: "DreamPlay Bundle",
price: "$1,199",
retailPrice: null as string | null,
```
**To:**
```typescript
title: "DreamPlay Premium Bundle",
price: "$1,099",
retailPrice: "$1,499.00" as string | null,
```

**`signature` tier — REMOVE entirely.** This tier is being retired since $999 is now the base DreamPlay One price.

---

### 3. `src/components/extended-offer/pricing-section.tsx`

**`reserve50` tier — Change:**
```typescript
price: "$274",
description: "Pay 50% now, the rest (50% + shipping/taxes) when ready to ship.",
```
**To:**
```typescript
price: "$499",
description: "Pay 50% now ($499), the rest ($500 + shipping/taxes) when ready to ship.",
```

**Commented-out `solo` tier — Uncomment and update:**
```typescript
// {
//   id: 'solo',
//   badge: null,
//   title: "DreamPlay One",
//   subtitle: "",
//   price: "$1,099",
//   msrp: null,
//   ...
// },
```
**Uncomment and set:**
```typescript
{
    id: 'solo',
    badge: null,
    title: "DreamPlay One",
    subtitle: "",
    price: "$999",
    msrp: "$1,499",
    description: "The DreamPlay One Keyboard. Available in DS5.5 or DS6.0. Choose Midnight Black or Pearl White.",
    includes: ["DreamPlay One Keyboard"],
    delivery: "Aug 2026",
    backers: 40,
    remaining: 10,
    total: 50,
    highlight: false,
},
```

**`full` tier — Change:**
```typescript
title: "DreamPlay Bundle",
price: "$1,199",
msrp: null,
```
**To:**
```typescript
title: "DreamPlay Premium Bundle",
price: "$1,099",
msrp: "$1,499",
```

---

### 4. `src/components/premium-offer/pricing-section.tsx`

**Apply the exact same changes as file #3 above** (this file is a duplicate of the extended-offer pricing-section).

---

### 5. `src/components/extended-offer/countdown-banner.tsx`

**Current:**
```tsx
<span className="hidden md:inline text-white/50">| Reserve for $549 before $1,199 MSRP</span>
<span className="md:hidden text-white/50">| $549 → $1,199</span>
```

**Change to:**
```tsx
<span className="hidden md:inline text-white/50">| Reserve for $499 before $1,499 MSRP</span>
<span className="md:hidden text-white/50">| $499 → $1,499</span>
```

---

### 6. `src/components/holiday-sale/` (entire directory)

**DELETE or disable all holiday-sale components.** The holiday sale is over and this page should be removed. Files to remove:
- `bundle-includes.tsx`
- `bundle-showcase.tsx`
- `countdown-timer.tsx`
- `final-cta.tsx`
- `flash-sale.tsx`
- `header.tsx`
- `product-hero.tsx`
- `theme-provider.tsx`
- `urgency-section.tsx`
- `value-proposition-backup-dimensions.tsx`
- `value-proposition.tsx`

Also remove any routes or imports that reference the holiday-sale page.

---

### 7. `src/components/intro-offer/comparison-table-section.tsx`

**Current:**
```typescript
{ feature: "MSRP Price", dreamplay: "$1,099", competitor: "$699 (Yamaha P125)" },
```

**Change to:**
```typescript
{ feature: "MSRP Price", dreamplay: "$1,499", competitor: "$699 (Yamaha P125)" },
```

Also update the following row if DreamPlay One no longer includes bench & stand by default:
```typescript
{ feature: "Bench & Stand", dreamplay: "Included", competitor: "Not Included" },
```
**Change to:**
```typescript
{ feature: "Bench & Stand", dreamplay: "Available in Premium Bundle ($1,099)", competitor: "Not Included" },
```

---

### 8. `src/components/intro-offer/cta-section.tsx`

**Current:**
```tsx
<p className="text-white text-sm mb-3 font-medium">DreamPlay Bundle</p>
<div className="flex items-baseline justify-center gap-4">
    <span className="text-5xl md:text-6xl font-semibold">$1,199</span>
</div>
```

**Change to:**
```tsx
<p className="text-white text-sm mb-3 font-medium">DreamPlay One</p>
<div className="flex items-baseline justify-center gap-4">
    <span className="text-5xl md:text-6xl font-semibold">$999</span>
</div>
```

*(Lead with the $999 keyboard-only price as the hero number — it's the most compelling entry point.)*

---

### 9. `src/components/ProductJsonLd.tsx`

**Current:**
```typescript
"price": "699",
"priceValidUntil": "2026-04-30",
```

**Change to:**
```typescript
"price": "999",
"priceValidUntil": "2026-12-31",
```

---

### 10. `src/components/UrgencySubtext.tsx`

**Current:**
```tsx
Prices go up in April 2026 to $1099 MSRP.
```

**Change to:**
```tsx
MSRP $1,499 — Founder's pricing available for a limited time.
```

*(The old message references April 2026, which is now — so the urgency framing needs to change.)*

---

### 11. `src/components/chatbot/system-prompt.ts`

The chatbot pulls pricing from an admin knowledge base at runtime, NOT from this file. However, **update the admin panel / knowledge base** to reflect the new pricing:
- DreamPlay One: $999 (MSRP $1,499)
- DreamPlay One Premium Bundle: $1,099
- DreamPlay One Pro: $1,899 (MSRP $2,499)
- DreamPlay One Pro Premium Bundle: $1,999
- Deposit: $499 now, $500 later

---

## Additional Notes

- **Signature tier is retired.** Remove it from all product catalogs and pricing sections.
- **Holiday sale pages should be fully removed** — delete all components in `src/components/holiday-sale/` and any related routes/imports.
- **Colors available:** DreamPlay One comes in Midnight Black and Pearl White. DreamPlay One Pro comes in Nightmare Black and Aztec Gold. Update any color references on product pages if they don't reflect this.
- **"DreamPlay Bundle" should be renamed to "DreamPlay Premium Bundle"** wherever it appears, to align with the new tiering.
- **Payment plan messaging** should be added to checkout and pricing sections: "Pay $499 today, $500 before shipping."
- **The `buy-product` pages** (buy-product, buy-product2, buy-product3) reference "$400 Off Our MSRP" — update savings messaging to reflect new MSRP of $1,499 (savings of $500 for One at $999).
