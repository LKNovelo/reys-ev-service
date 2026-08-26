import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import { fetchAllBlogPosts, collectKeywords } from "@/lib/blogQueries";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/siteConfig";

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "Tesla Maintenance Guides and Field Notes",
  description: "Practical Tesla maintenance, charging, battery, warranty, tire, and diagnostic guidance from a Southern California mobile EV technician.",
  path: "/blog",
});

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
            <span className="section-label text-white/40">Field Notes and Owner Guides</span>
            <h1 className="font-display font-semibold text-white text-4xl sm:text-5xl tracking-wide mb-4">
              Practical Tesla Information From the Service Van
            </h1>
            <p className="font-body text-white/65 text-lg max-w-xl leading-relaxed mb-6">
              Ray writes about questions that come up during service calls: low-voltage warnings,
              charging behavior, tires, battery care, warranty terms, and what an alert means for the next step.
            </p>
            <div className="flex flex-wrap gap-4 font-body text-sm">
              <span className="text-white/60">Qualified independent repairer</span>
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
                Get a Note When Ray Publishes a Useful Field Report
              </h2>
              <p className="font-body text-white/60 text-sm leading-relaxed max-w-md">
                New posts cover recurring faults, owner questions, and changes that affect how a Tesla is maintained or charged.
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
                U.S. Marine veteran and mobile Tesla diagnostic technician. Articles separate Ray&apos;s field observations
                from manufacturer guidance and link to primary sources when a claim depends on published technical information.
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
