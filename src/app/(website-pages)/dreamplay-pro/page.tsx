import Image from "next/image"
import Link from "next/link"
import { SpecialOfferHeader } from "@/components/intro-offer/header"
import Footer from "@/components/Footer"

export const metadata = {
    title: "DreamPlay One Pro - 88-Key Graded Hammer Digital Piano | DS5.5 & DS6.0",
    description:
        "The DreamPlay One Pro features graded hammer action, triple-sensor keys, 256-note polyphony, 230 sounds, and an advanced LED learning system. Starting at $1,899 with free shipping.",
    alternates: {
        canonical: "https://dreamplaypianos.com/dreamplay-pro",
    },
}

const featureList = [
    "Graded Hammer Action",
    "Triple-Sensor Pro Action",
    "256-Note Polyphony",
    "230 Onboard Sound Presets",
    "Advanced LED System (Above and Within Keys)",
    "DreamPlay Learn App Included",
    "40W Stereo Speakers",
    "Bluetooth Audio and MIDI",
    "USB Type-C MIDI",
    "Triple Pedal Support",
    "Dual Headphone Jacks (3.5mm + 6.35mm)",
]

const variants = [
    { name: "One Pro - DS5.5 - Nightmare Black", size: "DS5.5", color: "Nightmare Black", package: "Keyboard Only", price: "$1,899", compareAt: "$2,499" },
    { name: "One Pro - DS5.5 - Aztec Gold", size: "DS5.5", color: "Aztec Gold", package: "Keyboard Only", price: "$1,899", compareAt: "$2,499" },
    { name: "One Pro - DS6.0 - Nightmare Black", size: "DS6.0", color: "Nightmare Black", package: "Keyboard Only", price: "$1,899", compareAt: "$2,499" },
    { name: "One Pro - DS6.0 - Aztec Gold", size: "DS6.0", color: "Aztec Gold", package: "Keyboard Only", price: "$1,899", compareAt: "$2,499" },
    { name: "One Pro Premium Bundle - DS5.5 - Nightmare Black", size: "DS5.5", color: "Nightmare Black", package: "Premium Bundle", price: "$1,999", compareAt: "-" },
    { name: "One Pro Premium Bundle - DS5.5 - Aztec Gold", size: "DS5.5", color: "Aztec Gold", package: "Premium Bundle", price: "$1,999", compareAt: "-" },
    { name: "One Pro Premium Bundle - DS6.0 - Nightmare Black", size: "DS6.0", color: "Nightmare Black", package: "Premium Bundle", price: "$1,999", compareAt: "-" },
    { name: "One Pro Premium Bundle - DS6.0 - Aztec Gold", size: "DS6.0", color: "Aztec Gold", package: "Premium Bundle", price: "$1,999", compareAt: "-" },
]

const comparisonRows = [
    { label: "Price", one: "$999", pro: "$1,899" },
    { label: "Action", one: "Weighted Hammer", pro: "Graded Hammer" },
    { label: "Key Sensors", one: "Dual-Sensor", pro: "Triple-Sensor (Pro Action)" },
    { label: "Polyphony", one: "192 Notes", pro: "256 Notes" },
    { label: "Onboard Sounds", one: "18 Presets", pro: "230 Presets" },
    { label: "LED System", one: "Above every key", pro: "Above and within every key" },
    { label: "Speakers", one: "30W Stereo", pro: "40W Stereo" },
    { label: "Pedal Support", one: "Single sustain", pro: "Triple pedal" },
    { label: "Headphone", one: "1x 3.5mm", pro: "1x 3.5mm + 1x 6.35mm" },
    { label: "Colors", one: "Midnight Black, Pearl White", pro: "Nightmare Black, Aztec Gold" },
    { label: "Free Shipping", one: "No", pro: "Yes" },
    { label: "No Tariff Fees", one: "No", pro: "Yes" },
]

export default function DreamPlayProPage() {
    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "DreamPlay One Pro",
        description:
            "DreamPlay One Pro is an 88-key digital piano with graded hammer action, triple-sensor key detection, 256-note polyphony, and an advanced LED learning system.",
        image: [
            "https://dreamplaypianos.com/images/pro/nightmare-black-angled.jpg",
            "https://dreamplaypianos.com/images/pro/aztec-gold-full.jpg",
        ],
        brand: {
            "@type": "Brand",
            name: "DreamPlay Pianos",
        },
        offers: {
            "@type": "Offer",
            url: "https://dreamplaypianos.com/dreamplay-pro",
            priceCurrency: "USD",
            price: "1899",
            priceValidUntil: "2026-12-31",
            availability: "https://schema.org/PreOrder",
            itemCondition: "https://schema.org/NewCondition",
        },
    }

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />

            <SpecialOfferHeader forceOpaque={true} darkMode={false} className="border-b border-neutral-200 bg-white" />

            <main className="pt-16">
                <section className="relative overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 px-4 py-18 text-white md:px-8 lg:px-12">
                    <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.25em] text-amber-300">Flagship Digital Piano</p>
                            <h1 className="font-serif text-4xl leading-tight md:text-6xl">DreamPlay One Pro</h1>
                            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/85 md:text-lg">
                                Our flagship 88-key digital piano for serious pianists. Built with graded hammer action,
                                triple-sensor precision, and the most advanced LED learning system we have ever made.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <span className="border border-white/25 bg-white/10 px-4 py-2 text-sm">Starting at $1,899</span>
                                <span className="border border-white/25 bg-white/10 px-4 py-2 text-sm">Free Shipping</span>
                                <span className="border border-white/25 bg-white/10 px-4 py-2 text-sm">No Tariff Fees</span>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Link href="/customize" className="bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200">
                                    Reserve DreamPlay One Pro
                                </Link>
                                <Link href="/how-it-works" className="border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                                    Find Your Size
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="relative min-h-[240px] overflow-hidden border border-white/15 bg-black/20">
                                <Image
                                    src="/images/pro/nightmare-black-angled.jpg"
                                    alt="DreamPlay One Pro in Nightmare Black"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="relative min-h-[240px] overflow-hidden border border-white/15 bg-black/20">
                                <Image
                                    src="/images/pro/aztec-gold-full.jpg"
                                    alt="DreamPlay One Pro in Aztec Gold"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-4 py-14 md:px-8 lg:px-12">
                    <div className="mx-auto w-full max-w-7xl">
                        <div className="mb-8">
                            <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-neutral-500">Key Features</p>
                            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Built for performance, precision, and learning</h2>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {featureList.map((feature) => (
                                <div key={feature} className="border border-neutral-200 bg-white p-4 font-sans text-sm leading-relaxed shadow-sm">
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <div className="border border-neutral-200 bg-white p-6">
                                <h3 className="font-serif text-2xl">DS5.5</h3>
                                <p className="mt-2 font-sans text-sm text-neutral-700">Octave width: 5.538 inches (140.7mm)</p>
                                <p className="mt-2 font-sans text-sm text-neutral-700">Best for hand spans 6.0 to 7.6 inches.</p>
                            </div>
                            <div className="border border-neutral-200 bg-white p-6">
                                <h3 className="font-serif text-2xl">DS6.0</h3>
                                <p className="mt-2 font-sans text-sm text-neutral-700">Octave width: 6.000 inches (152.4mm)</p>
                                <p className="mt-2 font-sans text-sm text-neutral-700">Best for hand spans 7.6 to 8.5 inches.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-neutral-900 px-4 py-14 text-white md:px-8 lg:px-12">
                    <div className="mx-auto w-full max-w-7xl">
                        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-amber-300">Pricing</p>
                        <h2 className="mt-3 font-serif text-3xl md:text-4xl">Choose keyboard-only or premium bundle</h2>

                        <div className="mt-8 grid gap-5 lg:grid-cols-2">
                            <div className="border border-white/20 bg-white/5 p-6">
                                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/70">Keyboard Only</p>
                                <h3 className="mt-3 font-serif text-2xl">DreamPlay One Pro</h3>
                                <p className="mt-4 font-sans text-4xl font-semibold">$1,899</p>
                                <p className="mt-2 font-sans text-sm text-white/80">MSRP $2,499</p>
                                <p className="mt-4 font-sans text-sm text-white/80">Payment plan: $949 now, $950 before shipping.</p>
                            </div>

                            <div className="border border-white/20 bg-white/5 p-6">
                                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/70">Premium Bundle</p>
                                <h3 className="mt-3 font-serif text-2xl">Keyboard + Stand + Triple Pedal + Bench</h3>
                                <p className="mt-4 font-sans text-4xl font-semibold">$1,999</p>
                                <p className="mt-4 font-sans text-sm text-white/80">Payment plan: $999 now, $1,000 before shipping.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-4 py-14 md:px-8 lg:px-12">
                    <div className="mx-auto w-full max-w-7xl">
                        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-neutral-500">Variants</p>
                        <h2 className="mt-3 font-serif text-3xl md:text-4xl">Shopify-ready variant matrix</h2>

                        <div className="mt-8 overflow-x-auto border border-neutral-200 bg-white">
                            <table className="min-w-[980px] w-full border-collapse font-sans text-sm">
                                <thead>
                                    <tr className="border-b border-neutral-200 bg-neutral-100 text-left">
                                        <th className="px-4 py-3">Variant</th>
                                        <th className="px-4 py-3">Size</th>
                                        <th className="px-4 py-3">Color</th>
                                        <th className="px-4 py-3">Package</th>
                                        <th className="px-4 py-3">Price</th>
                                        <th className="px-4 py-3">Compare-at</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {variants.map((variant) => (
                                        <tr key={variant.name} className="border-b border-neutral-100 align-top">
                                            <td className="px-4 py-3">{variant.name}</td>
                                            <td className="px-4 py-3">{variant.size}</td>
                                            <td className="px-4 py-3">{variant.color}</td>
                                            <td className="px-4 py-3">{variant.package}</td>
                                            <td className="px-4 py-3">{variant.price}</td>
                                            <td className="px-4 py-3">{variant.compareAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className="bg-neutral-100 px-4 py-14 md:px-8 lg:px-12">
                    <div className="mx-auto w-full max-w-7xl">
                        <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-neutral-500">Model Comparison</p>
                        <h2 className="mt-3 font-serif text-3xl md:text-4xl">DreamPlay One vs DreamPlay One Pro</h2>

                        <div className="mt-8 overflow-x-auto border border-neutral-200 bg-white">
                            <table className="min-w-[760px] w-full border-collapse font-sans text-sm">
                                <thead>
                                    <tr className="border-b border-neutral-200 bg-neutral-100 text-left">
                                        <th className="px-4 py-3">Specification</th>
                                        <th className="px-4 py-3">DreamPlay One</th>
                                        <th className="px-4 py-3">DreamPlay One Pro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonRows.map((row) => (
                                        <tr key={row.label} className="border-b border-neutral-100 align-top">
                                            <td className="px-4 py-3 font-medium text-neutral-800">{row.label}</td>
                                            <td className="px-4 py-3 text-neutral-700">{row.one}</td>
                                            <td className="px-4 py-3 text-neutral-900">{row.pro}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className="px-4 py-14 md:px-8 lg:px-12">
                    <div className="mx-auto w-full max-w-7xl grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
                        <div>
                            <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-neutral-500">Included Software</p>
                            <h2 className="mt-3 font-serif text-3xl md:text-4xl">DreamPlay Learn app included free</h2>
                            <ul className="mt-5 space-y-2 font-sans text-sm leading-relaxed text-neutral-700">
                                <li>Sheet music mode and falling notes mode</li>
                                <li>Wait-for-correct and tempo control</li>
                                <li>Section looping with real-time LED sync</li>
                                <li>Ideal for both beginners and advanced players</li>
                            </ul>
                        </div>

                        <div className="relative min-h-[260px] overflow-hidden border border-neutral-200 bg-white">
                            <Image
                                src="/images/learn/falling-notes-mode.png"
                                alt="DreamPlay Learn app with falling notes mode"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-neutral-950 px-4 py-14 text-white md:px-8 lg:px-12">
                    <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-amber-300">Ready to preorder?</p>
                            <h2 className="mt-2 font-serif text-3xl md:text-4xl">DreamPlay One Pro is now available</h2>
                            <p className="mt-3 max-w-2xl font-sans text-sm text-white/80">
                                Product type: Digital Piano. Vendor: DreamPlay Pianos. Inventory tracking is enabled and preorder sales continue when out of stock.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link href="/customize" className="bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200">
                                Start Reservation
                            </Link>
                            <Link href="/contact" className="border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
