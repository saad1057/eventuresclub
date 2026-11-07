import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { JsonLd } from "@/components/json-ld";
import { JournalGrid } from "@/components/journal-grid";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton } from "@/components/whatsapp";
import { getPosts } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on planning northern Pakistan and events from Lahore: seasons, roads, Kumrat and Swat, packing, a nikah in the hills, and how a custom brief becomes a plan.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [featured, ...rest] = await getPosts();
  if (!featured) return null;

  return (
    <>
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
          ]),
        ])}
      />

      <section data-dark-hero className="group relative flex min-h-[88svh] items-end overflow-hidden bg-ink text-paper">
        <ViewTransition name={`post-${featured.slug}`} share="post-photo" default="none">
          <div className="absolute inset-0">
            <Image src={featured.image} alt={featured.imageAlt} fill priority sizes="100vw" className="photo-zoom object-cover" />
          </div>
        </ViewTransition>
        <div className="scrim" />
        <div className="page-width relative z-10 pb-12 pt-32 md:pb-16">
          <h1 className="chip rise">The Journal</h1>
          <p className="kicker kicker-light rise mt-7" style={{ "--delay": "60ms" } as React.CSSProperties}>
            Latest · {featured.category}
          </p>
          <h2
            className="display text-lift rise mt-3 max-w-5xl text-[clamp(2.7rem,6.4vw,6rem)]"
            style={{ "--delay": "110ms" } as React.CSSProperties}
          >
            <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
              {featured.title}
            </Link>
          </h2>
          <p className="rise mt-5 max-w-2xl text-lg leading-8 text-paper/90" style={{ "--delay": "170ms" } as React.CSSProperties}>
            {featured.description}
          </p>
          <div className="rise mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-paper/85" style={{ "--delay": "230ms" } as React.CSSProperties}>
            <span className="btn btn-paper btn-go pointer-events-none">Read the story</span>
            <span>
              <time dateTime={featured.date}>{formatDate(featured.date)}</time> · {featured.minutes} min read
            </span>
          </div>
        </div>
      </section>

      <section className="page-width py-16 md:py-24">
        <Reveal className="mb-10 grid gap-5 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div>
            <p className="kicker">Every note</p>
            <h2 className="display mt-3 text-4xl md:text-6xl">Practical notes, written so they can be quoted.</h2>
          </div>
          <p className="max-w-xl leading-7 text-ink-soft">
            Seasons, roads and rooms, and the difference between a published route and a custom plan. Each piece answers one question in the first lines, then stays with it.
          </p>
        </Reveal>
        <JournalGrid posts={rest} />
      </section>

      <section className="bg-forest-deep text-paper">
        <div className="page-width flex flex-wrap items-center justify-between gap-8 py-14 md:py-20">
          <div className="max-w-2xl">
            <p className="kicker kicker-light">Your question</p>
            <h2 className="display mt-3 text-4xl md:text-5xl">Not answered here? The desk will answer it.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton message="Hello Eventures Club. I was reading your journal and have a question." className="!border-paper/30" />
            <Link href="/contact" className="btn btn-light btn-go">
              Write to the desk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
