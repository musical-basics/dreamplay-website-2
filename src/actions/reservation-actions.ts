'use server'

import { createClient } from '@supabase/supabase-js'

// Service-role client — server-side only
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export type ReservationDecision = 'refund_requested' | 'keep_reservation' | 'upgrade_to_pro'

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
            console.error('[reservation-actions] getReservationDecision error:', error)
            return null
        }

        return data as DecisionRecord | null
    } catch (err) {
        console.error('[reservation-actions] getReservationDecision unexpected error:', err)
        return null
    }
}

/**
 * Upsert a reservation decision for a user.
 * If a decision already exists, it is updated.
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
            // Update existing row
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
                console.error('[reservation-actions] saveReservationDecision update error:', error)
                return { success: false, error: error.message }
            }
        } else {
            // Insert new row
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
                console.error('[reservation-actions] saveReservationDecision insert error:', error)
                return { success: false, error: error.message }
            }
        }

        return { success: true }
    } catch (err: any) {
        console.error('[reservation-actions] saveReservationDecision unexpected error:', err)
        return { success: false, error: err?.message ?? 'Unknown error' }
    }
}
