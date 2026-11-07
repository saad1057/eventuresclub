import Link from "next/link";
import { Logo } from "@/components/logo";
import { WhatsAppButton } from "@/components/whatsapp";
import { getEvents } from "@/lib/events";
import { site } from "@/lib/site";
import { getTours } from "@/lib/tours";

const club = [
  { href: "/about", label: "About the club" },
  { href: "/blog", label: "Journal" },
  { href: "/plan/event", label: "Plan an event" },
  { href: "/plan/tour", label: "Plan a tour" },
  { href: "/contact", label: "Contact" },
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="kicker kicker-light">{title}</h2>
      <ul className="mt-5 space-y-2.5 text-[0.95rem]">{children}</ul>
    </div>
  );
}

export function Footer() {
  const events = getEvents();
  const tours = getTours();
  const featured = ["hunza-valley", "swat-kalam", "naran-kaghan", "kashmir", "hunza-skardu"]
    .map((slug) => tours.find((tour) => tour.slug === slug))
    .filter((tour) => tour !== undefined);

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="page-width pt-16 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-paper/15 pb-12 md:pb-16">
          <div className="max-w-xl">
            <Link href="/" aria-label="Eventures Club, home" className="inline-block transition-opacity duration-300 hover:opacity-80">
              <Logo size="lg" />
            </Link>
            <p className="display mt-7 text-[clamp(1.9rem,3.4vw,3rem)]">Tell us the date, the people, and what the hour is for.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/plan/event" className="btn btn-paper btn-go">
              Plan an event
            </Link>
            <Link href="/plan/tour" className="btn btn-light btn-go">
              Plan a tour
            </Link>
            <WhatsAppButton message="Hello Eventures Club. I would like to talk to the desk." label="WhatsApp" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-12 md:py-16 lg:grid-cols-[1fr_1fr_1fr_1.35fr]">
          <Column title="Events">
            {events.map((event) => (
              <li key={event.slug}>
                <Link href={`/events/${event.slug}`} className="footer-link">
                  {event.nav}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Tours">
            {featured.map((tour) => (
              <li key={tour.slug}>
                <Link href={`/tours/${tour.slug}`} className="footer-link">
                  {tour.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tours" className="footer-link text-paper">
                All {tours.length} routes →
              </Link>
            </li>
          </Column>
          <Column title="The club">
            {club.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </Column>
          <div>
            <h2 className="kicker kicker-light">The desks</h2>
            <div className="mt-5 grid gap-6 text-[0.95rem] sm:grid-cols-2 lg:grid-cols-1">
              {site.offices.map((office) => (
                <address key={office.name} className="not-italic leading-6">
                  <span className="block text-sm text-paper/60">{office.name}</span>
                  {office.address}
                </address>
              ))}
              <div className="leading-6">
                <span className="block text-sm text-paper/60">Email</span>
                <a className="underline decoration-paper/30 underline-offset-4 transition-colors duration-300 hover:decoration-paper" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 py-6 text-xs tracking-[0.08em] text-paper/65">
          <p>
            © {new Date().getFullYear()} {site.name}. Pickup from {site.pickups.join(" and ")}.
          </p>
          <div className="flex gap-6 uppercase tracking-[0.14em]">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-paper">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors duration-300 hover:text-paper">
              Terms
            </Link>
          </div>
        </div>
      </div>
      <p className="footer-mark -mb-[0.06em] pl-[1.5vw]" aria-hidden="true">
        eventures
      </p>
    </footer>
  );
}
