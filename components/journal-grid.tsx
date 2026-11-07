"use client";

import { PostCard } from "@/components/cards";
import { FilterTabs, useSwap } from "@/components/filter-tabs";
import type { PostMeta } from "@/lib/blog";

export function JournalGrid({ posts }: { posts: PostMeta[] }) {
  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  const { picked, shown, leaving, pick } = useSwap("All");
  const visible = shown === "All" ? posts : posts.filter((post) => post.category === shown);
  const counts = Object.fromEntries(
    categories.map((item) => [item, item === "All" ? posts.length : posts.filter((post) => post.category === item).length]),
  );

  return (
    <div>
      <FilterTabs label="Filter the journal" options={categories} value={picked} onChange={pick} counts={counts} />
      <div className={`swap mt-12 ${leaving ? "is-leaving" : ""}`}>
        <div key={shown} className="stagger-in grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post, index) => (
            <div key={post.slug} style={{ "--i": index } as React.CSSProperties}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
