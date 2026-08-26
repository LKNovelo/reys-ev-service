import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import { CTABar } from "@/components/CTABlocks";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/siteConfig";

export const metadata: Metadata = pageMeta({
  title: "About Ray Novelo | Mobile Tesla Diagnostic Technician",
  description: "Meet Ray Novelo, a U.S. Marine veteran with electronics, manufacturing, aerospace, and Tesla diagnostic experience in Southern California.",
  path: "/about",
});

const timeline = [
  {
    era: "U.S. Marine Corps",
    title: "Satellite & Radar Technician",
    body: "Satellite and radar work built the habit that still guides a vehicle diagnosis: understand the system, verify the symptom, test one possibility at a time, and record the result.",
    chip: "Military Service",
    chipStyle: "bg-brand-blue-lt text-brand-blue border-brand-blue",
    filled: true,
  },
  {
    era: "Anaheim / South Korea",
    title: "Electronic Component Manufacturing",
    body: "Ray worked with electronic component manufacturers in Anaheim and traveled to South Korea for factory operations. That experience added process-control and component-manufacturing context.",
    chip: "International Manufacturing",
    chipStyle: "bg-brand-blue-lt text-brand-blue border-brand-blue",
    filled: true,
  },
  {
    era: "Aerospace",
    title: "Specialized Electrical Repair",
    body: "Ray performed specialized electrical repair for a major aerospace manufacturer, where documentation and repeatable procedures matter.",
    chip: "Aerospace Electrical Work",
    chipStyle: "bg-brand-blue-lt text-brand-blue border-brand-blue",
    filled: true,
  },
  {
    era: "November 2018",
    title: "Entered the EV Field",
    body: "A failed window regulator on Ray's own car led him to EV parts, service information, and Tesla-focused garages. He began apprenticing in Tesla repair and continued building experience with electrical systems and diagnostic software.",
    chip: "Tesla Diagnostics Since 2018",
    chipStyle: "bg-brand-green-lt text-brand-green border-brand-green",
    filled: true,
  },
  {
    era: "2023 to Today",
    title: "Ray's EV Service",
    body: "Ray launched a mobile operation that brings Tesla diagnostic equipment and commonly requested parts directly to owners across Southern California.",
    chip: "Active · Corona, CA",
    chipStyle: "bg-brand-green text-white border-brand-green",
    filled: false,
    current: true,
  },
];

const credentials = [
  {
    title: "Qualified Independent Repairer",
    desc: "Ray's EV Service has licensed access to Tesla Toolbox 3 and Service Mode Plus for available alerts, live data, and guided diagnostic routines.",
    tag: "Tesla Diagnostic Access",
    style: "border-brand-green bg-brand-green-lt",
    tagStyle: "bg-brand-green text-white",
  },
  {
    title: "Aerospace Electrical Experience",
    desc: "Specialized electrical repair for a major aerospace manufacturer strengthened Ray's focus on documentation and repeatable procedures.",
    tag: "Electrical Background",
    style: "border-brand-blue",
    tagStyle: "bg-brand-blue-lt text-brand-blue",
  },
  {
    title: "Remote Diagnostics Capability",
    desc: "Owner-authorized Tesla access can support alert review, initial scope, and parts planning before an on-site visit. Ray never needs the owner's Tesla password.",
    tag: "Pre-Visit Review",
    style: "border-brand-border",
    tagStyle: "bg-brand-blue-lt text-brand-blue",
  },
  {
    title: "EPA Section 609 Certified",
    desc: "Ray holds the technician certification required for paid motor-vehicle air-conditioning refrigerant service and uses compliant equipment.",
    tag: "Certified HVAC Service",
    style: "border-brand-border",
    tagStyle: "bg-brand-green-lt text-brand-green",
  },
  {
    title: "Written Diagnostic Findings",
    desc: "Diagnostic appointments include written findings and next steps. Repair documentation identifies the work performed and parts used.",
    tag: "Clear Documentation",
    style: "border-brand-border",
    tagStyle: "bg-brand-green-lt text-brand-green",
  },
  {
    title: "Warranty-Aware Recommendations",
    desc: "When a possible defect may fall within Tesla's warranty, Ray recommends checking coverage before paying for independent repair. Tesla decides warranty claims.",
    tag: "Check Coverage First",
    style: "border-brand-border",
    tagStyle: "bg-amber-50 text-amber-800",
  },
];

const principles = [
  { n: "1", title: "Diagnose Before Recommending Parts", body: "The complaint and available alerts guide the first tests. A scan is useful, but it is one part of diagnosis, not a substitute for inspection and measurement." },
  { n: "2", title: "Confirm Scope and Price First", body: "The appointment price and travel fee are confirmed before dispatch. Parts and additional labor are quoted before authorization." },
  { n: "3", title: "Check Tesla Warranty Coverage", body: "If a possible defect appears to fall within the vehicle's warranty period, Ray recommends that the owner check with Tesla before paying for independent repair." },
  { n: "4", title: "Document the Visit", body: "Diagnostic appointments include written findings. Repair documentation describes the work performed and parts used." },
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
            <span className="section-label">The Person Who Answers the Phone</span>
            <h1 className="font-display font-semibold text-brand-dark text-3xl sm:text-4xl tracking-wide mb-5">
              A Career Spent Tracing Electrical Faults
            </h1>
            <p className="font-body text-brand-muted text-base leading-relaxed max-w-xl mb-4">
              Ray Novelo learned electrical troubleshooting in the U.S. Marine Corps as a satellite and radar
              technician. He later worked in electronic component manufacturing, including factory operations
              in South Korea, and performed specialized electrical repair for a major aerospace manufacturer.
              He began working around Tesla repair in 2018 and launched Ray&apos;s EV Service in 2023.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <section className="py-16 px-5 bg-white border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Background</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-12">
              Ray&apos;s Background
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
              { v: "Tesla S/3/X/Y", l: "Tesla-focused service" },
              { v: "Southern California", l: "Based in Corona" },
              { v: "Same-Day", l: "Low-voltage battery service may be available" },
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
              What&apos;s Behind the Diagnosis
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
              <span className="section-label">How Ray Works</span>
              <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-5">
                A Clear Process for Every Appointment
              </h2>
              <p className="font-body text-brand-muted text-base leading-relaxed mb-4">
                Ray starts with the complaint, available alerts, and the tests that fit the vehicle.
                The goal is to identify the next sound step before recommending parts.
              </p>
              <p className="font-body text-brand-muted text-base leading-relaxed mb-4">
                The person answering the questions is the person evaluating the car. Scope, price,
                and travel fees are confirmed before work begins.
              </p>
              <p className="font-body text-brand-muted text-base leading-relaxed">
                When a procedure requires a lift, controlled environment, or different equipment,
                Ray recommends the appropriate facility instead of forcing a mobile repair.
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
              <span className="section-label">Veteran-Owned Business</span>
              <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-4">
                What Military Service Taught Ray About Electrical Work
              </h2>
              <p className="font-body text-brand-muted text-base leading-relaxed mb-3 max-w-2xl">
                Marine Corps satellite and radar work taught Ray to troubleshoot systematically under pressure,
                document the evidence, and take responsibility for the result. Those habits still shape every vehicle diagnosis.
              </p>
              <p className="font-body text-brand-muted text-base leading-relaxed max-w-2xl">
                Customers receive direct communication, a confirmed scope, and written findings for diagnostic work.
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
