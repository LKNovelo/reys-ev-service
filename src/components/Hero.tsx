import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#1A5C00] px-5 py-14 sm:py-20 text-center">
      <p className="inline-block bg-[#2B5FA6]/40 text-[#a8c4e8] text-[10px] font-semibold tracking-[1.4px] uppercase px-4 py-1.5 rounded-full mb-5">
        Veteran-Owned &middot; Tesla Certified &middot; Southern California
      </p>

      <h1 className="text-white font-extrabold leading-[1.12] tracking-tight mb-4"
          style={{ fontSize: "clamp(30px, 6vw, 52px)" }}>
        Your Tesla. Fixed<br />
        <em className="not-italic text-[#F5A623]">Where You Are.</em>
      </h1>

      <p className="text-white/78 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-8">
        Mobile EV diagnostics and repair from LA to San Diego. No tow truck.
        No dealership waitlist. Rey comes to you.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <a
          href="tel:+19516226222"
          className="bg-[#F5A623] text-[#1A1A1A] font-bold text-sm sm:text-base px-6 py-3.5 rounded-lg hover:bg-[#e09b1f] transition-colors"
        >
          Call (951) 622-6222
        </a>
        <Link
          href="/services"
          className="text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg border-2 border-white/30 hover:border-white/60 transition-colors"
        >
          See Services &amp; Pricing
        </Link>
      </div>

      {/* Hours micro-copy */}
      <p className="text-white/45 text-xs mt-6 tracking-wide">
        Mon–Fri 7am–6pm &nbsp;&middot;&nbsp; Sat–Sun by appointment
      </p>
    </section>
  );
}
