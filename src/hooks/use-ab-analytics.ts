"use client"

import { useEffect, useRef } from "react"
import { logEvent } from "@/lib/analytics"

export type ABVariant = "control" | "variant"

export function useABAnalytics(pageName: string, options: { trackTime: boolean } = { trackTime: true }) {
    const startTime = useRef(Date.now())
    const hasTrackedTime = useRef(false)

    // Helper: Get bucket from cookie, or null
    // Supports both legacy "ab-test-bucket" and new "ab_{testSlug}" patterns
    const getBucket = (testSlug?: string): ABVariant | null => {
        if (typeof document === "undefined") return null

        // If testSlug provided, check for specific ab_{testSlug} cookie
        if (testSlug) {
            const match = document.cookie.match(new RegExp(`(^| )ab_${testSlug}=([^;]+)`))
            if (match) return match[2] as ABVariant
        }

        // Fallback: check legacy cookie
        const legacyMatch = document.cookie.match(new RegExp("(^| )ab-test-bucket=([^;]+)"))
        if (legacyMatch) return legacyMatch[2] as ABVariant

        // Also check for any ab_* cookie as a fallback
        const anyAbMatch = document.cookie.match(new RegExp("(^| )ab_[^=]+=([^;]+)"))
        return anyAbMatch ? (anyAbMatch[2] as ABVariant) : null
    }

    // Track Time on Page
    useEffect(() => {
        if (!options.trackTime) return;

        startTime.current = Date.now()
        hasTrackedTime.current = false

        const trackTime = () => {
            if (hasTrackedTime.current) return
            const duration = (Date.now() - startTime.current) / 1000 // seconds
            const bucket = getBucket()
            const storedEmail = typeof window !== 'undefined' ? localStorage.getItem("dp_user_email") : null

            logEvent("time_on_page", {
                path: pageName,
                metadata: {
                    duration_seconds: duration,
                    ab_test_bucket: bucket,
                    ...(storedEmail && { email: storedEmail })
                }
            })
            hasTrackedTime.current = true
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                trackTime()
            }
        }

        // Track on unmount or tab switch
        window.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            trackTime()
            window.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [pageName, options.trackTime])

    // Track Clicks
    const trackClick = (location: string, label: string) => {
        const bucket = getBucket()
        const storedEmail = typeof window !== 'undefined' ? localStorage.getItem("dp_user_email") : null
        const payload = {
            page: pageName,
            location,
            label,
            ab_test_bucket: bucket,
            ...(storedEmail && { email: storedEmail })
        }

        logEvent("cta_click", {
            path: pageName,
            metadata: payload
        })
    }

    return { trackClick }
}
