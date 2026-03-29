import Image from "next/image"

export function BundleShowcase() {
  return (
    <section className="sticky top-0 z-50 bg-black text-white min-h-[70vh]">
      <div className="relative w-full h-full min-h-[70vh]">
        <Image
          src="/images/accessories/piano-bench-bundle.png"
          alt="DreamPlay Piano and Bench Bundle"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={100}
          priority
        />
      </div>
    </section>
  )
}
