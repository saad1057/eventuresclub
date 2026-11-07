import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { durationLabel, formatDate, formatPkr } from "@/lib/format";
import type { PostMeta } from "@/lib/blog";
import type { ClubEvent } from "@/lib/events";
import type { Tour } from "@/lib/tours";

export function EventCard({
  event,
  className = "",
  sizes = "(min-width: 768px) 33vw, 100vw",
  large = false,
}: {
  event: ClubEvent;
  className?: string;
  sizes?: string;
  large?: boolean;
}) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group relative flex min-h-[20rem] flex-col justify-end overflow-hidden bg-ink p-6 text-paper md:p-7 ${className}`}
    >
      <Image src={event.image} alt={event.imageAlt} fill sizes={sizes} className="photo-zoom object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/5" />
      <div className="relative z-10">
        <p className="chip chip-sm">{event.nav}</p>
        <h3 className={`display text-lift mt-3 ${large ? "text-5xl md:text-6xl" : "text-[2.3rem]"}`}>{event.title}</h3>
        <p className={`mt-3 text-sm leading-6 text-paper/90 ${large ? "line-clamp-3 max-w-xl" : "line-clamp-2"}`}>{event.summary}</p>
        <span className="link-go mt-4 text-paper">Read more</span>
      </div>
    </Link>
  );
}

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-line bg-[rgb(255_253_249/0.6)] transition-[box-shadow,transform] duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-34px_rgb(26_23_20/0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
        <Image
          src={tour.image}
          alt={tour.imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="photo-zoom object-cover"
        />
        <p className="chip chip-sm absolute left-4 top-4">{tour.region}</p>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-copper-deep">{durationLabel(tour.days, tour.nights)}</p>
        <h3 className="display mt-2 text-[2rem]">
          <Link href={`/tours/${tour.slug}`} className="after:absolute after:inset-0">
            {tour.title}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <p className="text-sm leading-5">
            {tour.couplePrice ? (
              <>
                <span className="block text-lg font-medium">{formatPkr(tour.priceFrom)}</span>
                <span className="text-ink-soft">sharing · {formatPkr(tour.couplePrice)} couple</span>
              </>
            ) : (
              <>
                <span className="block text-ink-soft">From</span>
                <span className="block text-lg font-medium">{formatPkr(tour.priceFrom)}</span>
              </>
            )}
          </p>
          <span className="link-go flex-none text-copper-deep">View</span>
        </div>
      </div>
    </article>
  );
}

/** Shared by the journal and home: the photograph travels into the article when opened. */
export function PostCard({ post, sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" }: { post: PostMeta; sizes?: string }) {
  return (
    <article className="group relative flex h-full flex-col">
      <ViewTransition name={`post-${post.slug}`} share="post-photo" default="none">
        <div className="relative aspect-[3/2] overflow-hidden bg-paper-deep">
          <Image src={post.image} alt={post.imageAlt} fill sizes={sizes} className="photo-zoom object-cover" />
        </div>
      </ViewTransition>
      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.16em] text-copper-deep">
        <span>{post.category}</span>
        <span aria-hidden="true" className="h-px w-5 bg-copper" />
        <span className="text-ink-soft">{post.minutes} min read</span>
      </p>
      <h3 className="display mt-3 text-[1.9rem] leading-[1.04] md:text-[2.15rem]">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 text-[0.95rem] leading-7 text-ink-soft">{post.description}</p>
      <p className="mt-auto flex items-center justify-between gap-4 pt-5">
        <time dateTime={post.date} className="text-sm text-ink-soft">
          {formatDate(post.date)}
        </time>
        <span className="link-go text-copper-deep">Read</span>
      </p>
    </article>
  );
}
