import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Field Notes & Guides — Ray's EV Service",
  description: "Tesla maintenance tips, service findings, software update notes, and EV guides from Ray Novelo — written from real jobs in Southern California.",
};

// Static placeholder posts — will be replaced with Sanity data fetch
const posts = [
  {
    slug: "12v-battery-blind-spot",
    category: "Battery",
    categoryStyle: "bg-brand-green-lt text-brand-green",
    title: "The 12V battery is the most dangerous blind spot in Tesla ownership — and most owners don't know it exists",
    excerpt: "It's not the big battery. It's the small one. The 12V auxiliary battery can fail silently — no warning light, no gradual decline. One morning your car won't unlock, won't respond to the app, won't do anything.",
    date: "March 12, 2025",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "tesla-software-update-charging",
    category: "Software",
    categoryStyle: "bg-brand-blue-lt text-brand-blue",
    title: "Tesla 2025.x update changed charging behavior — here's what shifted and why it matters",
    excerpt: "The latest OTA update quietly adjusted default charge rate behavior. If your car seems to charge differently than it used to, this is likely why.",
    date: "Feb 28, 2025",
    readTime: "3 min read",
    featured: false,
  },
  {
    slug: "supercharger-etiquette",
    category: "Charging",
    categoryStyle: "bg-brand-blue-lt text-brand-blue",
    title: "Supercharger etiquette — the unwritten rules that prevent parking lot confrontations",
    excerpt: "A practical guide to Supercharger behavior: when to move your car, idle fee timing, how to handle a full station, and what to do when someone ICE's your spot.",
    date: "Feb 14, 2025",
    readTime: "4 min read",
    featured: false,
  },
  {
    slug: "nmc-vs-lfp-battery",
    category: "EV 101",
    categoryStyle: "bg-brand-green-lt text-brand-green",
    title: "NMC vs. LFP battery chemistry — which one is in your Tesla and how it changes how you should charge",
    excerpt: "Most guides say charge to 80%. That rule only applies to NMC chemistry. If your Model 3 has an LFP pack, you should charge to 100% regularly. Here's how to tell which one you have.",
    date: "Jan 30, 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "model-y-tire-replacement",
    category: "Tires",
    categoryStyle: "bg-amber-50 text-amber-800",
    title: "What to actually look for when replacing tires on a Model 3 or Model Y",
    excerpt: "EV tires wear differently from gas car tires. The extra weight and instant torque change the equation. Here's what matters when you're shopping replacements.",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "40-teslas-what-keeps-failing",
    category: "Service finding",
    categoryStyle: "bg-purple-50 text-purple-700",
    title: "We diagnosed 40 Teslas last month — here's what keeps failing",
    excerpt: "A month of field data from Southern California: the most common fault codes, which models show up most, and what's almost always the actual root cause.",
    date: "Dec 20, 2024",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "tesla-warranty-covers-more",
    category: "Battery",
    categoryStyle: "bg-brand-green-lt text-brand-green",
    title: "Your Tesla warranty covers more than you think — know before you pay out of pocket",
    excerpt: "50k bumper-to-bumper. 120k HV battery warranty on most models. A lot of owners are paying for repairs that Tesla should be covering. Here's what to check.",
    date: "Nov 18, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    slug: "regen-braking-explained",
    category: "EV 101",
    categoryStyle: "bg-brand-green-lt text-brand-green",
    title: "Regen braking explained — why your brake pads last 120k miles and your rotors still rust",
    excerpt: "Regenerative braking does the heavy lifting on most stops. That's great for pads — but it means your rotors almost never get the heat they need to stay clean.",
    date: "Nov 5, 2024",
    readTime: "4 min read",
    featured: false,
  },
];

const categories = ["All", "Battery", "Software", "Charging", "Tires", "Service finding", "EV 101", "Supercharger"];

const featuredPost = posts.find(p => p.featured);
const regularPosts = posts.filter(p => !p.featured);

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <div className="bg-brand-green-dk px-5 py-14 border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label text-white/40">Field notes & guides</span>
            <h1 className="font-display font-semibold text-white text-4xl sm:text-5xl tracking-wide mb-4">
              From the shop
            </h1>
            <p className="font-body text-white/65 text-lg max-w-xl leading-relaxed mb-6">
              Tesla news, service findings, and EV advice. Written by Ray Novelo —
              not marketing copy. Real jobs, real Teslas, real Southern California roads.
            </p>
            <div className="flex flex-wrap gap-4 font-body text-sm">
              <span className="text-white/60">Aerospace-trained electrical specialist</span>
              <span className="text-white/30">·</span>
              <span className="text-white/60">U.S. Marine veteran</span>
              <span className="text-white/30">·</span>
              <span className="text-white/60">Mobile EV repair, LA–San Diego</span>
            </div>
          </div>
        </div>

        {/* Featured post */}
        {featuredPost && (
          <div className="px-5 py-8 bg-white border-b border-brand-border">
            <div className="max-w-4xl mx-auto">
              <span className="section-label">Featured</span>
              <div className="grid sm:grid-cols-[auto_1fr] gap-0 border border-brand-green rounded-card overflow-hidden">
                <div className="bg-brand-surface min-h-[180px] sm:w-48 flex items-center justify-center border-r border-brand-border">
                  <div className="w-12 h-12 rounded-full bg-brand-green-lt flex items-center justify-center">
                    <span className="text-brand-green text-xl font-display font-bold">⚡</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className={`font-body text-[10px] font-semibold px-2.5 py-1 rounded-full ${featuredPost.categoryStyle} inline-block mb-3`}>
                    {featuredPost.category}
                  </span>
                  <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide leading-tight mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="font-body text-brand-muted text-sm leading-relaxed mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-brand-muted">
                      Ray Novelo · {featuredPost.date} · {featuredPost.readTime}
                    </span>
                    <a href={`/blog/${featuredPost.slug}`} className="font-body text-sm font-semibold text-brand-green hover:underline">
                      Read →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter bar */}
        <div className="sticky top-14 z-40 bg-white border-b border-brand-border px-5 py-3 flex gap-2 overflow-x-auto">
          <span className="font-body text-xs text-brand-muted shrink-0 self-center mr-1">Filter:</span>
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

        {/* Post grid */}
        <section className="py-10 px-5 bg-white">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {regularPosts.map(({ slug, category, categoryStyle, title, date, readTime }) => (
              <a key={slug} href={`/blog/${slug}`} className="group rounded-card border border-brand-border flex flex-col overflow-hidden hover:border-brand-green transition-colors">
                <div className="bg-brand-surface h-28 flex items-center justify-center border-b border-brand-border">
                  <span className="text-brand-muted text-3xl">📷</span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className={`font-body text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mb-2 self-start ${categoryStyle}`}>
                    {category}
                  </span>
                  <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide leading-snug mb-3 flex-1 group-hover:text-brand-green transition-colors">
                    {title}
                  </h3>
                  <div className="flex items-center justify-between pt-2 border-t border-brand-border">
                    <span className="font-body text-xs text-brand-muted">{date}</span>
                    <span className="font-body text-xs text-brand-muted">{readTime}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="max-w-4xl mx-auto text-center mt-8">
            <button className="font-body text-sm text-brand-muted border border-brand-border px-6 py-2.5 rounded-lg hover:border-brand-green hover:text-brand-green transition-colors">
              Load more posts
            </button>
          </div>
        </section>

        {/* Newsletter */}
        <div className="bg-brand-green-dk px-5 py-14">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="font-display font-semibold text-white text-2xl tracking-wide mb-2">
                New post when there&apos;s something worth saying
              </h2>
              <p className="font-body text-white/60 text-sm leading-relaxed max-w-md">
                No newsletter cadence, no filler content. Ray posts when there&apos;s a real finding —
                a common failure, a software change that affects your car. Usually once or twice a month.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-w-[220px]">
              <input
                type="email"
                placeholder="your@email.com"
                className="font-body border border-white/25 bg-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50"
              />
              <button className="font-body font-semibold text-sm bg-brand-amber text-brand-dark px-5 py-2.5 rounded-lg hover:brightness-95 transition-all">
                Subscribe
              </button>
              <span className="font-body text-[10px] text-white/30 text-center">No spam. Unsubscribe any time.</span>
            </div>
          </div>
        </div>

        {/* Author strip */}
        <div className="bg-white border-t border-brand-border px-5 py-8">
          <div className="max-w-4xl mx-auto flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-brand-green-lt border-2 border-brand-green flex items-center justify-center font-display font-semibold text-brand-green text-lg shrink-0">
              RN
            </div>
            <div className="flex-1">
              <p className="font-display font-semibold text-brand-dark text-base tracking-wide">Ray Novelo</p>
              <p className="font-body text-xs text-brand-green mb-1">Owner, Ray&apos;s EV Service · Tesla specialist</p>
              <p className="font-body text-brand-muted text-sm leading-relaxed">
                U.S. Marine veteran and Aerospace-trained electrical specialist. Every post is based on real jobs,
                real fault codes, and real conversations with Tesla owners across Southern California.
              </p>
            </div>
            <a href="/about" className="font-body text-sm font-semibold text-brand-green border border-brand-green px-4 py-2 rounded-lg hover:bg-brand-green-lt transition-colors shrink-0">
              About Ray →
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
