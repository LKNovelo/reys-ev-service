import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ray's Gear — Tested Accessories for Your Tesla",
  description: "Accessories Ray actually uses and installs on customer cars. Phone mounts, floor mats, power frunk, cleaning supplies — no junk, no filler.",
};

const categories = ["All", "Phone & mounting", "Interior protection", "Frunk & trunk", "Charging", "Cleaning", "Roadside & safety"];

const gear = [
  {
    id: "quad-lock-mount",
    category: "Phone & mounting",
    name: "Quad Lock Tesla Dash Mount — Model 3 / Y",
    brand: "Quad Lock",
    price: "~$60–80",
    featured: true,
    blogSlug: "best-tesla-phone-mounts",
    blogTitle: "The best Tesla phone mounts after testing 8 options",
    raysTake: "I've tried probably eight different mounts over three years. Most loosen up within a few months or block part of the display. This one hasn't moved. The only one I actually recommend.",
    desc: "Mounts to the Tesla dash without adhesive or vent clips. One-hand release. Doesn't rattle at highway speed, doesn't block the screen, survives SoCal summer heat without loosening.",
    amazonUrl: "#",
  },
  {
    id: "3d-maxpider-mats",
    category: "Interior protection",
    name: "Kagu All-Weather Floor Mats — Model 3 / Y",
    brand: "3D MAXpider",
    price: "~$120 full set",
    featured: true,
    raysTake: "WeatherTech is fine. These fit better and cost less. Get the full set — fronts only is a false economy.",
    desc: "Laser-measured for exact fit. Raised edges contain spills. Ray installs these on customer cars regularly — they hold up in SoCal heat without warping or off-gassing.",
    amazonUrl: "#",
  },
  {
    id: "power-frunk",
    category: "Frunk & trunk",
    name: "Power Frunk Kit — Model 3 / Y",
    brand: "Hansshow / Tesloid",
    price: "~$180–240",
    featured: false,
    blogSlug: "power-frunk-install-guide",
    blogTitle: "Power frunk install — what to know before you buy",
    raysTake: "One of the more satisfying upgrades you can do. If you use the frunk regularly — and you should — this is worth it. Ray can install on-site.",
    desc: "Motorized front trunk opener. Hands-free open and close via app, button, or key fob. Ray has installed several of these — installation is clean and reversible.",
    amazonUrl: "#",
  },
  {
    id: "console-wrap",
    category: "Interior protection",
    name: "Center Console Wrap — Model 3 / Y",
    brand: "Abstract Ocean",
    price: "~$30",
    featured: false,
    raysTake: "One of the first things I tell new Model 3 owners. $30 now saves a $300 trim replacement later.",
    desc: "The center console piano black trim scratches within weeks. This wrap covers it without the glossy finish that shows every fingerprint.",
    amazonUrl: "#",
  },
  {
    id: "ceramic-spray",
    category: "Cleaning",
    name: "Ceramic Spray Coating",
    brand: "Adam's Polishes",
    price: "~$25",
    featured: false,
    raysTake: "I use this on my own car. Takes 30 minutes and the water beading lasts all season.",
    desc: "Easy-application ceramic coat. Genuinely protective for 6+ months. Works on the matte plastic trim without hazing.",
    amazonUrl: "#",
  },
  {
    id: "interior-spray",
    category: "Cleaning",
    name: "InnerClean Interior Detail Spray",
    brand: "Chemical Guys",
    price: "~$15",
    featured: false,
    raysTake: "Don't use Windex on your Tesla screen. This is the right call.",
    desc: "Safe on Tesla's touchscreen and vegan leather. Leaves no residue. Ray uses this between details on customer vehicles.",
    amazonUrl: "#",
  },
  {
    id: "frunk-liner",
    category: "Frunk & trunk",
    name: "Frunk Cargo Liner — Model Y",
    brand: "Taptes",
    price: "~$35",
    featured: false,
    raysTake: "Inexpensive and does exactly what it should. Easy to wipe down.",
    desc: "Custom-fit liner for the front trunk. Keeps the frunk clean and protects the finish when hauling groceries or gear.",
    amazonUrl: "#",
  },
  {
    id: "wheel-cleaner",
    category: "Cleaning",
    name: "Wheel Cleaner — safe for Tesla aero covers",
    brand: "Griot's Garage",
    price: "~$18",
    featured: false,
    raysTake: "Harsh wheel cleaners eat the plastic aero covers. This one doesn't.",
    desc: "pH-neutral, safe on Tesla's aero wheel covers and chrome delete trim. Works without scrubbing.",
    amazonUrl: "#",
  },
];

const featuredGear = gear.filter(g => g.featured);
const regularGear  = gear.filter(g => !g.featured);

export default function GearPage() {
  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <div className="bg-brand-surface border-b border-brand-border px-5 py-14">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Gear Ray actually uses</span>
            <h1 className="font-display font-semibold text-brand-dark text-4xl sm:text-5xl tracking-wide mb-4">
              Accessories worth buying —<br className="hidden sm:block" /> tested on real Teslas
            </h1>
            <p className="font-body text-brand-muted text-lg leading-relaxed max-w-xl mb-6">
              This is a short list. Every product here is something Ray has personally used,
              installed on a customer car, or recommended without hesitation.
              No junk, no filler.
            </p>
            <div className="flex items-start gap-3 bg-brand-green-lt border border-brand-green border-opacity-40 rounded-card p-4 max-w-xl">
              <span className="text-brand-green text-base mt-0.5 shrink-0">ℹ</span>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#1a3a0a" }}>
                <strong className="font-semibold">Affiliate disclosure:</strong> some links on this page are affiliate links.
                If you buy through them, Ray earns a small commission at no extra cost to you.
                This never influences what gets listed — if Ray wouldn&apos;t put it in his own car, it&apos;s not here.
              </p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white border-b border-brand-border px-5 py-3 flex gap-2 overflow-x-auto">
          <span className="font-body text-xs text-brand-muted shrink-0 self-center mr-1">Category:</span>
          {categories.map((c, i) => (
            <button key={c} className={`font-body text-xs px-3.5 py-1.5 rounded-full border shrink-0 transition-colors ${
              i === 0
                ? "bg-brand-green text-white border-brand-green"
                : "border-brand-border text-brand-muted hover:border-brand-green hover:text-brand-green"
            }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Featured picks */}
        <section className="py-12 px-5 bg-white border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">Top picks</span>
            <div className="flex flex-col gap-5">
              {featuredGear.map(({ id, category, name, brand, price, raysTake, desc, amazonUrl, blogSlug, blogTitle }) => (
                <div key={id} className="border-2 border-brand-green rounded-card grid sm:grid-cols-[180px_1fr] overflow-hidden">
                  <div className="bg-brand-surface flex items-center justify-center p-8 border-r border-brand-border relative">
                    <span className="absolute top-3 left-3 font-body text-[10px] font-semibold bg-brand-green text-white px-2.5 py-1 rounded-full">
                      Ray&apos;s top pick
                    </span>
                    <span className="text-4xl">📦</span>
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <div>
                      <span className="font-body text-xs text-brand-muted">{brand} · {category}</span>
                      <h3 className="font-display font-semibold text-brand-dark text-xl tracking-wide mt-0.5">{name}</h3>
                    </div>
                    <p className="font-body text-brand-muted text-sm leading-relaxed">{desc}</p>
                    <div className="bg-brand-green-lt rounded-lg p-3">
                      <p className="font-body text-[10px] font-semibold text-brand-green uppercase tracking-wider mb-1">Ray&apos;s take</p>
                      <p className="font-body text-sm leading-relaxed" style={{ color: "#1a3a0a" }}>{raysTake}</p>
                    </div>
                    {blogSlug && (
                      <a href={`/blog/${blogSlug}`} className="flex items-center gap-2 font-body text-xs text-brand-blue bg-brand-blue-lt rounded-lg px-3 py-2 hover:opacity-80 transition-opacity">
                        <span>📄</span>
                        Ray wrote about this → <strong className="font-semibold">{blogTitle}</strong>
                      </a>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-brand-border mt-auto">
                      <span className="font-body text-brand-muted text-sm">{price}</span>
                      <a
                        href={amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="font-body font-semibold text-sm bg-brand-amber text-brand-dark px-4 py-2 rounded-lg hover:brightness-95 transition-all"
                      >
                        View on Amazon ↗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regular grid */}
        <section className="py-12 px-5 bg-brand-surface">
          <div className="max-w-4xl mx-auto">
            <span className="section-label">All picks</span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {regularGear.map(({ id, category, name, brand, price, raysTake, amazonUrl, blogSlug, blogTitle }) => (
                <div key={id} className="bg-white rounded-card border border-brand-border flex flex-col overflow-hidden">
                  <div className="bg-brand-surface h-24 flex items-center justify-center border-b border-brand-border">
                    <span className="text-3xl">📦</span>
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div>
                      <span className="font-body text-xs text-brand-muted">{brand} · {category}</span>
                      <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide mt-0.5 leading-snug">{name}</h3>
                    </div>
                    <div className="bg-brand-green-lt rounded-lg p-2.5 flex-1">
                      <p className="font-body text-[10px] font-semibold text-brand-green uppercase tracking-wider mb-1">Ray&apos;s take</p>
                      <p className="font-body text-xs leading-relaxed" style={{ color: "#1a3a0a" }}>{raysTake}</p>
                    </div>
                    {blogSlug && (
                      <a href={`/blog/${blogSlug}`} className="font-body text-xs text-brand-blue flex items-center gap-1.5 hover:underline">
                        <span>📄</span> {blogTitle}
                      </a>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-brand-border">
                      <span className="font-body text-brand-muted text-xs">{price}</span>
                      <a
                        href={amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="font-body font-semibold text-xs bg-brand-amber text-brand-dark px-3 py-1.5 rounded-lg hover:brightness-95 transition-all"
                      >
                        Amazon ↗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclosure footer */}
        <div className="bg-white border-t border-brand-border px-5 py-6">
          <div className="max-w-4xl mx-auto">
            <p className="font-body text-xs text-brand-muted leading-relaxed">
              <strong className="font-semibold text-brand-dark">Affiliate disclosure.</strong> Some links on this page are Amazon affiliate links.
              Ray earns a small commission if you purchase through them — at no extra cost to you.
              Products are listed because Ray uses them or has installed them on customer vehicles.
              Commissions don&apos;t influence what appears here. If Ray stops recommending something, it comes off the page.
            </p>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
