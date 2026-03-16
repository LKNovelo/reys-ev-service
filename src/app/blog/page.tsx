import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { fetchAllBlogPosts, collectKeywords } from "@/lib/blogQueries";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog — Field Notes & Guides — Ray's EV Service",
  description: "Tesla maintenance tips, service findings, software update notes, and EV guides from Ray Novelo — written from real jobs in Southern California.",
};

export default async function BlogPage() {
  const posts = await fetchAllBlogPosts();
  const keywords = collectKeywords(posts);

  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <div className="bg-brand-green-dk px-5 py-14 border-b border-brand-border">
          <div className="max-w-4xl mx-auto">
            <span className="section-label text-white/40">Field notes &amp; guides</span>
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

        {/* Blog listing with filtering */}
        <div className="max-w-5xl mx-auto px-5 py-12">
          <BlogList posts={posts} keywords={keywords} />
        </div>

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
