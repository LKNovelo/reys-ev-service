"use client";

import { useState, useMemo } from "react";
import { calcReadTime } from "@/lib/blogQueries";
import type { SanityBlogListItem } from "@/lib/blogQueries";
import { urlFor } from "@/lib/sanity";

interface BlogListProps {
  posts: SanityBlogListItem[];
  keywords: string[];
}

export default function BlogList({ posts, keywords }: BlogListProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(6);

  // Posts are already sorted by publishedAt desc from the GROQ query
  const featuredPost = posts[0] ?? null;
  const otherPosts = posts.slice(1);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (!activeFilter) return otherPosts;

    if (activeFilter === "recent") {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      return otherPosts.filter((post) => new Date(post.publishedAt) >= ninetyDaysAgo);
    }

    return otherPosts.filter((post) => post.keywords?.includes(activeFilter));
  }, [activeFilter, otherPosts]);

  // Pagination
  const displayedPosts = filteredPosts.slice(0, displayCount);
  const hasMore = displayCount < filteredPosts.length;

  return (
    <div className="w-full">
      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-12">
          <span className="section-label">Featured</span>
          <div className="grid sm:grid-cols-[auto_1fr] gap-0 border border-brand-green rounded-card overflow-hidden">
            {/* Featured Image */}
            {featuredPost.coverImage?.asset ? (
              <img
                src={urlFor(featuredPost.coverImage).width(320).height(320).url()}
                alt={featuredPost.coverImage.alt || featuredPost.title}
                className="w-full sm:w-80 h-64 sm:h-80 object-cover"
              />
            ) : (
              <div className="w-full sm:w-80 h-64 sm:h-80 bg-brand-green-lt flex items-center justify-center text-brand-muted">
                <div className="text-sm font-body">Image</div>
              </div>
            )}

            {/* Featured Content */}
            <div className="p-8 flex flex-col justify-between bg-white">
              {featuredPost.keywords?.[0] && (
                <div className="inline-block w-fit mb-4">
                  <span className="inline-block bg-brand-green-lt text-brand-green text-xs font-bold px-3 py-1 rounded-full font-display">
                    {featuredPost.keywords[0]}
                  </span>
                </div>
              )}

              <h2 className="text-3xl font-display font-bold text-brand-dark mb-4 leading-tight">
                {featuredPost.title}
              </h2>

              {featuredPost.excerpt && (
                <p className="text-brand-muted font-body mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              )}

              <div className="flex items-center gap-4 mb-6 text-sm text-brand-muted font-body">
                <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{calcReadTime(featuredPost.bodyText)}</span>
              </div>

              <a
                href={`/blog/${featuredPost.slug}`}
                className="inline-block text-brand-green font-display font-bold hover:text-brand-green-dk transition-colors"
              >
                Read →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="sticky top-14 z-40 bg-white border-b border-brand-border py-4 mb-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => { setActiveFilter(null); setDisplayCount(6); }}
            className={`px-4 py-2 rounded-full font-body text-sm font-semibold transition-colors border ${
              activeFilter === null
                ? "bg-brand-green text-white border-brand-green"
                : "bg-brand-surface text-brand-dark border-brand-border hover:bg-brand-green-lt"
            }`}
          >
            All
          </button>

          <button
            onClick={() => { setActiveFilter("recent"); setDisplayCount(6); }}
            className={`px-4 py-2 rounded-full font-body text-sm font-semibold transition-colors border ${
              activeFilter === "recent"
                ? "bg-brand-green text-white border-brand-green"
                : "bg-brand-surface text-brand-dark border-brand-border hover:bg-brand-green-lt"
            }`}
          >
            Recent (90 days)
          </button>

          {keywords.map((keyword) => (
            <button
              key={keyword}
              onClick={() => { setActiveFilter(keyword); setDisplayCount(6); }}
              className={`px-4 py-2 rounded-full font-body text-sm font-semibold transition-colors border ${
                activeFilter === keyword
                  ? "bg-brand-green text-white border-brand-green"
                  : "bg-brand-surface text-brand-dark border-brand-border hover:bg-brand-green-lt"
              }`}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      {/* Post Grid */}
      {displayedPosts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedPosts.map((post) => (
            <a
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group rounded-card border border-brand-border overflow-hidden hover:border-brand-green transition-colors"
            >
              {/* Card Image */}
              {post.coverImage?.asset ? (
                <img
                  src={urlFor(post.coverImage).width(400).height(200).url()}
                  alt={post.coverImage.alt || post.title}
                  className="w-full h-48 object-cover group-hover:brightness-95 transition-all"
                />
              ) : (
                <div className="w-full h-48 bg-brand-blue-lt flex items-center justify-center text-brand-muted group-hover:bg-brand-blue transition-colors">
                  <div className="text-sm font-body">Image</div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-5">
                {post.keywords?.[0] && (
                  <span className="inline-block bg-brand-green-lt text-brand-green text-xs font-bold px-2 py-1 rounded mb-3 font-display">
                    {post.keywords[0]}
                  </span>
                )}

                <h3 className="text-lg font-display font-bold text-brand-dark mb-3 line-clamp-2 group-hover:text-brand-green transition-colors">
                  {post.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-brand-muted font-body">
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{calcReadTime(post.bodyText)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-brand-muted font-body">No posts found. Add blog posts in the <a href="/studio" className="text-brand-green underline">Sanity Studio</a>.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {displayedPosts.length > 0 && hasMore && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-3">
            <button
              onClick={() => setDisplayCount(20)}
              className="px-6 py-3 bg-brand-green text-white font-display font-bold rounded-card hover:bg-brand-green-dk transition-colors"
            >
              Show more
            </button>
            <button
              onClick={() => setDisplayCount(filteredPosts.length)}
              className="px-6 py-3 bg-brand-blue-lt text-brand-dark font-display font-bold rounded-card hover:bg-brand-blue transition-colors"
            >
              Show all
            </button>
          </div>
          <p className="text-sm text-brand-muted font-body">
            Showing {displayedPosts.length} of {filteredPosts.length} posts
          </p>
        </div>
      )}

      {displayedPosts.length > 0 && !hasMore && (
        <div className="text-center py-8">
          <p className="text-sm text-brand-muted font-body">
            Showing {displayedPosts.length} of {filteredPosts.length} posts
          </p>
        </div>
      )}
    </div>
  );
}
