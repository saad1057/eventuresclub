import Image from "next/image";
import Link from "next/link";
import { ChapterScroll } from "@/components/chapter-scroll";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { durationLabel, formatPkr } from "@/lib/format";
import { getPosts } from "@/lib/blog";
import { catalogOffers, eventCatalog, graphSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getTours } from "@/lib/tours";

const chapters = [
  {
    kicker: "Hunza",
    title: "The valley after the long road.",
    text: "Karimabad, Attabad and Passu. Five days from Lahore, with the drive counted honestly.",
    href: "/tours/hunza-valley",
    image: "/images/rakaposhi.jpg",
    alt: "Rakaposhi above Hunza Valley",
  },
  {
    kicker: "Swat",
    title: "Green before it is high.",
    text: "The river road into the valley, and home on the third day.",
    href: "/tours/swat-kalam",
    image: "/images/swat.jpg",
    alt: "Green slopes and a far snow ridge in Swat",
  },
  {
    kicker: "Kumrat",
    title: "Forest, then the lake.",
    text: "Deodars, a jeep, and Katora when the day can hold it.",
    href: "/tours/kumrat-valley",
    image: "/images/katora.jpg",
    alt: "Katora Lake in Kumrat Valley",
  },
  {
    kicker: "Chitral",
    title: "A valley you enter as a guest.",
    text: "Lowari, Chitral, and unhurried days in the Kalash valleys.",
    href: "/tours/chitral-kalash",
    image: "/images/chitral.jpg",
    alt: "Karambar Lake in Chitral",
  },
  {
    kicker: "Galiyat",
    title: "Close enough for a weekend.",
    text: "Nathiagali and the ridge above Lahore, when the north has to fit in three days.",
    href: "/tours/galiyat-nathiagali",
    image: "/images/pines.jpg",
    alt: "Pines in front of snow peaks in the hills of Pakistan",
  },
];

export default async function HomePage() {
  const tours = ["naran-kaghan", "swat-kalam", "kashmir", "hunza-skardu"]
    .map((slug) => getTours().find((tour) => tour.slug === slug))
    .filter((tour) => tour !== undefined);
  const posts = (await getPosts()).slice(0, 3);

  return (
    <>
      <JsonLd data={graphSchema([{ "@type": "WebSite", name: site.name, url: site.url }, ...catalogOffers(), ...eventCatalog()])} />
      <section className="relative flex min-h-screen items-end bg-ink text-paper">
        <Image
          src="/images/passu.jpg"
          alt="The Passu peaks above the Hunza river"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
        <div className="relative z-10 mx-auto w-full max-w-[88rem] px-5 pb-16 pt-32 md:px-10 md:pb-24">
          <p className="kicker">Lahore</p>
          <h1 className="display mt-4 max-w-5xl text-[clamp(3.1rem,6.4vw,6.15rem)]">
            Northern tours and events, planned from Lahore.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-paper/90">
            Two desks. One plans the road north. The other plans the room. Neither borrows the other’s form.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tours" className="btn btn-light">
              See the tours
            </Link>
            <Link href="/events" className="btn btn-light">
              See the events
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[88rem] gap-px bg-line px-5 py-16 md:grid-cols-2 md:px-10">
        <Link href="/tours" className="group relative min-h-[420px] overflow-hidden bg-ink text-paper">
          <Image src="/images/attabad.jpg" alt="Attabad Lake in Hunza" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-ink/10" />
          <div className="relative z-10 flex h-full flex-col justify-end p-8">
            <p className="kicker">Tours</p>
            <h2 className="display mt-3 text-5xl">The road north</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-paper/85">Nine published routes, with prices you can read before you write.</p>
          </div>
        </Link>
        <Link href="/events" className="group relative min-h-[420px] overflow-hidden bg-ink text-paper">
          <Image src="/images/event-gathering.jpg" alt="Tables prepared for a celebration" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-ink/10" />
          <div className="relative z-10 flex h-full flex-col justify-end p-8">
            <p className="kicker">Events</p>
            <h2 className="display mt-3 text-5xl">The room itself</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-paper/85">Weddings, birthdays, corporate, custom, and government office events.</p>
          </div>
        </Link>
      </section>

      <ChapterScroll chapters={chapters} />

      <section className="mx-auto max-w-[88rem] px-5 py-20 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="kicker">Prices</p>
            <h2 className="display mt-3 text-4xl md:text-6xl">Starting points, not surprises.</h2>
          </div>
          <Link href="/tours" className="link-quiet hidden text-sm md:inline">
            All the routes
          </Link>
        </div>
        <p className="mt-5 max-w-2xl text-ink-soft">{site.priceNote}</p>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {tours.map((tour) => (
            <Link key={tour.slug} href={`/tours/${tour.slug}`} className="list-row grid gap-2 px-3 py-5 md:grid-cols-[1fr_auto_auto] md:items-baseline">
              <span className="display text-3xl">{tour.title}</span>
              <span className="text-sm text-ink-soft">{durationLabel(tour.days, tour.nights)}</span>
              <span className="text-sm">
                {tour.couplePrice ? (
                  <>
                    {formatPkr(tour.priceFrom)} sharing
                    <span className="mt-1 block text-ink-soft">{formatPkr(tour.couplePrice)} couple</span>
                  </>
                ) : (
                  <>from {formatPkr(tour.priceFrom)}</>
                )}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-forest text-paper">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-20 md:grid-cols-3 md:px-10">
          {[
            ["01", "Listen", "A short form, separate for a tour and for an event. You see the brief beside you as you fill it."],
            ["02", "Write", "We email every answer back to you and to the desk. The plan that follows is something you can approve."],
            ["03", "Go", "Nothing is charged on this site. A date is held when the written plan is the one you want."],
          ].map(([index, title, body]) => (
            <div key={index}>
              <p className="kicker">{index}</p>
              <h2 className="display mt-3 text-4xl">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-paper/80">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 py-20 md:px-10">
        <p className="kicker">Journal</p>
        <h2 className="display mt-3 text-4xl md:text-6xl">Notes from the road and the room.</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="list-row grid gap-2 px-3 py-6 md:grid-cols-[8rem_1fr]">
              <time className="text-sm text-ink-soft" dateTime={post.date}>
                {post.date}
              </time>
              <span>
                <span className="display block text-3xl">{post.title}</span>
                <span className="mt-2 block max-w-2xl text-sm text-ink-soft">{post.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <Reveal>
          <div className="relative min-h-[420px]">
            <Image src="/images/hunza-traveler.jpg" alt="A traveler above Hunza Valley" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/45" />
            <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[88rem] flex-col justify-end px-5 py-16 text-paper md:px-10">
              <h2 className="display max-w-3xl text-5xl md:text-7xl">Tell us which one you are planning.</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/plan/tour" className="btn btn-light">Plan a tour</Link>
                <Link href="/plan/event" className="btn btn-light">Plan an event</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
