import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import { CTABar } from "@/components/CTABlocks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ray — Ray's EV Service",
  description: "Ray Novelo — U.S. Marine veteran, Aerospace-trained electrical specialist, Tesla Toolbox 3 certified. Mobile EV repair based in Corona, CA.",
};

const timeline = [
  {
    era: "U.S. Marine Corps",
    title: "Satellite & radar technician",
    body: "Ray's foundational electrical and circuits education came from the Marines — working on satellite and radar systems where precision isn't optional. The diagnostic discipline and systematic approach to fault-finding that defines how he works on every Tesla started here.",
    chip: "Military service",
    chipStyle: "bg-brand-blue-lt text-brand-blue border-brand-blue",
    filled: true,
  },
  {
    era: "Anaheim / South Korea",
    title: "Electronic component manufacturing",
    body: "After the Marines, Ray worked with electronic component manufacturers in Anaheim, including travel to South Korea to manage factory operations. High-volume, precision electronics — reinforcing the standard that mistakes at scale have consequences.",
    chip: "International manufacturing",
    chipStyle: "bg-brand-blue-lt text-brand-blue border-brand-blue",
    filled: true,
  },
  {
    era: "Aerospace",
    title: "Specialized repairs & diagnostics training",
    body: "Aerospace training in specialized electrical repairs and diagnostics — applied to some of the most safety-critical systems in existence. High-voltage architecture, complex fault trees, documentation discipline. The same toolkit that makes Tesla diagnostics tractable.",
    chip: "Aerospace electrical",
    chipStyle: "bg-brand-blue-lt text-brand-blue border-brand-blue",
    filled: true,
  },
  {
    era: "November 2018",
    title: "Entered the EV world",
    body: "It started with a broken window regulator on Ray's own car. The search for parts pulled him into the EV repair ecosystem — and what he found was a gap. Shops with deep Tesla expertise were rare. The diagnostic tools existed. The trained hands didn't. He began apprenticing at garages specializing in Tesla repair and never looked back.",
    chip: "Tesla Toolbox 3 certified",
    chipStyle: "bg-brand-green-lt text-brand-green border-brand-green",
    filled: true,
  },
  {
    era: "2023 — today",
    title: "Ray's EV Service — mobile, LA to San Diego",
    body: "Launched his own mobile operation: fully equipped van, parts in stock, Tesla Toolbox 3 on board. The goal was simple — bring factory-level diagnostics directly to the owner without making them tow the car or wait weeks for a service center appointment.",
    chip: "Active · Corona, CA",
    chipStyle: "bg-brand-green text-white border-brand-green",
    filled: false,
    current: true,
  },
];

const credentials = [
  {
    title: "Tesla Toolbox 3 certified",
    desc: "The same factory diagnostic software Tesla service centers use. Reads all proprietary fault codes, battery cell data, and system logs that generic OBD scanners can't touch.",
    tag: "Factory-level access",
    style: "border-brand-green bg-brand-green-lt",
    tagStyle: "bg-brand-green text-white",
  },
  {
    title: "Aerospace-trained electrical specialist",
    desc: "Advanced training in safety-critical high-voltage systems — the same discipline applied to aerospace electrical architecture, now applied to Tesla's battery and drive systems.",
    tag: "HV systems expertise",
    style: "border-brand-blue",
    tagStyle: "bg-brand-blue-lt text-brand-blue",
  },
  {
    title: "Remote diagnostics capability",
    desc: "Can review Tesla fault codes and API data before rolling the van — confirming job scope and parts needed in advance. No wasted dispatch, no surprise costs on arrival.",
    tag: "Pre-dispatch screening",
    style: "border-brand-border",
    tagStyle: "bg-brand-blue-lt text-brand-blue",
  },
  {
    title: "Fully equipped mobile unit",
    desc: "Common Tesla parts carried in-van: 12V batteries, charge port hardware, fuses, connectors. Most straightforward repairs completed same visit.",
    tag: "Parts on-hand",
    style: "border-brand-border",
    tagStyle: "bg-brand-green-lt text-brand-green",
  },
  {
    title: "Written reports for every job",
    desc: "Every diagnostic produces a written findings document — fault codes, battery health data, and repair recommendations. Useful for warranty claims, resale, or a second opinion.",
    tag: "Full documentation",
    style: "border-brand-border",
    tagStyle: "bg-brand-green-lt text-brand-green",
  },
  {
    title: "Magnuson-Moss warranty safe",
    desc: "Third-party service does not void your Tesla warranty under federal law. Ray documents all work thoroughly so you're protected if a warranty claim arises afterward.",
    tag: "Warranty-safe repairs",
    style: "border-brand-border",
    tagStyle: "bg-amber-50 text-amber-800",
  },
];

const principles = [
  { n: "1", title: "Diagnose before you recommend", body: "No repair gets recommended without a Toolbox 3 scan first. Guessing costs the customer money and wastes a dispatch." },
  { n: "2", title: "Transparent scope before work begins", body: "Parts cost quoted before ordering. Labor explained before starting. No surprises on the invoice." },
  { n: "3", title: "Warranty first — always", body: "If your car is under Tesla's bumper-to-bumper or HV battery warranty, Ray will tell you to use it. He only steps in when it doesn't cover the issue." },
  { n: "4", title: "You get a written report regardless", body: "Whether we fix it or not, you leave with documented findings. Useful for resale, insurance, or a second opinion." },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <div className="grid md:grid-cols-[300px_1fr] border-b border-brand-border min-h-[360px]">
          {/* Photo col */}
          <div className="bg-brand-surface border-r border-brand-border flex flex-col items-center justify-end p-8 gap-3 relative">
            <div className="absolute top-5 left-5">
              <span className="font-body text-xs font-semibold bg-brand-blue-lt text-brand-blue border border-brand-blue border-opacity-40 px-3 py-1.5 rounded-full">
                U.S. Marine Veteran
              </span>
            </div>
            <div className="w-32 h-32 rounded-full bg-brand-green-lt border-2 border-brand-green flex items-center justify-center font-display font-semibold text-brand-green text-4xl">
              RN
            </div>
            <div className="text-center">
              <p className="font-display font-semibold text-brand-dark text-xl tracking-wide">Ray Novelo</p>
              <p className="font-body text-brand-muted text-sm">Owner, Ray&apos;s EV Service</p>
            </div>
          </div>

          {/* Copy col */}
          <div className="px-8 py-14 md:px-14 flex flex-col justify-center">
            <span className="section-label">The person behind the van</span>
            <h1 className="font-display font-semibold text-brand-dark text-3xl sm:text-4xl tracking-wide mb-5">
              From Marine Corps electrical systems<br className="hidden lg:block" /> to Tesla diagnostics
            </h1>
            <p className="font-body text-brand-muted text-base leading-relaxed max-w-xl mb-4">
              Ray Novelo spent years working on some of the most demanding electrical systems in existence —
              first in the U.S. Marine Corps, then in aerospace manufacturing, then through Aerospace&apos;s
              specialized electrical training. When he fixed a broken window regulator on his own car and
              found himself pulled into the EV world, it wasn&apos;t a career change. It was a familiar set of
              problems in a new vehicle.
            </p>
            <blockquote className="border-l-2 border-brand-green pl-4 my-2">
              <p className="font-body text-brand-dark italic text-base leading-relaxed">
                &ldquo;I didn&apos;t retrain for EVs. I just applied what I already knew to a vehicle that finally
                made electrical work interesting again.&rdquo;
              </p>
              <cite className="font-body text-brand-muted text-xs not-italic block mt-2">— Ray Novelo</cite>
            </blockquote>
          </div>
        </div>

        {/* Timeline */}
        <section className="py-16 px-5 bg-white border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Background</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-12">
              How Ray got here
            </h2>
            <div className="relative pl-12">
              <div className="absolute left-[14px] top-2 bottom-2 w-px bg-brand-border" />
              <div className="flex flex-col gap-10">
                {timeline.map(({ era, title, body, chip, chipStyle, current }) => (
                  <div key={era} className="relative">
                    <div className={`absolute -left-[41px] top-1 w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                      current
                        ? "bg-brand-green border-brand-green"
                        : "bg-white border-brand-green"
                    }`}>
                      {current
                        ? <span className="w-2 h-2 rounded-full bg-white" />
                        : <span className="w-2 h-2 rounded-full bg-brand-green" />
                      }
                    </div>
                    <span className="font-body text-xs font-semibold text-brand-green block mb-1">{era}</span>
                    <h3 className="font-display font-semibold text-brand-dark text-xl tracking-wide mb-2">{title}</h3>
                    <p className="font-body text-brand-muted text-sm leading-relaxed mb-3 max-w-2xl">{body}</p>
                    <span className={`font-body text-xs font-semibold px-3 py-1 rounded-full border inline-block ${chipStyle}`}>
                      {chip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <div className="bg-brand-green-dk">
          <div className="max-w-6xl mx-auto grid grid-cols-3">
            {[
              { v: "Tesla S/3/X/Y", l: "Strictly Tesla — no hybrids" },
              { v: "LA → San Diego", l: "Full corridor, based in Corona" },
              { v: "Same-day", l: "Dispatch in primary zone" },
            ].map(({ v, l }, i) => (
              <div key={v} className={`px-8 py-6 text-center ${i < 2 ? "border-r border-white/20" : ""}`}>
                <span className="font-display font-semibold text-white text-xl block">{v}</span>
                <span className="font-body text-white/55 text-xs mt-1 block">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials */}
        <section className="py-16 px-5 bg-brand-surface border-b border-brand-border">
          <div className="max-w-5xl mx-auto">
            <span className="section-label">Credentials</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-10">
              What&apos;s behind the diagnosis
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {credentials.map(({ title, desc, tag, style, tagStyle }) => (
                <div key={title} className={`bg-white rounded-card border p-5 ${style}`}>
                  <h3 className="font-display font-semibold text-brand-dark text-lg tracking-wide mb-2">{title}</h3>
                  <p className="font-body text-brand-muted text-sm leading-relaxed mb-3">{desc}</p>
                  <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full inline-block ${tagStyle}`}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 px-5 bg-white border-b border-brand-border">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1fr] gap-12 items-start">
            <div>
              <span className="section-label">How Ray works</span>
              <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-5">
                A few things that don&apos;t change job to job
              </h2>
              <p className="font-body text-brand-muted text-base leading-relaxed mb-4">
                Diagnose correctly the first time. Tell the owner exactly what you found.
                Don&apos;t fix what isn&apos;t broken. Charge a fair price for the work.
              </p>
              <p className="font-body text-brand-muted text-base leading-relaxed mb-4">
                Ray turned down the dealership service model on purpose. No upsell quotas.
                No service writer between the technician and the customer. When you call,
                you&apos;re talking to the person who will actually open the hood.
              </p>
              <p className="font-body text-brand-muted text-base leading-relaxed">
                Strictly Tesla, strictly EV — because specialization means every tool, every part,
                and every hour of diagnostic experience is focused on one platform. That focus shows in the diagnosis.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {principles.map(({ n, title, body }) => (
                <div key={n} className="bg-brand-surface border border-brand-border rounded-card p-4">
                  <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide mb-2 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-green-lt text-brand-green font-body text-xs font-semibold flex items-center justify-center shrink-0">
                      {n}
                    </span>
                    {title}
                  </h3>
                  <p className="font-body text-brand-muted text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Veteran section */}
        <section className="py-16 px-5 bg-brand-surface border-b border-brand-border">
          <div className="max-w-4xl mx-auto flex gap-8 items-start">
            <div className="w-20 h-20 rounded-full bg-brand-blue-lt border-2 border-brand-blue flex items-center justify-center shrink-0">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M18 4L4 10v10c0 8 5.5 14.5 14 17 8.5-2.5 14-9 14-17V10L18 4Z" stroke="#2B5FA6" strokeWidth="1.5"/>
                <path d="M12 18l4 4 8-8" stroke="#2B5FA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <span className="section-label">Veteran-owned business</span>
              <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-4">
                What military service taught Ray about doing this work right
              </h2>
              <p className="font-body text-brand-muted text-base leading-relaxed mb-3 max-w-2xl">
                The Marine Corps doesn&apos;t train you to guess. It trains you to work systematically under pressure,
                document what you find, and take responsibility for the outcome. That carries directly into how Ray
                runs every diagnostic — even when the fault is intermittent, even when the fix isn&apos;t obvious.
              </p>
              <p className="font-body text-brand-muted text-base leading-relaxed max-w-2xl">
                Veteran-owned isn&apos;t a marketing badge here. It&apos;s shorthand for a specific set of values:
                show up when you say you will, do the job right, don&apos;t overcharge, and stand behind your work.
                That&apos;s the whole business model.
              </p>
            </div>
          </div>
        </section>

        <CTABar />
      </main>
      <Footer />
    </>
  );
}
