import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Ray's EV Service",
  description: "Book a mobile Tesla diagnostic or repair. Call, text, or email Ray directly. Serving Corona, OC, LA, and San Diego.",
};

const faq = [
  { q: "Do I need to tow my car to you?", a: "No — Ray comes to you. Home, office, or roadside. If the car can't be driven, describe the situation and we'll confirm the right approach. For completely dead cars, call directly rather than waiting on a form." },
  { q: "What if you can't fix it on-site?", a: "You'll get a written diagnostic report regardless. If the repair needs parts not on the van, Ray will quote the return visit. No charge for a second dispatch if the scope was confirmed in advance." },
  { q: "Will this void my Tesla warranty?", a: "No. Federal law (Magnuson-Moss) protects your right to use third-party service. Ray documents everything so you're covered if a warranty claim comes up later." },
  { q: "How do I pay?", a: "Card, cash, or Venmo — all accepted on-site. Diagnostic fee is due at time of service. Repair labor and parts quoted before any work begins." },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <div className="bg-brand-green-dk px-5 py-14">
          <div className="max-w-4xl mx-auto">
            <span className="section-label text-white/40">Get in touch</span>
            <h1 className="font-display font-semibold text-white text-4xl sm:text-5xl tracking-wide mb-4">
              Book a visit, ask a question,<br className="hidden sm:block" /> or send your fault codes
            </h1>
            <p className="font-body text-white/65 text-lg leading-relaxed max-w-xl mb-6">
              Ray answers directly — no call center, no service writer. If he&apos;s on a job he&apos;ll call back within the hour.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a href="tel:+19516226222" className="font-body font-semibold text-brand-amber text-base hover:underline">
                (951) 622-6222 — call or text
              </a>
              <span className="text-white/30">·</span>
              <a href="mailto:RaysEVService@gmail.com" className="font-body font-semibold text-white/70 text-base hover:text-white transition-colors">
                RaysEVService@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-0 border-b border-brand-border">

          {/* Form */}
          <div className="px-5 py-12 lg:px-10 lg:border-r lg:border-brand-border">
            <span className="section-label">Request form</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-2">
              Tell us about your Tesla
            </h2>
            <p className="font-body text-brand-muted text-sm mb-8 max-w-lg leading-relaxed">
              Fill this out and Ray will follow up to confirm availability and scope.
              Not sure what&apos;s wrong? Describe it in plain language — that&apos;s fine.
            </p>

            <ContactForm />
          </div>

          {/* Info sidebar */}
          <div className="px-5 py-10 lg:px-7 flex flex-col gap-6 bg-brand-surface">

            {/* Direct contact */}
            <div className="bg-white rounded-card border border-brand-border p-5">
              <h3 className="font-display font-semibold text-brand-dark text-lg tracking-wide mb-4">Reach Ray directly</h3>
              {[
                { label: "Call or text", value: "(951) 622-6222", sub: "Ray answers — not a call center", href: "tel:+19516226222", bg: "bg-brand-green-lt" },
                { label: "Email", value: "RaysEVService@gmail.com", sub: "Good for non-urgent questions", href: "mailto:RaysEVService@gmail.com", bg: "bg-brand-blue-lt" },
                { label: "Text fault codes", value: "(951) 622-6222", sub: "We'll pre-screen before dispatch", href: "tel:+19516226222", bg: "bg-amber-50" },
              ].map(({ label, value, sub, href, bg }) => (
                <a key={label} href={href} className={`flex items-center gap-3 py-3 border-b border-brand-border last:border-0 hover:opacity-80 transition-opacity`}>
                  <div className={`w-9 h-9 rounded-lg ${bg} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-brand-muted">{label}</p>
                    <p className="font-body font-semibold text-brand-dark text-sm">{value}</p>
                    <p className="font-body text-xs text-brand-muted">{sub}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Response time */}
            <div className="bg-brand-green-lt border border-brand-green border-opacity-40 rounded-card p-4">
              <h3 className="font-display font-semibold text-brand-green text-base tracking-wide mb-2">Response time</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#1a3a0a" }}>
                Ray responds within 1–2 hours on weekdays, same day on weekends. For roadside situations, call directly — don&apos;t wait on a form.
              </p>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-card border border-brand-border p-5">
              <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide mb-3">Availability</h3>
              {[
                { day: "Mon – Fri", time: "7:00 AM – 6:00 PM" },
                { day: "Saturday", time: "By appointment" },
                { day: "Sunday",   time: "By appointment" },
              ].map(({ day, time }) => (
                <div key={day} className="flex justify-between py-2 border-b border-brand-border last:border-0 text-sm">
                  <span className="font-body text-brand-muted">{day}</span>
                  <span className="font-body font-semibold text-brand-dark">{time}</span>
                </div>
              ))}
              <p className="font-body text-xs text-brand-muted mt-3 leading-relaxed">
                Hours are a guide — Ray takes calls outside these windows for urgent situations.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="py-14 px-5 bg-brand-surface">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mb-6">Common questions before booking</h2>
            <div className="border border-brand-border rounded-card overflow-hidden">
              {faq.map(({ q, a }, i) => (
                <div key={q} className={`bg-white p-5 ${i < faq.length - 1 ? "border-b border-brand-border" : ""}`}>
                  <p className="font-body font-semibold text-brand-dark text-sm mb-2">{q}</p>
                  <p className="font-body text-brand-muted text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
