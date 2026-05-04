/**
 * useJourneyCheckout
 * Journey config is now hardcoded — this hook always returns the fallback checkout path.
 */
export function useJourneyCheckout(fallback = "/shop") {
    return fallback
}
