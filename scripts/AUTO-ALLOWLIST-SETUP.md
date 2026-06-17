# Auto-allowlist: new Shopify orders → buyer_emails

Goal: every new DreamPlay order automatically adds the buyer's email to the
`buyer_emails` allowlist, which gates the `/my-reservation` buyer portal. No more
manual CSV imports.

## What's already built (in this repo)

- **Webhook handler:** [`src/app/api/webhooks/shopify/orders/route.ts`](../src/app/api/webhooks/shopify/orders/route.ts)
  HMAC-verifies the request, extracts the buyer email, and idempotently upserts
  it into `buyer_emails`. Handles `orders/create` and `orders/paid`.
- **HMAC verifier:** [`src/lib/shopify/verify-webhook.ts`](../src/lib/shopify/verify-webhook.ts)
- **DB backfill + grants:** [`buyer-emails-backfill-and-grants.sql`](./buyer-emails-backfill-and-grants.sql)
- **Webhook registration script:** [`shopify-register-order-webhook.mjs`](./shopify-register-order-webhook.mjs)

## Activation steps (manual, require Shopify admin access)

1. **Run the SQL** in the Supabase SQL editor (project `tqhfpcdqxylrknwbrqqi`):
   `buyer-emails-backfill-and-grants.sql`. This backfills 14 existing buyers and
   grants the service role INSERT/UPDATE on `buyer_emails` (writes are currently
   denied, which blocks both the backfill and the webhook).

2. **Add the `read_orders` scope to the DreamPlay custom app.** As of
   2026-06-17 the app (client id `5b955b92…` on `dreamplay-pianos.myshopify.com`)
   only carries `write_price_rules`, so order/customer reads and webhook
   registration return `ACCESS_DENIED`. On dev.shopify.com: bump the app version
   with `read_orders` added, then **uninstall and reinstall** the app on the
   store — managed-install tokens only carry the scopes consented at install
   time, so a version bump alone is not enough.

3. **Set env vars** on the website's Vercel project:
   - `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (already set)
   - `SHOPIFY_WEBHOOK_SECRET` = the DreamPlay app client secret (`shpss_…`) if
     registering via the API/this script, OR the store webhook secret shown in
     Settings → Notifications if registering in the admin UI. It must match the
     registration method.

4. **Register the webhooks** (after step 2):
   ```
   SHOPIFY_STORE_DOMAIN=dreamplay-pianos.myshopify.com \
   SHOPIFY_CLIENT_ID=… SHOPIFY_CLIENT_SECRET=… \
   WEBHOOK_URL=https://www.dreamplaypianos.com/api/webhooks/shopify/orders \
   node scripts/shopify-register-order-webhook.mjs
   ```
   (Alternatively, register in Shopify admin → Settings → Notifications → Webhooks:
   "Order creation" + "Order payment", JSON, same URL — then set
   `SHOPIFY_WEBHOOK_SECRET` to the secret shown on that page.)

5. **Test:** place a test order (or use Shopify's "Send test notification"),
   confirm a 200 from the endpoint and a new row in `buyer_emails`.

## Note on which store

DreamPlay orders are on `dreamplay-pianos.myshopify.com`. The separate
`musicalbasics.myshopify.com` store (used by the Belgium concert work) has its
own legacy app/token and does **not** contain DreamPlay products — don't reuse
that token here.
