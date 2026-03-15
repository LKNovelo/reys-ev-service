import Link from "next/link";

const zones = [
  {
    dot:   "bg-[#1A5C00]",
    title: "Primary Zone — No Travel Fee",
    desc:  "Corona, Riverside, Anaheim, Santa Ana, OC along the 91",
  },
  {
    dot:   "bg-[#2B5FA6]",
    title: "Secondary Zone — Small Travel Fee",
    desc:  "Temecula, Murrieta, LA, Long Beach",
  },
  {
    dot:   "bg-[#aaa]",
    title: "San Diego — Call First",
    desc:  "Call (951) 622-6222 to confirm availability before booking",
  },
];

export default function Coverage() {
  return (
    <section className="bg-[#F7F7F5] px-5 py-12">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#2B5FA6] text-[10px] font-bold tracking-[1.8px] uppercase mb-1.5">
          Coverage
        </p>
        <h2 className="font-extrabold tracking-tight mb-1"
            style={{ fontSize: "clamp(18px, 3vw, 24px)" }}>
          Where Rey drives
        </h2>
        <p className="text-sm text-[#6B6B6B] mb-5">
          Home base: Corona, CA — anchored on the 91 corridor.
        </p>

        <div className="grid gap-3">
          {zones.map(({ dot, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3 bg-white rounded-[10px] border border-[#E8E8E8] px-4 py-3.5"
            >
              <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${dot}`} />
              <div>
                <p className="text-sm font-bold mb-0.5">{title}</p>
                <p className="text-xs text-[#666]">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/coverage"
          className="inline-block mt-5 text-[#2B5FA6] text-sm font-semibold hover:underline underline-offset-2"
        >
          View interactive coverage map →
        </Link>
      </div>
    </section>
  );
}
