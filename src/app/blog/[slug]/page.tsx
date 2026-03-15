import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import Link   from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, calculateReadTime } from "@/lib/blogData";
import type { ContentBlock } from "@/lib/blogData";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Ray's EV Service`,
    description: post.excerpt,
  };
}

/* ── Content block renderer ──────────────────────────────────────────────── */
function RenderBlock({ block, index }: { block: ContentBlock; index: number }) {
  switch (block.type) {
    case "p":
      return <p className="text-base mb-5">{block.text}</p>;

    case "h2":
      return (
        <h2
          id={block.id}
          className="font-display font-semibold text-brand-dark text-2xl tracking-wide mt-8 mb-4 pt-6 border-t border-brand-border"
        >
          {block.text}
        </h2>
      );

    case "fieldNote":
      return (
        <div className="border-l-4 border-brand-green bg-brand-green-lt rounded-r-lg px-5 py-4 my-6">
          <p className="font-body text-[10px] font-semibold text-brand-green uppercase tracking-wider mb-2 flex items-center gap-1.5">
            ⚡ Field note — Ray Novelo
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: "#1a3a0a" }}>
            {block.text}
          </p>
        </div>
      );

    case "warning":
      return (
        <div className="border-l-4 border-brand-amber bg-amber-50 rounded-r-lg px-5 py-4 my-6">
          <p className="font-body text-[10px] font-semibold text-amber-800 uppercase tracking-wider mb-2">
            ⚠ {block.heading}
          </p>
          <p className="font-body text-sm leading-relaxed text-amber-900">{block.text}</p>
        </div>
      );

    case "faultCodes":
      return (
        <div className="bg-brand-dark rounded-lg p-4 my-5">
          <p className="font-body text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Relevant fault codes
          </p>
          {block.codes.map(({ code, desc }) => (
            <div key={code} className="mb-3 last:mb-0">
              <span className="font-mono text-brand-amber text-sm block">{code}</span>
              <span className="font-mono text-gray-400 text-xs">{desc}</span>
            </div>
          ))}
        </div>
      );

    case "checklist":
      return (
        <ul className="flex flex-col gap-3 mb-6">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 font-body text-base">
              <span className="text-brand-green mt-0.5 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      );

    case "serviceCTA":
      return (
        <div className="border border-brand-green rounded-card p-5 my-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide mb-1">
              {block.heading}
            </h3>
            <p className="font-body text-brand-muted text-sm">{block.text}</p>
          </div>
          <a
            href="tel:+19516226222"
            className="font-body font-semibold text-sm bg-brand-green text-white px-4 py-2.5 rounded-lg hover:bg-brand-green-dk transition-colors whitespace-nowrap shrink-0"
          >
            Call or text Ray
          </a>
        </div>
      );

    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const readTime = calculateReadTime(post);
  const allPosts = getAllPosts();
  const relatedPosts = post.relatedSlugs
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter(Boolean);

  // Build table of contents from h2 blocks
  const toc = post.content
    .filter((b): b is ContentBlock & { type: "h2" } => b.type === "h2")
    .map((b) => ({ text: b.text, id: b.id }));

  return (
    <>
      <Nav />
      <main>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-brand-border px-5 py-3 flex items-center gap-2 text-xs font-body text-brand-muted">
          <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
          <span className="text-brand-border">›</span>
          <Link href="/blog" className="hover:text-brand-green transition-colors">Blog</Link>
          <span className="text-brand-border">›</span>
          <span className="text-brand-dark">{post.category}</span>
        </div>

        {/* Post header */}
        <div className="bg-white px-5 py-12 border-b border-brand-border">
          <div className="max-w-2xl">
            <span className="font-body text-[10px] font-semibold text-brand-blue uppercase tracking-wider block mb-3">
              {post.category}
            </span>
            <h1 className="font-display font-semibold text-brand-dark text-3xl sm:text-4xl tracking-wide leading-tight mb-4">
              {post.title}
            </h1>
            <p className="font-body text-brand-muted text-lg leading-relaxed mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-green-lt border-2 border-brand-green flex items-center justify-center font-display font-semibold text-brand-green text-sm shrink-0">
                RN
              </div>
              <div>
                <p className="font-body font-semibold text-brand-dark text-sm">Ray Novelo</p>
                <p className="font-body text-brand-muted text-xs">{post.displayDate} · {readTime}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((tag) => (
                <span key={tag} className="font-body text-xs border border-brand-border text-brand-muted px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hero image placeholder */}
        <div className="bg-brand-surface border-b border-brand-border h-64 flex flex-col items-center justify-center gap-2">
          <span className="text-4xl">📷</span>
          <p className="font-body text-brand-muted text-sm">Cover photo — uploaded via Sanity CMS</p>
          <p className="font-body text-xs text-brand-border">Recommended: 1200×630px</p>
        </div>

        {/* Article + sidebar */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_240px] gap-0 border-b border-brand-border">

          {/* Article body */}
          <article className="px-5 py-12 lg:px-10 lg:border-r lg:border-brand-border">
            <div className="font-body text-brand-dark leading-relaxed max-w-2xl">
              {post.content.map((block, i) => (
                <RenderBlock key={i} block={block} index={i} />
              ))}
            </div>

            {/* References section */}
            {post.references.length > 0 && (
              <div className="border-t border-brand-border pt-8 mt-10">
                <h2 className="font-display font-semibold text-brand-dark text-xl tracking-wide mb-1">
                  References &amp; further reading
                </h2>
                <p className="font-body text-brand-muted text-xs mb-6">
                  External resources related to this post. We link directly — no paywalls, no affiliate links.
                </p>
                {post.references.map(({ group, items }) => (
                  <div key={group} className="mb-6">
                    <p className="font-body text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-3">{group}</p>
                    <div className="flex flex-col gap-3">
                      {items.map(({ title, source, desc, url }) => (
                        <a
                          key={title}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 bg-white border border-brand-border rounded-lg p-4 hover:border-brand-blue transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-body font-semibold text-brand-blue text-sm mb-0.5 group-hover:underline">{title}</p>
                            <p className="font-body text-brand-muted text-xs mb-1">{source}</p>
                            <p className="font-body text-brand-muted text-xs leading-relaxed">{desc}</p>
                          </div>
                          <span className="text-brand-muted text-sm shrink-0 mt-0.5">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Share bar */}
            <div className="border-t border-brand-border pt-5 mt-6 flex items-center gap-3">
              <span className="font-body text-sm text-brand-muted">Share this post:</span>
              <button className="font-body text-xs border border-brand-border text-brand-muted px-3.5 py-1.5 rounded-full hover:border-brand-green hover:text-brand-green transition-colors">
                Copy link
              </button>
              <button className="font-body text-xs border border-brand-border text-brand-muted px-3.5 py-1.5 rounded-full hover:border-brand-green hover:text-brand-green transition-colors">
                Text to a friend
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-6 px-6 py-10 sticky top-14 self-start">

            {/* Table of contents */}
            {toc.length > 0 && (
              <div className="bg-white border border-brand-border rounded-card p-4">
                <h3 className="font-body text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-3">
                  In this post
                </h3>
                <div className="flex flex-col">
                  {toc.map((item, i) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="font-body text-xs py-2 border-b border-brand-border last:border-0 flex items-start gap-2 hover:text-brand-green transition-colors text-brand-muted"
                    >
                      <span className="font-mono text-brand-border text-[10px] mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.text}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar CTA */}
            <div className="bg-brand-green-dk rounded-card p-5 text-center">
              <h3 className="font-display font-semibold text-white text-base tracking-wide mb-2">Need help?</h3>
              <p className="font-body text-white/60 text-xs leading-relaxed mb-4">
                Text your fault codes first — Ray will pre-screen before dispatch.
              </p>
              <a
                href="tel:+19516226222"
                className="font-body font-semibold text-sm bg-brand-amber text-brand-dark px-4 py-2.5 rounded-lg block hover:brightness-95 transition-all"
              >
                Call (951) 622-6222
              </a>
              <span className="font-body text-[10px] text-white/35 mt-2 block">
                Ray answers directly · same-day dispatch
              </span>
            </div>

            {/* Related tags */}
            <div>
              <h3 className="font-body text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-3">
                Related topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((tag) => (
                  <span key={tag} className="font-body text-xs border border-brand-border text-brand-muted px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Author box */}
        <div className="bg-brand-surface border-b border-brand-border px-5 py-8">
          <div className="max-w-3xl mx-auto flex items-start gap-5">
            <div className="w-14 h-14 rounded-full bg-brand-green-lt border-2 border-brand-green flex items-center justify-center font-display font-semibold text-brand-green text-lg shrink-0">
              RN
            </div>
            <div>
              <p className="font-display font-semibold text-brand-dark text-base tracking-wide">Ray Novelo</p>
              <p className="font-body text-xs text-brand-green mb-2">Owner, Ray&apos;s EV Service · Tesla specialist</p>
              <p className="font-body text-brand-muted text-sm leading-relaxed">
                U.S. Marine veteran and Aerospace-trained electrical specialist. Ray has been diagnosing and
                repairing Teslas since 2018 — apprenticing at EV-specialized garages before launching his
                own mobile service in 2023. Every post is based on real jobs, real fault codes, and real
                conversations with Tesla owners across Southern California.
              </p>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-white border-b border-brand-border px-5 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mb-6">Related posts</h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {relatedPosts.map((related) => related && (
                  <Link key={related.slug} href={`/blog/${related.slug}`} className="group rounded-card border border-brand-border overflow-hidden hover:border-brand-green transition-colors">
                    <div className="bg-brand-surface h-20 flex items-center justify-center border-b border-brand-border">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div className="p-4">
                      <span className="font-body text-[10px] font-semibold text-brand-blue uppercase tracking-wider block mb-2">{related.category}</span>
                      <h3 className="font-display font-semibold text-brand-dark text-sm tracking-wide leading-snug group-hover:text-brand-green transition-colors">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Post-level CTA */}
        <div className="bg-brand-green-dk px-5 py-14 text-center">
          <h2 className="font-display font-semibold text-white text-3xl tracking-wide mb-3">
            Think this applies to your Tesla?
          </h2>
          <p className="font-body text-white/65 text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Text your fault codes to (951) 622-6222 and Ray will pre-screen before rolling the van.
            Remote diagnostic is $100 flat — credited toward repair if you book service.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="tel:+19516226222"
              className="font-body font-semibold text-base bg-brand-amber text-brand-dark px-7 py-3.5 rounded-lg hover:brightness-95 transition-all"
            >
              Call or text Ray
            </a>
            <Link
              href="/services"
              className="font-body font-semibold text-base border border-white/30 text-white px-7 py-3.5 rounded-lg hover:border-white/60 hover:bg-white/5 transition-all"
            >
              View all services
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
