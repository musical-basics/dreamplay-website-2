'use server'

import { createClient } from '@supabase/supabase-js'
import { DEFAULT_FAQ_ITEMS } from './faq-data'
import type { FAQItem } from './faq-data'

export type { FAQItem }

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function getFaqItems(): Promise<FAQItem[]> {
    try {
        // NOTE: We are using a new key 'faq_items_v2' to instantly load the new 
        // 25+ question payload without needing to wipe your database manually.
        const { data, error } = await supabase
            .from('admin_variables')
            .select('value')
            .eq('key', 'faq_items_v2')
            .single()

        if (error || !data) {
            return DEFAULT_FAQ_ITEMS
        }

        const items = JSON.parse(data.value);
        return items.map((item: FAQItem) => ({
            ...item,
            category: item.category || 'General'
        }));
    } catch (error) {
        console.error('Failed to get FAQ items:', error)
        return DEFAULT_FAQ_ITEMS
    }
}

export async function updateFaqItems(items: FAQItem[]) {
    try {
        const { error } = await supabase
            .from('admin_variables')
            .upsert({
                key: 'faq_items_v2', // Save to the new v2 key
                value: JSON.stringify(items),
                updated_at: new Date().toISOString()
            })

        if (error) {
            console.error('Error updating FAQ items:', error)
            throw new Error(error.message)
        }

        return { success: true }
    } catch (error: any) {
        console.error('Failed to update FAQ items:', error)
        return { success: false, error: error.message }
    }
}
