import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { getPosts } from "@/lib/blog";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on planning northern Pakistan from Lahore: seasons, roads, Kumrat and Swat, packing, and how a custom brief becomes a trip.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <div className="mx-auto max-w-[88rem] px-5 pb-20 pt-28 md:px-10 md:pt-36">
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
          ]),
        ])}
      />
      <p className="kicker">Journal</p>
      <h1 className="display mt-3 max-w-3xl text-5xl md:text-7xl">Practical notes, written so they can be quoted.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
        Seasons, roads and the difference between a published route and a custom plan. Each piece answers one question in the first lines, then stays with it.
      </p>
      <div className="mt-12 divide-y divide-line border-y border-line">
        {posts.map((post) => (
          <article key={post.slug} className="grid gap-3 py-8 md:grid-cols-[9rem_1fr]">
            <time dateTime={post.date} className="text-sm text-ink-soft">
              {post.date}
            </time>
            <div>
              <h2 className="display text-3xl md:text-4xl">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 max-w-2xl text-ink-soft">{post.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
