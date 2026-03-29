import { ArrowRight } from "lucide-react"

export function FlashSale() {
  return (
    <section className="sticky top-0 z-30 relative overflow-hidden bg-neutral-950 text-white py-20 md:py-24 min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/60" />
      </div>

      <div className="relative z-10 text-center space-y-8 px-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-cyan-400">Exclusive Offer Ends Soon</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">January Flash Sale</h2>
          <p className="text-white text-sm md:text-base max-w-md mx-auto mt-3">
            Your dream piano setup at an unbeatable price.
            <br />
            Don't miss out.
          </p>
        </div>

        <div className="flex items-baseline justify-center gap-4">
          <span className="text-6xl md:text-7xl font-bold tracking-tight text-white">$1,099</span>
        </div>

        <p className="text-sm text-white font-medium tracking-widest uppercase">Complete Premium Bundle</p>

        <button className="mt-2 inline-flex items-center gap-2.5 px-10 py-4 border-2 border-solid border-white rounded-full text-white font-semibold text-lg hover:bg-white hover:text-neutral-950 transition-all duration-300 hover:scale-105">
          Claim Your Bundle Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}
