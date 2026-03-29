import { redirect } from "next/navigation"

/**
 * Root page — middleware handles A/B routing for `/`.
 * This page only renders if middleware doesn't redirect (e.g., in development without Supabase).
 * Falls back to /premium-offer.
 */

interface PageProps {
    searchParams: Promise<Record<string, string | string[]>>
}

export default async function HomePage({ searchParams }: PageProps) {
    const params = await searchParams
    const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, val]) => {
            acc[key] = Array.isArray(val) ? val[0] : val
            return acc
        }, {} as Record<string, string>)
    ).toString()

    // Fallback only — middleware should handle this route
    redirect(queryString ? `/premium-offer?${queryString}` : "/premium-offer")
}
