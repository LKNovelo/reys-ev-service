import Nav    from "@/components/Nav";
import Footer from "@/components/Footer";
import Link   from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { fetchBlogPost, fetchAllSlugs, calcReadTime } from "@/lib/blogQueries";
import { urlFor } from "@/lib/sanity";
import type { Metadata } from "next";

/* Allow on-demand rendering for slugs not yet in the static set */
export const dynamicParams = true;
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.seoTitle || `${post.title} — Ray's EV Service`,
    description: post.seoDesc || post.excerpt || undefined,
  };
}

/* ── Custom Portable Text components ──────────────────────────────────────── */

const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => {
      const id = value._key || "";
      return (
        <h2
          id={id}
          className="font-display font-semibold text-brand-dark text-2xl tracking-wide mt-8 mb-4 pt-6 border-t border-brand-border"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="font-display font-semibold text-brand-dark text-xl tracking-wide mt-6 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-base mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-border pl-4 italic text-brand-muted mb-5">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-blue underline hover:text-brand-green transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-5 flex flex-col gap-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-5 flex flex-col gap-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base">{children}</li>,
    number: ({ children }) => <li className="text-base">{children}</li>,
  },
  types: {
    inlineImage: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-6">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || ""}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="font-body text-xs text-brand-muted mt-2 text-center">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    fieldNote: ({ value }) => (
      <div className="border-l-4 border-brand-green bg-brand-green-lt rounded-r-lg px-5 py-4 my-6">
        <p className="font-body text-[10px] font-semibold text-brand-green uppercase tracking-wider mb-2 flex items-center gap-1.5">
          ⚡ Field note — Ray Novelo
        </p>
        <p className="font-body text-sm leading-relaxed" style={{ color: "#1a3a0a" }}>
          {value.body}
        </p>
      </div>
    ),
    warningNote: ({ value }) => (
      <div className="border-l-4 border-brand-amber bg-amber-50 rounded-r-lg px-5 py-4 my-6">
        <p className="font-body text-[10px] font-semibold text-amber-800 uppercase tracking-wider mb-2">
          ⚠ {value.heading || "Warning"}
        </p>
        <p className="font-body text-sm leading-relaxed text-amber-900">{value.body}</p>
      </div>
    ),
    faultCodeBlock: ({ value }) => (
      <div className="bg-brand-dark rounded-lg p-4 my-5">
        <p className="font-body text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Relevant fault codes
        </p>
        {value.codes?.map((fc: { code: string; desc: string }, i: number) => (
          <div key={i} className="mb-3 last:mb-0">
            <span className="font-mono text-brand-amber text-sm block">{fc.code}</span>
            <span className="font-mono text-gray-400 text-xs">{fc.desc}</span>
          </div>
        ))}
      </div>
    ),
    checklist: ({ value }) => (
      <ul className="flex flex-col gap-3 mb-6">
        {value.items?.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-3 font-body text-base">
            <span className="text-brand-green mt-0.5 shrink-0">✓</span>
            {item}
          </li>
        ))}
      </ul>
    ),
    serviceCTA: ({ value }) => (
      <div className="border border-brand-green rounded-card p-5 my-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="font-display font-semibold text-brand-dark text-base tracking-wide mb-1">
            {value.heading}
          </h3>
          <p className="font-body text-brand-muted text-sm">{value.ctaText}</p>
        </div>
        <a
          href="tel:+19516226222"
          className="font-body font-semibold text-sm bg-brand-green text-white px-4 py-2.5 rounded-lg hover:bg-brand-green-dk transition-colors whitespace-nowrap shrink-0"
        >
          Call or text Ray
        </a>
      </div>
    ),
  },
};

/* ── Page component ───────────────────────────────────────────────────────── */

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) notFound();

  // Extract plain text for read time
  const bodyText = post.body
    ?.filter((b: { _type?: string; children?: { text?: string }[] }) => b._type === "block")
    .flatMap((b: { children?: { text?: string }[] }) => b.children?.map((c: { text?: string }) => c.text || "") || [])
    .join(" ") || "";
  const readTime = calcReadTime(bodyText);

  // Build table of contents from h2 blocks
  const toc = post.body
    ?.filter((b: { _type?: string; style?: string }) => b._type === "block" && b.style === "h2")
    .map((b: { _key?: string; children?: { text?: string }[] }) => ({
      text: b.children?.map((c: { text?: string }) => c.text || "").join("") || "",
      id: b._key || "",
    })) || [];

  // Group references by group name
  const refGroups: Record<string, typeof post.references> = {};
  if (post.references) {
    for (const ref of post.references) {
      if (!refGroups[ref.group]) refGroups[ref.group] = [];
      refGroups[ref.group]!.push(ref);
    }
  }

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
            {post.excerpt && (
              <p className="font-body text-brand-muted text-lg leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-green-lt border-2 border-brand-green flex items-center justify-center font-display font-semibold text-brand-green text-sm shrink-0">
                RN
              </div>
              <div>
                <p className="font-body font-semibold text-brand-dark text-sm">Ray Novelo</p>
                <p className="font-body text-brand-muted text-xs">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {readTime}
                </p>
              </div>
            </div>
            {post.keywords && post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((tag) => (
                  <span key={tag} className="font-body text-xs border border-brand-border text-brand-muted px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cover image or placeholder */}
        {post.coverImage?.asset ? (
          <div className="border-b border-brand-border">
            <img
              src={urlFor(post.coverImage).width(1200).height(630).url()}
              alt={post.coverImage.alt || post.title}
              className="w-full h-64 object-cover"
            />
          </div>
        ) : (
          <div className="bg-brand-surface border-b border-brand-border h-64 flex flex-col items-center justify-center gap-2">
            <span className="text-4xl">📷</span>
            <p className="font-body text-brand-muted text-sm">Cover photo — uploaded via Sanity CMS</p>
            <p className="font-body text-xs text-brand-border">Recommended: 1200×630px</p>
          </div>
        )}

        {/* Article + sidebar */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_240px] gap-0 border-b border-brand-border">

          {/* Article body */}
          <article className="px-5 py-12 lg:px-10 lg:border-r lg:border-brand-border">
            <div className="font-body text-brand-dark leading-relaxed max-w-2xl">
              <PortableText value={post.body || []} components={ptComponents} />
            </div>

            {/* References section */}
            {post.references && post.references.length > 0 && (
              <div className="border-t border-brand-border pt-8 mt-10">
                <h2 className="font-display font-semibold text-brand-dark text-xl tracking-wide mb-1">
                  References &amp; further reading
                </h2>
                <p className="font-body text-brand-muted text-xs mb-6">
                  External resources related to this post. We link directly — no paywalls, no affiliate links.
                </p>
                {Object.entries(refGroups).map(([group, items]) => (
                  <div key={group} className="mb-6">
                    <p className="font-body text-[10px] font-semibold text-brand-muted uppercase tracking-wider mb-3">{group}</p>
                    <div className="flex flex-col gap-3">
                      {items!.map(({ title, source, desc, url }) => (
                        <a
                          key={title}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 bg-white border border-brand-border rounded-lg p-4 hover:border-brand-blue transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-body font-semibold text-brand-blue text-sm mb-0.5 group-hover:underline">{title}</p>
                            {source && <p className="font-body text-brand-muted text-xs mb-1">{source}</p>}
                            {desc && <p className="font-body text-brand-muted text-xs leading-relaxed">{desc}</p>}
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
            {post.keywords && post.keywords.length > 0 && (
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
            )}
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
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="bg-white border-b border-brand-border px-5 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display font-semibold text-brand-dark text-2xl tracking-wide mb-6">Related posts</h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {post.relatedPosts.map((related) => (
                  <Link key={related._id} href={`/blog/${related.slug}`} className="group rounded-card border border-brand-border overflow-hidden hover:border-brand-green transition-colors">
                    {related.coverImage?.asset ? (
                      <img
                        src={urlFor(related.coverImage).width(400).height(200).url()}
                        alt={related.coverImage.alt || related.title}
                        className="w-full h-20 object-cover border-b border-brand-border"
                      />
                    ) : (
                      <div className="bg-brand-surface h-20 flex items-center justify-center border-b border-brand-border">
                        <span className="text-2xl">📄</span>
                      </div>
                    )}
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
