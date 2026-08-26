import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CTABar } from "@/components/CTABlocks";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/siteConfig";

export const metadata: Metadata = pageMeta({
  title: "New Tesla Owner Guide: Charging, Maintenance, and Safety",
  description: "A practical guide to Tesla charging, routine maintenance, phone keys, software updates, warning messages, and battery health.",
  path: "/ev-guide",
});

const maintenanceItems = [
  "Rotate tires every 6,250 miles or when tread-depth difference reaches 2/32 inch, whichever comes first.",
  "Check brake-fluid health every four years and replace it if needed.",
  "Replace the cabin air filter every two years.",
  "Replace Model Y HEPA and carbon filters every three years when equipped.",
  "Replace wiper blades about yearly or when their condition requires it.",
  "Clean and lubricate brake calipers every year or 12,500 miles in regions that salt winter roads.",
];

const ownerBasics = [
  {
    title: "The Low-Voltage Battery",
    body: "A separate 12V or lithium low-voltage system powers the computers, locks, controls, and electronics needed to wake the vehicle. Act promptly on a replacement or electrical-system alert. If the car is unresponsive, follow the model-specific procedure in the owner's manual or call roadside assistance.",
  },
  {
    title: "Phone Key and Key Card",
    body: "The phone key is convenient, but keep a paired key card with you. It provides a separate way to authenticate the vehicle if the phone is lost, discharged, or not recognized.",
  },
  {
    title: "Software Updates",
    body: "Install updates when the vehicle says they are ready and read Controls > Software > Release Notes. The notes shown in the car are specific to its configuration and can include operating or safety information.",
  },
  {
    title: "Regenerative Braking",
    body: "Regenerative braking slows the car when you ease off the accelerator and returns some energy to the battery. It can be limited when the battery is cold or nearly full. The brake pedal remains available, and the driver remains responsible for stopping.",
  },
];

const questions = [
  {
    q: "Can Any Repair Shop Service a Tesla?",
    a: "Tire, glass, cosmetic, and some mechanical work can be handled by many qualified shops. Electrical, charging, high-voltage, software, and Tesla-specific diagnostics require the right training, information, tools, and safety procedures.",
  },
  {
    q: "Does Independent Maintenance Void the Warranty?",
    a: "Not automatically in the United States. Tesla can still exclude damage caused by an outside repair, part, or modification. Approved warranty repairs are handled through Tesla.",
  },
  {
    q: "Should I Charge to 100 Percent?",
    a: "Follow the recommendation in the car or Tesla app. Some LFP-equipped vehicles receive different instructions from vehicles with an 80 percent daily recommendation.",
  },
  {
    q: "How Do I Check Battery Degradation?",
    a: "Start with the available state-of-health estimate or Battery Health screen and compare similar energy use over time. For the most accurate result, run Tesla's Battery Health Test when supported. The process can take up to 24 hours. Dashboard miles alone are not a capacity test.",
  },
];

export default function EvGuidePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-brand-green-lt border-b border-brand-border px-5 py-14">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">New to Tesla Ownership</span>
            <h1 className="font-display font-semibold text-brand-dark text-4xl sm:text-5xl tracking-wide mb-4">
              The First Things a New Tesla Owner Should Know
            </h1>
            <p className="font-body text-brand-muted text-lg leading-relaxed max-w-3xl">
              An EV removes oil changes, spark plugs, exhaust work, and many engine-related repairs from the schedule.
              It adds a few habits of its own: charging where the car normally parks, reading release notes, watching
              tire wear, and understanding the low-voltage system.
            </p>
            <p className="font-body text-brand-muted text-sm leading-relaxed max-w-3xl mt-4">
              Features and intervals vary by model, build date, configuration, and software. The owner&apos;s manual in
              the vehicle is the best source for that specific car.
            </p>
          </div>
        </section>

        <section className="py-16 px-5 bg-white border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Charging</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-6">
              Follow the Limit Shown by the Vehicle
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-brand-surface rounded-card border border-brand-border p-6">
                <h3 className="font-display font-semibold text-brand-dark text-xl tracking-wide mb-3">Daily Charge Limit</h3>
                <p className="font-body text-brand-muted text-sm leading-relaxed mb-3">
                  If the charging screen recommends an 80 percent daily limit, keep the daily setting near 80 percent
                  and use a higher limit when a trip requires it. Some LFP-equipped vehicles give different instructions.
                  Follow the exact recommendation on the touchscreen or in the Tesla app.
                </p>
                <p className="font-body text-brand-muted text-sm leading-relaxed">
                  On supported Model 3 vehicles, open Controls &gt; Software &gt; Additional Vehicle Information. Tesla
                  displays the high-voltage battery type there when the vehicle has an LFP battery. Use the charge-screen
                  message as a cross-check, not the only proof of chemistry.
                </p>
              </div>
              <div className="bg-brand-surface rounded-card border border-brand-border p-6">
                <h3 className="font-display font-semibold text-brand-dark text-xl tracking-wide mb-3">Charging Levels</h3>
                <p className="font-body text-brand-muted text-sm leading-relaxed mb-3">
                  Level 1 uses a standard household outlet and adds energy slowly. Level 2 uses a compatible 240-volt
                  circuit or Wall Connector and is the practical home option for many drivers. A qualified electrician
                  should size and install the circuit.
                </p>
                <p className="font-body text-brand-muted text-sm leading-relaxed">
                  Use Tesla navigation when traveling to a Supercharger so the car can precondition the battery and
                  estimate the charge needed for the next leg.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-5 bg-brand-surface border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Routine Maintenance</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-4">
              What Still Needs Service
            </h2>
            <p className="font-body text-brand-muted text-base leading-relaxed mb-8 max-w-3xl">
              Current Model 3 and Model Y owner information lists the following common items as applicable. Intervals
              differ for some Model S and Model X vehicles, so check the manual and Controls &gt; Service &gt; Maintenance.
            </p>
            <ul className="grid md:grid-cols-2 gap-3">
              {maintenanceItems.map((item) => (
                <li key={item} className="bg-white rounded-card border border-brand-border p-4 flex gap-3 font-body text-brand-muted text-sm leading-relaxed">
                  <span className="text-brand-green font-semibold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 px-5 bg-white border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Owner Basics</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-8">
              Systems Worth Understanding
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {ownerBasics.map(({ title, body }) => (
                <div key={title} className="bg-brand-surface rounded-card border border-brand-border p-5">
                  <h3 className="font-display font-semibold text-brand-dark text-lg tracking-wide mb-2">{title}</h3>
                  <p className="font-body text-brand-muted text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-5 bg-brand-surface border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Battery Health</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-4">
              Range Is Not a Capacity Test
            </h2>
            <p className="font-body text-brand-muted text-base leading-relaxed mb-4 max-w-3xl">
              Displayed rated range is an estimate. Weather, speed, elevation, tires, climate use, and route affect
              real-world consumption. Compare similar trips and review the vehicle&apos;s Energy information before
              deciding that a difference is battery degradation.
            </p>
            <p className="font-body text-brand-muted text-base leading-relaxed max-w-3xl">
              On supported vehicles, Ray can retrieve and interpret the available state-of-health estimate through
              owner-authorized diagnostic access. A fresh Battery Health Test is the more accurate measurement because
              it recalibrates the estimate through a controlled process. It requires compatible AC charging and can
              take up to 24 hours.
            </p>
          </div>
        </section>

        <section className="py-16 px-5 bg-white border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Warning Messages</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-4">
              Read the Alert and Follow Its Instruction
            </h2>
            <p className="font-body text-brand-muted text-base leading-relaxed mb-4 max-w-3xl">
              Tesla alerts include condition-specific instructions. Touch Learn More when available and follow the
              direction on the screen. Do not continue driving when the vehicle tells you to stop safely or says it
              may shut down.
            </p>
            <p className="font-body text-brand-muted text-base leading-relaxed max-w-3xl">
              If the touchscreen becomes unresponsive, park and hold both steering-wheel scroll buttons until the
              screen turns black. Wait for the restart. Tesla says the brake pedal is not required; this procedure
              restarts only the touchscreen.
            </p>
          </div>
        </section>

        <section className="py-16 px-5 bg-brand-surface border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Common Questions</span>
            <h2 className="font-display font-semibold text-brand-dark text-3xl tracking-wide mb-8">New Owner FAQ</h2>
            <div className="border border-brand-border rounded-card overflow-hidden">
              {questions.map(({ q, a }, index) => (
                <div key={q} className={`bg-white p-5 ${index < questions.length - 1 ? "border-b border-brand-border" : ""}`}>
                  <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide mb-2">{q}</h3>
                  <p className="font-body text-brand-muted text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
            <div className="font-body text-brand-muted text-sm leading-relaxed mt-8">
              <p className="font-semibold text-brand-dark mb-2">Primary Sources</p>
              <ul className="flex flex-col gap-2">
                <li><a className="text-brand-blue underline" href="https://www.tesla.com/ownersmanual/model3/en_us/" target="_blank" rel="noreferrer">Tesla Model 3 Owner&apos;s Manual</a></li>
                <li><a className="text-brand-blue underline" href="https://www.tesla.com/ownersmanual/modely/en_us/" target="_blank" rel="noreferrer">Tesla Model Y Owner&apos;s Manual</a></li>
                <li><a className="text-brand-blue underline" href="https://service.tesla.com/docs/Public/ServiceMode/service_mode_user_guide.pdf" target="_blank" rel="noreferrer">Tesla Service Mode System Health Test</a></li>
                <li><a className="text-brand-blue underline" href="https://www.tesla.com/support/vehicle-warranty" target="_blank" rel="noreferrer">Tesla Vehicle Warranty</a></li>
              </ul>
            </div>
          </div>
        </section>

        <CTABar />
      </main>
      <Footer />
    </>
  );
}
