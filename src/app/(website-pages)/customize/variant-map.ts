/**
 * Shopify Variant ID Map
 * 
 * Maps tier × size × color to Shopify variant IDs.
 * Pricing is now controlled per-journey in the admin panel — this file
 * just maps physical product variants to their Shopify IDs.
 * 
 * Structure: VARIANT_MAP[tier][size][color]
 * To find a variant ID: Shopify Admin → Products → Variants → copy ID from URL.
 */
export const VARIANT_MAP: Record<string, Record<string, Record<string, string>>> = {
    full: { // DreamPlay Bundle
        'DS5.5': { 'Black': '53081205506362', 'White': '53081205539130' },
        'DS6.0': { 'Black': '53081205571898', 'White': '53081205604666' },
        'DS6.5': { 'Black': '53081289883962', 'White': '53081289916730' },
    },
    solo: { // Keyboard Only
        'DS5.5': { 'Black': '52968307097914', 'White': '52968307130682' },
        'DS6.0': { 'Black': '52968307163450', 'White': '52968307196218' },
        'DS6.5': { 'Black': '53081296470330', 'White': '53081296503098' },
    },

    reservation: { // Lock My Spot ($99)
        'DS5.5': { 'Black': '', 'White': '' },
        'DS6.0': { 'Black': '', 'White': '' },
        'DS6.5': { 'Black': '', 'White': '' },
    },
    reserve50: { // Reserve (50%)
        'DS5.5': { 'Black': '', 'White': '' },
        'DS6.0': { 'Black': '', 'White': '' },
        'DS6.5': { 'Black': '', 'White': '' },
    },
};
