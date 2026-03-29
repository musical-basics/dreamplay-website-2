"use client"

/**
 * Homepage A/B Test Utilities
 * 
 * Syncs the `dp_homepage_ab` cookie value to localStorage on page load,
 * and provides a helper to read the assigned homepage variant.
 */

const STORAGE_KEY = "dp_homepage_ab"

/**
 * Get the user's assigned homepage variant from localStorage.
 * Returns "/premium-offer" or "/landing-page-1", or "/" as fallback.
 */
export function getHomepage(): string {
    if (typeof window === "undefined") return "/"

    const variant = localStorage.getItem(STORAGE_KEY)
    if (variant === "premium-offer") return "/premium-offer"
    if (variant === "landing-page-1") return "/landing-page-1"

    return "/"
}

/**
 * Sync the homepage A/B cookie to localStorage.
 * Call this on mount in both /premium-offer and /landing-page-1 pages.
 */
export function syncHomepageAB(): void {
    if (typeof document === "undefined") return

    const match = document.cookie.match(/(^| )dp_homepage_ab=([^;]+)/)
    if (match) {
        const variant = match[2]
        localStorage.setItem(STORAGE_KEY, variant)
    }
}
