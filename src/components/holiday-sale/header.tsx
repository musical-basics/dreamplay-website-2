import Link from "next/link"

export function Header() {
  return (
    <header className="bg-[#111] text-white">
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
          <span className="font-medium tracking-tight">DreamPlay</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <button className="text-white bg-sky-500 px-4 py-1 rounded-full text-xs font-medium">Start</button>
          <span>Measure</span>
          <span>Size</span>
          <span>Color</span>
          <span>Reserve</span>
        </div>

        <div className="text-sm text-white/70">
          <a href="/about-us/ds-standard" target="_blank" className="text-sky-400 hover:text-sky-300 transition-colors underline decoration-sky-400/30">DS6.0</a>
          <span className="mx-2 text-white/30">·</span>
          <span>White</span>
        </div>
      </div>
    </header>
  )
}
