/**
 * Register the orders/create + orders/paid webhooks on the DreamPlay Shopify
 * store so new orders auto-add the buyer to the buyer_emails allowlist.
 *
 * Run:
 *   SHOPIFY_STORE_DOMAIN=dreamplay-pianos.myshopify.com \
 *   SHOPIFY_CLIENT_ID=... SHOPIFY_CLIENT_SECRET=... \
 *   WEBHOOK_URL=https://www.dreamplaypianos.com/api/webhooks/shopify/orders \
 *   node scripts/shopify-register-order-webhook.mjs
 *
 * PREREQUISITE: the DreamPlay custom app must have the `read_orders` access
 * scope. As of 2026-06-17 it only has `write_price_rules`, so this script will
 * return ACCESS_DENIED until the scope is added on dev.shopify.com AND the app
 * is uninstalled + reinstalled on the store (managed-install tokens only carry
 * the scopes consented at install time). See scripts/AUTO-ALLOWLIST-SETUP.md.
 */
const domain = process.env.SHOPIFY_STORE_DOMAIN || "dreamplay-pianos.myshopify.com";
const version = process.env.SHOPIFY_API_VERSION || "2025-10";
const webhookUrl = process.env.WEBHOOK_URL || "https://www.dreamplaypianos.com/api/webhooks/shopify/orders";

async function getToken() {
    const res = await fetch(`https://${domain}/admin/oauth/access_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: process.env.SHOPIFY_CLIENT_ID,
            client_secret: process.env.SHOPIFY_CLIENT_SECRET,
            grant_type: "client_credentials",
        }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(`token exchange failed: ${JSON.stringify(json)}`);
    console.log("token scopes:", json.scope);
    return json.access_token;
}

async function gql(token, query, variables = {}) {
    const res = await fetch(`https://${domain}/admin/api/${version}/graphql.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
        body: JSON.stringify({ query, variables }),
    });
    const json = await res.json();
    if (json.errors) throw new Error(`GraphQL: ${JSON.stringify(json.errors)}`);
    return json.data;
}

const MUTATION = `
  mutation register($topic: WebhookSubscriptionTopic!, $url: URL!) {
    webhookSubscriptionCreate(topic: $topic, webhookSubscription: { callbackUrl: $url, format: JSON }) {
      webhookSubscription { id topic }
      userErrors { field message }
    }
  }`;

const token = await getToken();
for (const topic of ["ORDERS_CREATE", "ORDERS_PAID"]) {
    try {
        const data = await gql(token, MUTATION, { topic, url: webhookUrl });
        const r = data.webhookSubscriptionCreate;
        if (r.userErrors?.length) console.log(`${topic}: userErrors`, r.userErrors);
        else console.log(`${topic}: registered`, r.webhookSubscription?.id);
    } catch (e) {
        console.error(`${topic}: FAILED -`, e.message);
    }
}
