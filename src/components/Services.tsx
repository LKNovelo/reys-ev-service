import Link from "next/link";

const services = [
  {
    title:     "Remote Diagnostic",
    price:     "$100",
    priceSub:  "flat",
    desc:      "Rey reviews your Tesla's error codes and drive data remotely. You get a clear diagnosis and repair plan — no appointment needed.",
    detail:    "Best for: warning lights, range drop, post-accident check",
    featured:  false,
    tag:       null,
  },
  {
    title:     "Mobile Diagnostic",
    price:     "$299",
    priceSub:  "credited to repair",
    desc:      "Full on-site diagnostic with Tesla Toolbox 3. Rey drives to you with everything he needs. If you approve the repair, $299 applies to your invoice.",
    detail:    "Covers: Corona, Riverside, OC, LA, Long Beach, Temecula",
    featured:  true,
    tag:       "Most Popular",
  },
  {
    title:     "Shop Visit",
    price:     "$199",
    priceSub:  "diagnostic fee",
    desc:      "Bring your Tesla to the Corona shop for a thorough bench diagnostic. Best for complex electrical faults that need more time.",
    detail:    "Corona, CA · By appointment · Mon–Fri 7am–6pm",
    featured:  false,
    tag:       null,
  },
];

export default function Services() {
  return (
    <section className="px-5 py-14 max-w-6xl mx-auto">
      <p className="text-[#2B5FA6] text-[10px] font-bold tracking-[1.8px] uppercase mb-1.5">
        Pricing
      </p>
      <h2 className="font-extrabold tracking-tight mb-8"
          style={{ fontSize: "clamp(20px, 3.5vw, 28px)" }}>
        Pick the service<br className="sm:hidden" /> that fits your situation
      </h2>

      <div className="grid sm:grid-cols-3 gap-4">
        {services.map((s) => (
          <div
            key={s.title}
            className={`rounded-card border p-6 flex flex-col ${
              s.featured
                ? "border-[#1A5C00] bg-[#F2F8EE]"
                : "border-[#E0E0E0] bg-white"
            }`}
          >
            {s.tag && (
              <span className="self-start bg-[#1A5C00] text-white text-[9px] font-bold tracking-[0.7px] uppercase px-3 py-1 rounded-pill mb-3">
                {s.tag}
              </span>
            )}

            <h3 className="font-bold text-[15px] mb-2">{s.title}</h3>

            <p className="text-[#1A5C00] font-extrabold mb-1.5 leading-none"
               style={{ fontSize: "26px" }}>
              {s.price}
              <span className="text-sm font-normal text-[#6B6B6B] ml-1">
                {s.priceSub}
              </span>
            </p>

            <p className="text-[13px] text-[#555] leading-snug mb-4 flex-1">
              {s.desc}
            </p>

            <p className="text-[11px] text-[#1A5C00] font-semibold">{s.detail}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-[#6B6B6B] mt-5">
        Questions about which option is right for you?{" "}
        <Link href="/contact" className="text-[#2B5FA6] font-semibold underline-offset-2 hover:underline">
          Send Rey a message →
        </Link>
      </p>
    </section>
  );
}
