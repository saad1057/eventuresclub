import Image from "next/image";
import Link from "next/link";
import { EventCard, PostCard, TourCard } from "@/components/cards";
import { DestinationSlider, type Destination } from "@/components/destination-slider";
import { HeroSlider, type HeroSlide } from "@/components/hero-slider";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { getPosts } from "@/lib/blog";
import { getEvent, getEvents } from "@/lib/events";
import { durationLabel, formatPkr } from "@/lib/format";
import { catalogOffers, eventCatalog, graphSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { getTour, getTours } from "@/lib/tours";

const heroSlides: HeroSlide[] = [
  {
    desk: "Events",
    place: "Weddings",
    line: "Mehndi, barat, walima and nikah, with one person holding the timeline.",
    href: "/events/weddings",
    image: "/images/event-stage.jpg",
    alt: "A floral wedding stage under chandeliers",
  },
  {
    desk: "Tours",
    place: "Hunza",
    line: "Karimabad, Attabad and Passu, with the drive counted honestly.",
    href: "/tours/hunza-valley",
    image: "/images/rakaposhi.jpg",
    alt: "Rakaposhi above Hunza Valley",
  },
  {
    desk: "Events",
    place: "Corporate",
    line: "Offsites, dinners and launches, planned as one job rather than a stack of vendors.",
    href: "/events/corporate",
    image: "/images/event-keynote.jpg",
    alt: "A speaker on stage in front of a lit audience",
  },
  {
    desk: "Tours",
    place: "Swat",
    line: "The river road into the valley, and home on the third day.",
    href: "/tours/swat-kalam",
    image: "/images/swat.jpg",
    alt: "Green slopes and a far snow ridge in Swat",
  },
  {
    desk: "Events",
    place: "Celebrations",
    line: "Birthdays, private gatherings, and the custom night that fits no list.",
    href: "/events/custom",
    image: "/images/event-floral-hall.jpg",
    alt: "A hall dressed with a hanging floral installation",
  },
];

const destinationCopy = [
  { slug: "hunza-valley", place: "Hunza", title: "The valley after the long road.", text: "Karimabad, Attabad and Passu, with the drive counted honestly.", image: "/images/rakaposhi.jpg", alt: "Rakaposhi above Hunza Valley" },
  { slug: "swat-kalam", place: "Swat", title: "Green before it is high.", text: "The river road into the valley, and home on the third day.", image: "/images/swat.jpg", alt: "Green slopes and a far snow ridge in Swat" },
  { slug: "naran-kaghan", place: "Naran", title: "A lake at the top of the jeep road.", text: "The Kaghan valley, and Saif-ul-Malook when the track is open.", image: "/images/saif.jpg", alt: "Lake Saif-ul-Malook below snow peaks" },
  { slug: "kumrat-valley", place: "Kumrat", title: "Forest, then the lake.", text: "Deodars, a jeep, and Katora when the day can hold it.", image: "/images/katora.jpg", alt: "Katora Lake in Kumrat Valley" },
  { slug: "chitral-kalash", place: "Chitral", title: "A valley you enter as a guest.", text: "Lowari, Chitral, and unhurried days in the Kalash valleys.", image: "/images/chitral.jpg", alt: "Karambar Lake in Chitral" },
  { slug: "galiyat-nathiagali", place: "Galiyat", title: "Close enough for a weekend.", text: "Nathiagali and the ridge above the plains, when the north has to fit in three days.", image: "/images/pines.jpg", alt: "Pines in front of snow peaks in the hills of Pakistan" },
];

const steps = [
  ["01", "Listen", "A short form, separate for an event and for a tour. You see the brief beside you as you fill it."],
  ["02", "Write", "We email every answer back to you and to the desk. The plan that follows is something you can approve."],
  ["03", "Go", "Nothing is charged on this site. A date is held when the written plan is the one you want."],
];

export default async function HomePage() {
  const allTours = getTours();
  const allEvents = getEvents();
  const tours = ["naran-kaghan", "swat-kalam", "kashmir", "hunza-skardu"]
    .map((slug) => getTour(slug))
    .filter((tour) => tour !== undefined);
  const posts = (await getPosts()).slice(0, 3);

  const destinations: Destination[] = destinationCopy.flatMap((item) => {
    const tour = getTour(item.slug);
    if (!tour) return [];
    return [
      {
        place: item.place,
        title: item.title,
        text: item.text,
        meta: `${durationLabel(tour.days, tour.nights)} · from ${formatPkr(tour.priceFrom)}`,
        href: `/tours/${tour.slug}`,
        image: item.image,
        alt: item.alt,
      },
    ];
  });

  const bento = [
    { slug: "weddings", className: "md:col-span-4 md:row-span-2", sizes: "(min-width: 768px) 66vw, 100vw", large: true },
    { slug: "corporate", className: "md:col-span-2", sizes: "(min-width: 768px) 33vw, 100vw", large: false },
    { slug: "birthday", className: "md:col-span-2", sizes: "(min-width: 768px) 33vw, 100vw", large: false },
    { slug: "government", className: "md:col-span-2", sizes: "(min-width: 768px) 33vw, 100vw", large: false },
    { slug: "custom", className: "md:col-span-2", sizes: "(min-width: 768px) 33vw, 100vw", large: false },
    { slug: "private", className: "md:col-span-2", sizes: "(min-width: 768px) 33vw, 100vw", large: false },
  ].flatMap((item) => {
    const event = getEvent(item.slug);
    return event ? [{ ...item, event }] : [];
  });

  const ticker = [...allEvents.map((event) => event.nav), "Hunza", "Swat", "Naran", "Kumrat", "Chitral", "Kashmir", "Skardu"];

  return (
    <>
      <JsonLd data={graphSchema([{ "@type": "WebSite", name: site.name, url: site.url }, ...catalogOffers(), ...eventCatalog()])} />

      <HeroSlider slides={heroSlides} />

      <div className="marquee bg-forest-deep py-5 text-paper" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex flex-none items-center">
              {ticker.map((word) => (
                <span key={word} className="display flex items-center text-2xl italic">
                  <span className="px-7">{word}</span>
                  <span className="h-1.5 w-1.5 bg-copper-light" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="page-width grid gap-10 py-20 md:grid-cols-[1.25fr_1fr] md:items-end md:py-28">
        <Reveal>
          <p className="kicker">Two desks</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,4.6vw,4.4rem)]">One plans the room. The other plans the road north. Neither borrows the other’s form.</h2>
        </Reveal>
        <Reveal delay={120}>
          <dl className="grid grid-cols-3 gap-4 border-t border-ink pt-5">
            {[
              [String(allEvents.length), "kinds of event"],
              [String(allTours.length), "published routes"],
              [String(site.offices.length), "offices"],
            ].map(([value, label]) => (
              <div key={label}>
                <dd className="display text-5xl md:text-6xl">{value}</dd>
                <dt className="mt-2 text-sm leading-5 text-ink-soft">{label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="page-width pb-20 md:pb-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Events</p>
            <h2 className="display mt-3 text-4xl md:text-6xl">The room itself.</h2>
          </div>
          <Link href="/events" className="link-go text-copper-deep">
            All the events
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-3 md:auto-rows-[19rem] md:grid-cols-6 md:gap-4">
          {bento.map((item, index) => (
            <Reveal key={item.slug} delay={index * 60} className={`grid ${item.className}`}>
              <EventCard event={item.event} sizes={item.sizes} large={item.large} />
            </Reveal>
          ))}
        </div>
      </section>

      <DestinationSlider destinations={destinations} />

      <section className="page-width py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Prices</p>
            <h2 className="display mt-3 text-4xl md:text-6xl">Starting points, not surprises.</h2>
          </div>
          <Link href="/tours" className="link-go text-copper-deep">
            All the routes
          </Link>
        </Reveal>
        <p className="mt-5 max-w-3xl leading-7 text-ink-soft">{site.priceNote}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((tour, index) => (
            <Reveal key={tour.slug} delay={index * 70} className="h-full">
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-forest text-paper">
        <div className="page-width py-20 md:py-28">
          <Reveal>
            <p className="kicker kicker-light">How it works</p>
            <h2 className="display mt-3 max-w-3xl text-4xl md:text-6xl">A brief, a written plan, and then the day.</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map(([index, title, body], position) => (
              <Reveal key={index} delay={position * 90}>
                <div className="border-t border-paper/25 pt-6">
                  <p className="display text-6xl text-copper-light md:text-7xl">{index}</p>
                  <h3 className="display mt-6 text-4xl">{title}</h3>
                  <p className="mt-4 max-w-sm leading-7 text-paper/85">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-width py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Journal</p>
            <h2 className="display mt-3 text-4xl md:text-6xl">Notes from the road and the room.</h2>
          </div>
          <Link href="/blog" className="link-go text-copper-deep">
            Read the journal
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 80} className="h-full">
              <PostCard post={post} sizes="(min-width: 768px) 30vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="desk-pair">
        {[
          { href: "/plan/event", image: "/images/event-floral-hall.jpg", alt: "A hall dressed with a hanging floral installation", kicker: "Event brief", title: "Plan an event", text: "The room, the guests, and the hour." },
          { href: "/plan/tour", image: "/images/hunza-traveler.jpg", alt: "A traveler above Hunza Valley", kicker: "Custom tour", title: "Plan a tour", text: "Places, dates, and how you want to travel." },
        ].map((desk) => (
          <Link key={desk.href} href={desk.href} className="desk group">
            <Image src={desk.image} alt={desk.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="photo-zoom object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/25 to-ink/10" />
            <div className="relative z-10 mt-auto p-6 md:p-10">
              <p className="chip chip-sm">{desk.kicker}</p>
              <h2 className="display text-lift mt-4 text-5xl md:text-7xl">{desk.title}</h2>
              <p className="mt-3 text-paper/90">{desk.text}</p>
              <span className="link-go mt-5 text-paper">Start the brief</span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
