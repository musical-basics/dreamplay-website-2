import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyShopifyWebhook } from "@/lib/shopify/verify-webhook";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Shopify order webhook -> buyer_emails allowlist.
 *
 * Registered for topics `orders/create` and `orders/paid` on the DreamPlay
 * Shopify store. Every new order adds the buyer's email to `buyer_emails`,
 * which is the allowlist that gates the /my-reservation buyer portal. This is
 * how a new customer can log in and manage their reservation without a manual
 * CSV import.
 *
 * Idempotent: re-fires (orders/create followed by orders/paid, or Shopify
 * retries) upsert on the email and are harmless.
 *
 * Requires:
 *   - SHOPIFY_WEBHOOK_SECRET (HMAC signing secret for the registered webhook)
 *   - NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *   - INSERT privilege for the service role on buyer_emails
 *     (see scripts/buyer-emails-backfill-and-grants.sql)
 */

type ShopifyOrder = {
    id?: number | string;
    name?: string;
    email?: string | null;
    contact_email?: string | null;
    customer?: {
        email?: string | null;
        first_name?: string | null;
        last_name?: string | null;
    } | null;
};

export async function POST(req: Request) {
    const raw = await req.text();
    const hmac = req.headers.get("x-shopify-hmac-sha256");
    const topic = req.headers.get("x-shopify-topic") || "unknown";

    if (!verifyShopifyWebhook(raw, hmac)) {
        console.warn("[shopify-orders-webhook] signature failed", { topic, hasHmac: Boolean(hmac) });
        return new NextResponse("invalid signature", { status: 401 });
    }

    let order: ShopifyOrder;
    try {
        order = JSON.parse(raw);
    } catch {
        return new NextResponse("invalid json", { status: 400 });
    }

    const email = (order.email || order.contact_email || order.customer?.email || "").toLowerCase().trim();
    if (!email) {
        // Acknowledge so Shopify stops retrying; nothing to allowlist.
        return NextResponse.json({ ok: true, skipped: "no_email" });
    }

    const name = [order.customer?.first_name, order.customer?.last_name].filter(Boolean).join(" ").trim();
    const orderRef = order.name || order.id || "unknown";
    const notes = `${name || "DreamPlay buyer"} — auto-added from Shopify order ${orderRef}`;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Idempotent: don't overwrite an existing allowlist entry's notes on re-fire.
    const { error } = await supabase
        .from("buyer_emails")
        .upsert({ email, notes }, { onConflict: "email", ignoreDuplicates: true });

    if (error) {
        console.error("[shopify-orders-webhook] upsert failed", { topic, email, code: error.code, message: error.message });
        // 500 so Shopify retries (e.g. transient DB error). A persistent
        // permission error here means the service role lacks INSERT on
        // buyer_emails — run scripts/buyer-emails-backfill-and-grants.sql.
        return new NextResponse("db error", { status: 500 });
    }

    return NextResponse.json({ ok: true, topic, email });
}
