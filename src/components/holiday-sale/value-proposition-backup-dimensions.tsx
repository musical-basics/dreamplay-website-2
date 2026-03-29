"use client"

import { Check, Truck, Package, Clock, Gift } from "lucide-react"

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
    { icon: Truck, label: "Free Shipping" },
    { icon: Package, label: "Complete Bundle" },
    { icon: Clock, label: "Ships in 2-3 Days" },
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
    <section className="sticky top-0 z-40 min-h-screen flex">
      {/* 
        PRECISE FLEX LAYOUT
        Calculated from image native dimensions to ensure 1:1 aspect ratio match.
        Row 1 AR Sum: 5.168 -> 45.71% Height of Image Area
        Row 2 AR Sum: 4.353 -> 54.29% Height of Image Area
      */}

      {/* LEFT SIDE: IMAGES (72% width approx to match reference balance) */}
      <div className="w-[72%] flex flex-col h-screen">

        {/* ROW 1 (45.71% Height) */}
        <div className="flex w-full" style={{ height: "45.71%" }}>
          {/* Slot 1: Bench (AR 1.318 -> 25.5%) */}
          <div
            className="h-full relative overflow-hidden flex items-center justify-center"
            style={{ width: "25.5%", backgroundColor: imageSlots.benchTop.bg }}
          >
            <img
              src="/holiday-sale/images/slot-1-bench.png"
              alt={imageSlots.benchTop.label}
              className="w-full h-full object-cover"
            />
            <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
              Slot 1
            </div>
          </div>

          {/* Slot 2: Keyboard (AR 1.832 -> 35.4%) */}
          <div
            className="h-full relative overflow-hidden flex items-center justify-center"
            style={{ width: "35.4%", backgroundColor: imageSlots.keyboardTop.bg }}
          >
            <img
              src="/holiday-sale/images/slot-2-piano-top.png"
              alt={imageSlots.keyboardTop.label}
              className="w-full h-full object-cover"
            />
            <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
              Slot 2
            </div>
          </div>

          {/* Slot 3: Rest (AR 2.018 -> 39.1%) */}
          <div
            className="h-full relative overflow-hidden flex items-center justify-center"
            style={{ width: "39.1%", backgroundColor: imageSlots.pianoMusicRest.bg }}
          >
            <img
              src="/holiday-sale/images/slot-3-piano-rest.png"
              alt={imageSlots.pianoMusicRest.label}
              className="w-full h-full object-cover"
            />
            <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
              Slot 3
            </div>
          </div>
        </div>

        {/* ROW 2 (54.29% Height) */}
        <div className="flex w-full" style={{ height: "54.29%" }}>
          {/* Slot 4: Pedal (AR 1.513 -> 34.7%) */}
          <div
            className="h-full relative overflow-hidden flex items-center justify-center"
            style={{ width: "34.7%", backgroundColor: imageSlots.pianoStandDark.bg }}
          >
            <img
              src="/holiday-sale/images/slot-4-pedal.jpg"
              alt={imageSlots.pianoStandDark.label}
              className="w-full h-full object-cover"
            />
            <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
              Slot 4
            </div>
          </div>

          {/* Slot 5: X-Stand (AR 1.291 -> 29.7%) */}
          <div
            className="h-full relative overflow-hidden flex items-center justify-center"
            style={{ width: "29.7%", backgroundColor: imageSlots.xStand.bg }}
          >
            <img
              src="/holiday-sale/images/slot-5-x-stand.png"
              alt={imageSlots.xStand.label}
              className="w-full h-full object-cover"
            />
            <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
              Slot 5
            </div>
          </div>

          {/* Slot 6: Stand (AR 1.548 -> 35.6%) */}
          <div
            className="h-full relative overflow-hidden flex items-center justify-center"
            style={{ width: "35.6%", backgroundColor: imageSlots.pianoAngled.bg }}
          >
            <img
              src="/holiday-sale/images/slot-6-piano-stand.png"
              alt={imageSlots.pianoAngled.label}
              className="w-full h-full object-cover"
            />
            <div className="hidden absolute inset-0 flex items-center justify-center text-neutral-400 text-xs font-medium">
              Slot 6
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE: TEXT (28% width) */}
      {/* 
        Note: The container for text needs to handle overflow gracefully or resize if screen is too small.
        In reference, text block seems to have fixed readable width. We use % here to fill remaining space.
      */}
      <div className="w-[28%] bg-black flex flex-col justify-center px-8 lg:px-10 py-10 relative z-10">
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

        <button className="mt-8 inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 lg:px-8 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors w-fit">
          Claim Your Bundle
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

    </section>
  )
}
