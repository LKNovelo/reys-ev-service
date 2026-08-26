import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/siteConfig";
import JsonLd, { faqSchema } from "@/components/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Book Mobile Tesla Service",
  description: "Request mobile Tesla diagnostics or repair in Southern California. Send Ray your vehicle details, location, symptoms, and alert messages.",
  path: "/contact",
});

const faq = [
  { q: "Do I need a tow?", a: "Many diagnostics and selected repairs can be completed where the vehicle sits, provided the location is safe and the procedure is suitable for mobile work. Some conditions require transport or a controlled shop environment. Call with the symptoms before arranging a tow when the vehicle is safely parked." },
  { q: "What if the repair cannot be completed on the first visit?", a: "You will still receive the agreed diagnostic findings. If parts or another procedure are needed, Ray will explain and quote the next visit before work continues. When the repair scope was confirmed before the first dispatch, a required second dispatch does not carry an additional dispatch charge." },
  { q: "Will independent service void my Tesla warranty?", a: "Independent service does not automatically void a U.S. consumer warranty. Tesla can deny coverage for damage caused by an improper outside repair, modification, or part. Warranty repairs are performed through Tesla; Ray's report can document what was observed." },
  { q: "How do I pay?", a: "Card, cash, and Venmo are accepted on site. The diagnostic fee is due when service is performed. Parts and repair labor are quoted before authorization." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqSchema(faq)} />
      <Nav />
      <main>
        {/* Hero */}
        <div className="bg-brand-green-dk px-5 py-14">
          <div className="max-w-4xl mx-auto">
            <span className="section-label text-white/40">Contact Ray</span>
            <h1 className="font-display font-semibold text-white text-4xl sm:text-5xl tracking-wide mb-4">
              Book a Visit or Ask About a Tesla Problem
            </h1>
            <p className="font-body text-white/65 text-lg leading-relaxed max-w-xl mb-6">
              Call, text, email, or use the form below. Ray typically responds within one to two business hours. If the vehicle is stranded or unsafe to drive, call instead of waiting for the form.
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
            <span className="section-label">Request Form</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-2">
              Tell Ray About the Vehicle
            </h2>
            <p className="font-body text-brand-muted text-sm mb-8 max-w-lg leading-relaxed">
              Plain language is fine. Include the model, year, exact location, when the problem started,
              and the full alert text when possible.
            </p>

            <ContactForm />
          </div>

          {/* Info sidebar */}
          <div className="px-5 py-10 lg:px-7 flex flex-col gap-6 bg-brand-surface">

            {/* Direct contact */}
            <div className="bg-white rounded-card border border-brand-border p-5">
              <h3 className="font-display font-semibold text-brand-dark text-lg tracking-wide mb-4">Reach Ray Directly</h3>
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
              <h3 className="font-display font-semibold text-brand-green text-base tracking-wide mb-2">Response Time</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#1a3a0a" }}>
                Ray typically responds within one to two business hours. For a stranded vehicle, call directly instead of waiting on a form.
              </p>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-card border border-brand-border p-5">
              <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide mb-3">Availability</h3>
              {[
                { day: "Mon – Fri", time: "9:00 AM – 5:00 PM" },
                { day: "Saturday", time: "By appointment" },
                { day: "Sunday",   time: "By appointment" },
              ].map(({ day, time }) => (
                <div key={day} className="flex justify-between py-2 border-b border-brand-border last:border-0 text-sm">
                  <span className="font-body text-brand-muted">{day}</span>
                  <span className="font-body font-semibold text-brand-dark">{time}</span>
                </div>
              ))}
              <p className="font-body text-xs text-brand-muted mt-3 leading-relaxed">
                Appointments outside 9:00 AM–5:00 PM include a flat $50 Extended Service Hours fee.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="py-14 px-5 bg-brand-surface">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mb-6">Questions Before Booking</h2>
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
