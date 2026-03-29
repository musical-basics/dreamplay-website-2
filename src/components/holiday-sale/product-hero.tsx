import Image from "next/image"

export function ProductHero() {
  return (
    <section className="relative h-[600px] bg-neutral-100">
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src="/images/keyboards/piano-front-2.jpg"
          alt="DreamPlay Digital Piano with bench"
          fill
          className="object-cover object-[center_40%]"
          priority
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute left-6 md:left-12 lg:left-16 top-[calc(50%+50px)] -translate-y-1/2 max-w-md lg:max-w-lg">
          <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold leading-tight">For a limited time,</p>
          <p className="text-white/80 text-sm md:text-base lg:text-lg italic leading-relaxed mt-1">
            every purchase includes a professional bench and stand—
          </p>
          <p className="text-white text-xl md:text-2xl lg:text-3xl font-bold mt-2 leading-tight">
            Everything you need to start playing immediately.
          </p>

          <div className="mt-6 md:mt-8 space-y-1">
            <p className="text-white/60 text-xs md:text-sm">*Discounted Shipping</p>
            <p className="text-white/60 text-xs md:text-sm">Complete Bundle</p>
            <p className="text-white/60 text-xs md:text-sm">Est. Shipping July 2026</p>
          </div>

          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20">
            <p className="text-white text-2xl md:text-3xl font-bold tracking-tight">DreamPlay One</p>
            <a href="https://dreamplay-pianos.myshopify.com/products/dreamplay-piano-bundle-mlk-sale" className="mt-4 px-6 py-2.5 border-2 border-solid border-white text-white text-sm font-medium rounded-full hover:bg-white hover:text-black transition-colors inline-block">
              PRE-ORDER NOW
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
