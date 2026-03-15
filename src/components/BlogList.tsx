"use client";

import { useState, useMemo } from "react";
import { calculateReadTime } from "@/lib/blogData";
import type { BlogPost } from "@/lib/blogData";

interface BlogListProps {
  posts: BlogPost[];
  keywords: string[];
}

export default function BlogList({ posts, keywords }: BlogListProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(6);

  // Sort posts by date (newest first)
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  }, [posts]);

  // Get featured post (most recent)
  const featuredPost = sortedPosts[0];
  const otherPosts = sortedPosts.slice(1);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (!activeFilter) return otherPosts;

    if (activeFilter === "recent") {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      return otherPosts.filter((post) => new Date(post.date) >= ninetyDaysAgo);
    }

    return otherPosts.filter((post) => post.keywords.includes(activeFilter));
  }, [activeFilter, otherPosts]);

  // Get displayed posts with pagination
  const displayedPosts = filteredPosts.slice(0, displayCount);
  const hasMore = displayCount < filteredPosts.length;

  const handleShowMore = () => {
    setDisplayCount(20);
  };

  const handleShowAll = () => {
    setDisplayCount(filteredPosts.length);
  };

  return (
    <div className="w-full">
      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-12">
          <span className="section-label">Featured</span>
          <div className="grid sm:grid-cols-[auto_1fr] gap-0 border border-brand-green rounded-card overflow-hidden">
            {/* Featured Image Placeholder */}
            <div className="w-full sm:w-80 h-64 sm:h-80 bg-brand-green-lt flex items-center justify-center text-brand-muted">
              <div className="text-center">
                <div className="text-sm font-body">Image</div>
              </div>
            </div>

            {/* Featured Content */}
            <div className="p-8 flex flex-col justify-between bg-white">
              {/* Category Badge */}
              {featuredPost.keywords[0] && (
                <div className="inline-block w-fit mb-4">
                  <span className="inline-block bg-brand-green-lt text-brand-green text-xs font-bold px-3 py-1 rounded-full font-display">
                    {featuredPost.keywords[0]}
                  </span>
                </div>
              )}

              {/* Title */}
              <h2 className="text-3xl font-display font-bold text-brand-dark mb-4 leading-tight">
                {featuredPost.title}
              </h2>

              {/* Excerpt */}
              <p className="text-brand-muted font-body mb-6 line-clamp-3">
                {featuredPost.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-6 text-sm text-brand-muted font-body">
                <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{calculateReadTime(featuredPost)}</span>
              </div>

              {/* Read Link */}
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

      {/* Filter Bar - Sticky */}
      <div className="sticky top-14 z-40 bg-white border-b border-brand-border py-4 mb-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-4 py-2 rounded-full font-body text-sm font-semibold transition-colors border ${
              activeFilter === null
                ? "bg-brand-green text-white border-brand-green"
                : "bg-brand-surface text-brand-dark border-brand-border hover:bg-brand-green-lt"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setActiveFilter("recent")}
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
              onClick={() => setActiveFilter(keyword)}
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
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-card border border-brand-border overflow-hidden hover:border-brand-green transition-colors"
            >
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-brand-blue-lt flex items-center justify-center text-brand-muted group-hover:bg-brand-blue transition-colors">
                <div className="text-sm font-body">Image</div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                {/* Category Badge */}
                {post.keywords[0] && (
                  <span className="inline-block bg-brand-green-lt text-brand-green text-xs font-bold px-2 py-1 rounded mb-3 font-display">
                    {post.keywords[0]}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-lg font-display font-bold text-brand-dark mb-3 line-clamp-2 group-hover:text-brand-green transition-colors">
                  {post.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-brand-muted font-body">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{calculateReadTime(post)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-brand-muted font-body">No posts found.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {displayedPosts.length > 0 && hasMore && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-3">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 bg-brand-green text-white font-display font-bold rounded-card hover:bg-brand-green-dk transition-colors"
            >
              Show more
            </button>
            <button
              onClick={handleShowAll}
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

      {/* All posts shown indicator */}
      {displayedPosts.length > 0 && !hasMore && displayedPosts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-brand-muted font-body">
            Showing {displayedPosts.length} of {filteredPosts.length} posts
          </p>
        </div>
      )}
    </div>
  );
}
