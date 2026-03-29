"use client"

import { Check, Truck, Package, Clock, Gift } from "lucide-react"
import Image from "next/image"

export function ValueProposition() {
  const items = [
    { label: "DreamPlay Digital Piano", col: 1 },
    { label: "Premium Adjustable Stand", col: 2 },
    { label: "Cushioned Piano Bench", col: 1 },
    { label: "Sustain Pedal", col: 2 },
    { label: "Music Rest", col: 1 },
    { label: "Power Adapter", col: 2 },
  ]

  const badges = [
    { icon: Truck, label: "Discounted Shipping" },
    { icon: Package, label: "Complete Bundle" },
    { icon: Clock, label: "Est. Shipping July 2026" },
  ]

  // Each slot has a unique ID and background color matching reference
  const imageSlots = {
    // Row 1
    benchTop: { bg: "#f3f3f3", label: "Piano Bench", slot: 1 },
    keyboardTop: { bg: "#ffffff", label: "Keyboard Top View", slot: 2 },
    pianoMusicRest: { bg: "#f3f3f3", label: "Piano with Music Rest", slot: 3 },
    // Row 2
    pianoStandDark: { bg: "#ffffff", label: "Sustain Pedal", slot: 4 },
    xStand: { bg: "#f3f3f3", label: "X-Stand", slot: 5 },
    pianoAngled: { bg: "#ffffff", label: "DreamPlay Stand", slot: 6 },
  }

  return (
    <section className="relative lg:sticky top-0 z-40 min-h-screen flex flex-col lg:flex-row">
      {/* 
        PRECISE FLEX LAYOUT
        Calculated from user-provided pixel dimensions:
        Row 1 (270px height) / Total (570px) = 47.37%
        Row 2 (300px height) / Total (570px) = 52.63%
        
        Col 1 (345px) / Total (1205px) = 28.63%
        Col 2 (425px) / Total (1205px) = 35.27%
        Col 3 (435px) / Total (1205px) = 36.10%
      */}

      {/* LEFT SIDE: IMAGES (72% width on desktop) */}
      <div className="w-full lg:w-[72%] flex flex-col h-auto lg:h-screen">

        {/* MOBILE GRID (Visible < lg) */}
        <div className="grid grid-cols-2 lg:hidden w-full">
          {/* Slot 1: Bench */}
          <div className="aspect-square relative overflow-hidden flex items-center justify-center group" style={{ backgroundColor: imageSlots.benchTop.bg }}>
            <Image src="/holiday-sale/images/slot-1-bench.png" alt={imageSlots.benchTop.label} fill className="object-cover" />
          </div>
          {/* Slot 2: Keyboard */}
          <div className="aspect-square relative overflow-hidden flex items-center justify-center group" style={{ backgroundColor: imageSlots.keyboardTop.bg }}>
            <Image src="/holiday-sale/images/slot-2-piano-top.png" alt={imageSlots.keyboardTop.label} fill className="object-cover" />
          </div>
          {/* Slot 3: Rest */}
          <div className="aspect-square relative overflow-hidden flex items-center justify-center group" style={{ backgroundColor: imageSlots.pianoMusicRest.bg }}>
            <Image src="/holiday-sale/images/slot-3-piano-rest-gray-2.png" alt={imageSlots.pianoMusicRest.label} fill className="object-cover" />
          </div>
          {/* Slot 4: Pedal */}
          <div className="aspect-square relative overflow-hidden flex items-center justify-center group" style={{ backgroundColor: imageSlots.pianoStandDark.bg }}>
            <Image src="/holiday-sale/images/slot-4-pedal.jpg" alt={imageSlots.pianoStandDark.label} fill className="object-cover" />
          </div>
          {/* Slot 5: X-Stand */}
          <div className="aspect-square relative overflow-hidden flex items-center justify-center group" style={{ backgroundColor: imageSlots.xStand.bg }}>
            <Image src="/holiday-sale/images/slot-5-x-stand.png" alt={imageSlots.xStand.label} fill className="object-cover" />
          </div>
          {/* Slot 6: Stand */}
          <div className="aspect-square relative overflow-hidden flex items-center justify-center group" style={{ backgroundColor: imageSlots.pianoAngled.bg }}>
            <Image src="/holiday-sale/images/slot-6-piano-stand.png" alt={imageSlots.pianoAngled.label} fill className="object-cover" />
          </div>
        </div>

        {/* DESKTOP LAYOUT (Hidden < lg) */}
        <div className="hidden lg:flex flex-col h-full w-full">
          {/* ROW 1 (47.37% Height) */}
          <div className="flex w-full" style={{ height: "47.37%" }}>
            {/* Slot 1: Bench (345px width) */}
            <div
              className="h-full relative overflow-hidden flex items-center justify-center group"
              style={{ width: "28.63%", backgroundColor: imageSlots.benchTop.bg }}
            >
              <Image
                src="/holiday-sale/images/slot-1-bench.png"
                alt={imageSlots.benchTop.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
                Slot 1
              </div>
            </div>

            {/* Slot 2: Keyboard (425px width) */}
            <div
              className="h-full relative overflow-hidden flex items-center justify-center group"
              style={{ width: "35.27%", backgroundColor: imageSlots.keyboardTop.bg }}
            >
              <Image
                src="/holiday-sale/images/slot-2-piano-top.png"
                alt={imageSlots.keyboardTop.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
                Slot 2
              </div>
            </div>

            {/* Slot 3: Rest (435px width) */}
            <div
              className="h-full relative overflow-hidden flex items-center justify-center group"
              style={{ width: "36.10%", backgroundColor: imageSlots.pianoMusicRest.bg }}
            >
              <Image
                src="/holiday-sale/images/slot-3-piano-rest-gray-2.png"
                alt={imageSlots.pianoMusicRest.label}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
                Slot 3
              </div>
            </div>
          </div>

          {/* ROW 2 (52.63% Height) */}
          <div className="flex w-full" style={{ height: "52.63%" }}>
            {/* Slot 4: Pedal (345px width) */}
            <div
              className="h-full relative overflow-hidden flex items-center justify-center group"
              style={{ width: "28.63%", backgroundColor: imageSlots.pianoStandDark.bg }}
            >
              <Image
                src="/holiday-sale/images/slot-4-pedal.jpg"
                alt={imageSlots.pianoStandDark.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
                Slot 4
              </div>
            </div>

            {/* Slot 5: X-Stand (425px width) */}
            <div
              className="h-full relative overflow-hidden flex items-center justify-center group"
              style={{ width: "35.27%", backgroundColor: imageSlots.xStand.bg }}
            >
              <Image
                src="/holiday-sale/images/slot-5-x-stand.png"
                alt={imageSlots.xStand.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
                Slot 5
              </div>
            </div>

            {/* Slot 6: Stand (435px width) */}
            <div
              className="h-full relative overflow-hidden flex items-center justify-center group"
              style={{ width: "36.10%", backgroundColor: imageSlots.pianoAngled.bg }}
            >
              <Image
                src="/holiday-sale/images/slot-6-piano-stand.png"
                alt={imageSlots.pianoAngled.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
                Slot 6
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: TEXT (28% width on desktop) */}
      <div className="w-full lg:w-[28%] bg-black flex flex-col justify-center px-8 lg:px-10 py-10 relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-full w-fit mb-8 border border-white/10">
          <Gift className="w-3.5 h-3.5" />
          Limited Time Offer
        </div>

        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
          Complete Bundle.
          <br />
          Zero Extras to Buy.
        </h2>

        <p className="text-neutral-400 mt-6 text-sm leading-relaxed max-w-sm">
          For a limited time, every purchase includes a professional bench and stand — everything you need to start
          playing immediately.
        </p>

        <div className="grid grid-cols-1 gap-y-3 mt-8">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border border-neutral-700 flex items-center justify-center flex-shrink-0 text-white">
                <Check className="w-3 h-3" />
              </div>
              <span className="text-sm text-neutral-300">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 lg:gap-6 mt-8 pt-8 border-t border-neutral-800">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-neutral-400">
              <badge.icon className="w-4 h-4" />
              <span className="text-xs font-medium whitespace-nowrap">{badge.label}</span>
            </div>
          ))}
        </div>

        <a href="https://dreamplay-pianos.myshopify.com/products/dreamplay-piano-bundle-mlk-sale" className="mt-8 inline-flex items-center justify-center gap-2 border-2 border-solid border-white text-white px-6 lg:px-8 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors w-fit">
          Claim Your Bundle
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

    </section>
  )
}
