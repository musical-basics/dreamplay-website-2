import { VARIANT_MAP } from "@/app/(website-pages)/customize/variant-map";
export { SHOP_BASE_URL, SHOP_HOME_URL, SHOP_HOST, SHOP_LINKS } from "./shop-links";

export type ShopOptionKey = "size" | "finish";

export type ShopOption = {
    label: string;
    value: string;
    description?: string;
};

export type ShopOptionGroup = {
    key: ShopOptionKey;
    label: string;
    options: ShopOption[];
};

export type ShopVariant = {
    id: string;
    title: string;
    variantId: string;
    options: Partial<Record<ShopOptionKey, string>>;
    available: boolean;
};

export type ShopProduct = {
    id: string;
    anchor: string;
    category: "keyboard" | "bundle" | "bench";
    name: string;
    eyebrow: string;
    subtitle: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    totalPrice?: number;
    pricePrefix?: string;
    paymentNote: string;
    delivery: string;
    badge?: string;
    image: string;
    gallery: string[];
    imageAlt: string;
    includes: string[];
    details: string[];
    optionGroups: ShopOptionGroup[];
    variants: ShopVariant[];
    unavailableMessage?: string;
};

const oneSizes: ShopOption[] = [
    { label: "DS5.5", value: "DS5.5", description: "7/8 key width" },
    { label: "DS6.0", value: "DS6.0", description: "15/16 key width" },
    { label: "DS6.5", value: "DS6.5", description: "Standard width" },
];

const proSizes: ShopOption[] = [
    { label: "DS5.5", value: "DS5.5", description: "7/8 key width" },
    { label: "DS6.0", value: "DS6.0", description: "15/16 key width" },
];

const oneFinishes: ShopOption[] = [
    { label: "Midnight Black", value: "Black" },
    { label: "Pearl White", value: "White" },
];

const proFinishes: ShopOption[] = [
    { label: "Nightmare Black", value: "Nightmare Black" },
    { label: "Aztec Gold", value: "Aztec Gold" },
];

const keyboardImages = [
    "/images/keyboards/DS6.0-Black-transparent v2.png",
    "/images/keyboards/ds55-white-narrow-keys-alt.png",
    "/images/keyboards/piano-front-2.jpg",
];

const bundleImages = [
    "/images/keyboards/Piano + Bench Frontal + Bundle.png",
    "/images/accessories/piano-bench-bundle.png",
    "/holiday-sale/images/slot-5-x-stand.png",
];

const proImages = [
    "/images/pro/nightmare-black-angled.png",
    "/images/pro/aztec-gold-full.jpg",
    "/images/pro/built-for-the-player.jpg",
];

const hydraulicBenchVariantId = process.env.NEXT_PUBLIC_SHOPIFY_HYDRAULIC_BENCH_VARIANT_ID || "";

function buildVariants(
    tier: keyof typeof VARIANT_MAP,
    sizes: ShopOption[],
    finishes: ShopOption[],
): ShopVariant[] {
    return sizes.flatMap((size) => (
        finishes.map((finish) => {
            const variantId = VARIANT_MAP[tier]?.[size.value]?.[finish.value] || "";

            return {
                id: `${tier}-${size.value}-${finish.value}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                title: `${size.value} / ${finish.label}`,
                variantId,
                options: {
                    size: size.value,
                    finish: finish.value,
                },
                available: Boolean(variantId),
            };
        })
    ));
}

export const SHOP_PRODUCTS: ShopProduct[] = [
    {
        id: "dreamplay-one",
        anchor: "dreamplay-one",
        category: "keyboard",
        name: "DreamPlay One",
        eyebrow: "Narrow-key digital piano",
        subtitle: "Keyboard only",
        description: "The core DreamPlay instrument with DS Standard key widths, designed to reduce strain and make larger repertoire feel physically possible.",
        price: 499,
        compareAtPrice: 1499,
        totalPrice: 999,
        pricePrefix: "Deposit today",
        paymentNote: "Pay $499 today, then $500 when your piano is boxed and ready to ship.",
        delivery: "Target delivery: October 2026",
        image: keyboardImages[0],
        gallery: keyboardImages,
        imageAlt: "DreamPlay One keyboard in black",
        includes: ["DreamPlay One keyboard", "Power adapter", "Basic sustain pedal", "Founder price lock"],
        details: ["DS5.5, DS6.0, or DS6.5", "Midnight Black or Pearl White", "50% now, 50% at delivery"],
        optionGroups: [
            { key: "size", label: "Key Width", options: oneSizes },
            { key: "finish", label: "Finish", options: oneFinishes },
        ],
        variants: buildVariants("solo", oneSizes, oneFinishes),
    },
    {
        id: "dreamplay-one-bundle",
        anchor: "dreamplay-one-bundle",
        category: "bundle",
        name: "DreamPlay One Premium Bundle",
        eyebrow: "Complete starter setup",
        subtitle: "Keyboard, stand, pedal, standard bench",
        description: "The easiest complete setup for home practice: DreamPlay One plus the matched essentials, including the lower-cost padded bench.",
        price: 549,
        compareAtPrice: 1499,
        totalPrice: 1099,
        pricePrefix: "Deposit today",
        paymentNote: "Pay $549 today, then $550 when your bundle is boxed and ready to ship.",
        delivery: "Target delivery: October 2026",
        badge: "Most Popular",
        image: bundleImages[0],
        gallery: bundleImages,
        imageAlt: "DreamPlay One with bench and bundle accessories",
        includes: ["DreamPlay One keyboard", "Keyboard stand", "Sustain pedal", "Standard padded bench"],
        details: ["Best value for first setups", "Lower-cost bench included", "50% now, 50% at delivery"],
        optionGroups: [
            { key: "size", label: "Key Width", options: oneSizes },
            { key: "finish", label: "Finish", options: oneFinishes },
        ],
        variants: buildVariants("full", oneSizes, oneFinishes),
    },
    {
        id: "dreamplay-one-pro",
        anchor: "dreamplay-one-pro",
        category: "keyboard",
        name: "DreamPlay One Pro",
        eyebrow: "Flagship keyboard",
        subtitle: "Keyboard only",
        description: "The higher-spec DreamPlay tier with elevated finishes, stronger performance hardware, and the same narrow-key philosophy.",
        price: 1899,
        compareAtPrice: 2499,
        paymentNote: "Charged at checkout for preorder.",
        delivery: "Target delivery: Q4 2026",
        image: proImages[0],
        gallery: proImages,
        imageAlt: "DreamPlay One Pro in Nightmare Black",
        includes: ["DreamPlay One Pro 88-key keyboard", "Sustain pedal", "DreamPlay Learn app lifetime access", "Power adapter and USB-C cable"],
        details: ["DS5.5 or DS6.0", "Nightmare Black or Aztec Gold", "Pro-grade touch and finishes"],
        optionGroups: [
            { key: "size", label: "Key Width", options: proSizes },
            { key: "finish", label: "Finish", options: proFinishes },
        ],
        variants: buildVariants("pro_solo", proSizes, proFinishes),
    },
    {
        id: "dreamplay-one-pro-bundle",
        anchor: "dreamplay-one-pro-bundle",
        category: "bundle",
        name: "DreamPlay One Pro Premium Bundle",
        eyebrow: "Flagship ecosystem",
        subtitle: "Pro keyboard, stand, triple pedal, standard bench",
        description: "DreamPlay One Pro with the matched furniture stand, triple pedal unit, and the lower-cost padded bench included.",
        price: 1999,
        compareAtPrice: 2499,
        paymentNote: "Charged at checkout for preorder.",
        delivery: "Target delivery: Q4 2026",
        badge: "Flagship",
        image: proImages[1],
        gallery: [proImages[1], proImages[0], bundleImages[1]],
        imageAlt: "DreamPlay One Pro in Aztec Gold",
        includes: ["DreamPlay One Pro 88-key keyboard", "Matched furniture stand", "Triple pedal unit", "Standard padded bench", "DreamPlay Learn app lifetime access"],
        details: ["Complete Pro setup", "Lower-cost bench included", "Premium finishes"],
        optionGroups: [
            { key: "size", label: "Key Width", options: proSizes },
            { key: "finish", label: "Finish", options: proFinishes },
        ],
        variants: buildVariants("pro_full", proSizes, proFinishes),
    },
    {
        id: "hydraulic-bench",
        anchor: "hydraulic-bench",
        category: "bench",
        name: "DreamPlay Hydraulic Bench",
        eyebrow: "Standalone bench upgrade",
        subtitle: "Premium adjustable bench",
        description: "A sturdier hydraulic bench for players who want finer height control, cleaner posture, and a more permanent studio setup.",
        price: 199,
        pricePrefix: "Standalone",
        paymentNote: "Charged at checkout.",
        delivery: "Ships separately when available",
        image: "/images/accessories/piano-bench-cushioned-black.jpg",
        gallery: ["/images/accessories/piano-bench-cushioned-black.jpg", "/images/accessories/piano-bench-bundle.png"],
        imageAlt: "Black piano bench",
        includes: ["Hydraulic height adjustment", "Padded seat", "Black studio finish"],
        details: ["Standalone upgrade", "Not the lower-cost bundle bench", "Best for posture-sensitive practice"],
        optionGroups: [],
        variants: [
            {
                id: "hydraulic-bench-default",
                title: "Default",
                variantId: hydraulicBenchVariantId,
                options: {},
                available: Boolean(hydraulicBenchVariantId),
            },
        ],
        unavailableMessage: "Checkout for this bench is not available yet.",
    },
];

export function formatShopPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(price);
}
