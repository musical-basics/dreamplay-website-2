"use client"

import { useState, useEffect } from "react"
import { getJourneyById } from "@/actions/admin-actions"

/**
 * Reads the dp_journey_id cookie, fetches the journey config,
 * and returns the resolved checkout path:
 *   1. journey.checkout if it's non-empty  (e.g. "/reserve", "/checkout")
 *   2. Direct Shopify cart URL built from the first product's variantId
 *   3. Falls back to `/checkout` if nothing is configured
 */
export function useJourneyCheckout(fallback = "/checkout") {
    const [checkoutPath, setCheckoutPath] = useState(fallback)

    useEffect(() => {
        const match = document.cookie.match(/(^| )dp_journey_id=([^;]+)/)
        if (!match) return

        getJourneyById(match[2]).then(journey => {
            if (!journey) return

            // 1. Explicit checkout path configured
            if (journey.checkout && journey.checkout.trim()) {
                setCheckoutPath(journey.checkout)
                return
            }

            // 2. No checkout path → go directly to Shopify with the first product's variant
            if (journey.products?.length && journey.products[0].variantId) {
                const variantId = journey.products[0].variantId
                const discountCode = journey.products[0].discountCode
                let url = `https://dreamplay-pianos.myshopify.com/cart/${variantId}:1`
                if (discountCode) url += `?discount=${discountCode}`
                setCheckoutPath(url)
            }
        })
    }, [fallback])

    return checkoutPath
}
