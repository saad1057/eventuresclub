import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About the club",
  description:
    "Eventures Club is a Lahore desk for events and for northern Pakistan tours. Two kinds of work, written down, with no invented history.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ])}
      />
      <PageHero image="/images/attabad-traveler.jpg" alt="A traveler at Attabad Lake" kicker="About" title="A desk in Lahore for two kinds of leaving." short />
      <section className="page-width grid gap-12 py-14 md:grid-cols-[minmax(0,1fr)_24rem] md:items-start md:py-20">
        <div className="max-w-2xl space-y-5 text-lg leading-8 text-ink-soft">
          <p className="display !text-[1.75rem] !leading-[1.25] tracking-[-0.02em] text-ink">
            Eventures Club plans northern journeys and gatherings from two desks. The head office is at 26 Tip Canal Garden, Lahore. The branch is at 812, I-8/3, Islamabad.
          </p>
          <p>
            Tours are picked up in both cities. The tours have published prices because a road can be described before you are on it. The events do not, because a room depends on the people in it.
          </p>
          <p>
            We do not keep a scoreboard of travellers or a wall of borrowed weddings. If you want a reference, ask, and we will introduce you to someone who has actually been. The site is here to show the work clearly enough that the first email is useful.
          </p>
          <p>
            A tour brief and an event brief stay apart. You can be planning both — a family nikah and the days around it — and we will still keep the questions from collapsing into one form that asks the wrong thing.
          </p>
          <p>
            The reply comes by email, with your own answers repeated, so you can see what left the browser. Payment, when there is any, is on an invoice after you approve a written plan. This website does not take it.
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            <Link href="/plan/event" className="btn btn-solid btn-go">
              Plan an event
            </Link>
            <Link href="/plan/tour" className="btn btn-ghost btn-go">
              Plan a tour
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Write to the desk
            </Link>
          </div>
        </div>
        <Reveal variant="clip">
          <div className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
            <Image src="/images/event-nikah.jpg" alt="A nikah register being signed" fill sizes="(min-width: 768px) 24rem, 100vw" className="object-cover" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
