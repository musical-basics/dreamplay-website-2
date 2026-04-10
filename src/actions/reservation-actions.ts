'use server'

/**
 * reservation-actions.ts
 * Server-side actions for buyer portal: decision persistence + buyer routing.
 * All reads/writes use the service role key (server-side only).
 */

import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Service-role client — server-side only
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export type ReservationDecision = 'refund_requested' | 'keep_reservation' | 'upgrade_to_pro'

const DECISION_LABELS: Record<ReservationDecision, string> = {
    refund_requested: 'Request Full Refund',
    keep_reservation: 'Keep My Reservation',
    upgrade_to_pro: 'Upgrade to DreamPlay Pro',
}

// ─── Buyer Allowlist ───

/**
 * Returns true if the given email is in the buyer_emails allowlist.
 * Comparison is case-insensitive.
 */
export async function isBuyer(email: string): Promise<boolean> {
    const normalizedEmail = email.toLowerCase().trim()
    try {
        const { data, error } = await supabase
            .from('buyer_emails')
            .select('email')
            .eq('email', normalizedEmail)
            .maybeSingle()

        if (error) {
            console.error('[isBuyer] DB error:', error.code, error.message)
            return false
        }

        return !!data
    } catch (err: any) {
        console.error('[isBuyer] Unexpected error:', err?.message)
        return false
    }
}

// ─── Decision Records ───

export interface DecisionRecord {
    id: string
    user_id: string
    email: string | null
    decision: ReservationDecision
    selected_at: string
    order_metadata: Record<string, any>
    created_at: string
    updated_at: string
}

/**
 * Fetch the current saved decision for a user.
 * Returns null if no decision has been recorded yet.
 */
export async function getReservationDecision(userId: string): Promise<DecisionRecord | null> {
    try {
        const { data, error } = await supabase
            .from('reservation_decisions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle()

        if (error) {
            console.error('[getReservationDecision] DB error:', error.message)
            return null
        }

        return data as DecisionRecord | null
    } catch (err) {
        console.error('[getReservationDecision] Unexpected error:', err)
        return null
    }
}

/**
 * Upsert a reservation decision for a user, then send a Resend notification email.
 * Returns { success: true } on success or { success: false, error: string } on failure.
 */
export async function saveReservationDecision(
    userId: string,
    email: string | null,
    decision: ReservationDecision,
    orderMetadata?: Record<string, any>
): Promise<{ success: boolean; error?: string }> {
    try {
        // Check if a row already exists for this user
        const { data: existing } = await supabase
            .from('reservation_decisions')
            .select('id')
            .eq('user_id', userId)
            .maybeSingle()

        const now = new Date().toISOString()

        if (existing?.id) {
            const { error } = await supabase
                .from('reservation_decisions')
                .update({
                    decision,
                    email,
                    selected_at: now,
                    order_metadata: orderMetadata ?? {},
                    updated_at: now,
                })
                .eq('id', existing.id)

            if (error) {
                console.error('[saveReservationDecision] Update error:', error.message)
                return { success: false, error: error.message }
            }
        } else {
            const { error } = await supabase
                .from('reservation_decisions')
                .insert({
                    user_id: userId,
                    email,
                    decision,
                    selected_at: now,
                    order_metadata: orderMetadata ?? {},
                    created_at: now,
                    updated_at: now,
                })

            if (error) {
                console.error('[saveReservationDecision] Insert error:', error.message)
                return { success: false, error: error.message }
            }
        }

        // ─── Fire-and-forget Resend notification ───
        sendDecisionNotification(email, decision, orderMetadata).catch((err) =>
            console.error('[saveReservationDecision] Notification error (non-blocking):', err)
        )

        return { success: true }
    } catch (err: any) {
        console.error('[saveReservationDecision] Unexpected error:', err?.message)
        return { success: false, error: err?.message ?? 'Unknown error' }
    }
}

/**
 * Internal: sends a notification email to the team when a buyer submits their decision.
 * Non-blocking — failures do not affect the buyer's confirmation state.
 */
async function sendDecisionNotification(
    buyerEmail: string | null,
    decision: ReservationDecision,
    metadata?: Record<string, any>
): Promise<void> {
    if (!process.env.RESEND_API_KEY) {
        console.warn('[sendDecisionNotification] RESEND_API_KEY not set — skipping notification')
        return
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const label = DECISION_LABELS[decision]
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    const previousDecision = metadata?.previous_decision
        ? ` (changed from: ${DECISION_LABELS[metadata.previous_decision as ReservationDecision]})`
        : ''

    const emojiMap: Record<ReservationDecision, string> = {
        refund_requested: '🔴',
        keep_reservation: '🟢',
        upgrade_to_pro: '⭐',
    }

    await resend.emails.send({
        from: 'DreamPlay Portal <portal@dreamplaypianos.com>',
        to: ['lionel@musicalbasics.com'],
        subject: `${emojiMap[decision]} Reservation Decision: ${label}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
                <h2 style="margin: 0 0 16px;">Reservation Decision Submitted</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #666; width: 140px;">Buyer Email</td>
                        <td style="padding: 8px 0; font-weight: bold;">${buyerEmail ?? 'Unknown'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666;">Decision</td>
                        <td style="padding: 8px 0; font-weight: bold;">${emojiMap[decision]} ${label}${previousDecision}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666;">Submitted At</td>
                        <td style="padding: 8px 0;">${timestamp} PT</td>
                    </tr>
                </table>
                <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
                <p style="color: #999; font-size: 12px; margin: 0;">
                    View all decisions: 
                    <a href="https://supabase.com/dashboard" style="color: #666;">Supabase → reservation_decisions</a>
                </p>
            </div>
        `,
    })
}
