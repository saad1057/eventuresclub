import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graphSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About the club",
  description:
    "Eventures Club is a Lahore desk for northern Pakistan tours and for events. Two kinds of work, written down, with no invented history.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 pb-20 pt-28 md:px-10 md:pt-36">
      <JsonLd
        data={graphSchema([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ])}
      />
      <p className="kicker">About</p>
      <h1 className="display mt-3 max-w-4xl text-5xl md:text-7xl">A desk in Lahore for two kinds of leaving.</h1>
      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
        <div className="max-w-2xl space-y-5 text-lg leading-8 text-ink-soft">
          <p>
            Eventures Club plans northern journeys and private gatherings from Lahore. The tours have published prices because a road can be described before you are on it. The events do not, because a room depends on the people in it.
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
          <p>
            <Link href="/contact" className="link-quiet">
              Write to the desk
            </Link>{" "}
            or start with{" "}
            <Link href="/plan/tour" className="link-quiet">
              a tour
            </Link>{" "}
            or{" "}
            <Link href="/plan/event" className="link-quiet">
              an event
            </Link>
            .
          </p>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
          <Image src="/images/attabad-traveler.jpg" alt="A traveler at Attabad Lake" fill sizes="320px" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
