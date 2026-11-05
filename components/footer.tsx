import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <p className="display text-5xl">eventures</p>
          <p className="mt-3 text-xs tracking-[0.22em]">CLUB · LAHORE · ISLAMABAD</p>
          <p className="mt-6 max-w-sm text-sm leading-7 text-ink-soft">
            Northern tours and events, planned from Lahore and Islamabad.
          </p>
        </div>
        <div className="text-sm leading-8">
          <p className="kicker mb-3">Visit</p>
          <Link href="/tours" className="block hover:text-copper">
            Tours
          </Link>
          <Link href="/events" className="block hover:text-copper">
            Events
          </Link>
          <Link href="/plan/tour" className="block hover:text-copper">
            Plan a tour
          </Link>
          <Link href="/plan/event" className="block hover:text-copper">
            Plan an event
          </Link>
          <Link href="/blog" className="block hover:text-copper">
            Journal
          </Link>
        </div>
        <div className="text-sm leading-8">
          <p className="kicker mb-3">Desk</p>
          {site.offices.map((office) => (
            <p key={office.name}>
              <span className="text-ink-soft">{office.name}</span>
              <br />
              {office.address}
            </p>
          ))}
          <p className="mt-3 text-ink-soft">Pickup · {site.pickups.join(" and ")}</p>
          <a className="link-quiet" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <Link href="/about" className="block hover:text-copper">
            About
          </Link>
          <Link href="/contact" className="block hover:text-copper">
            Contact
          </Link>
          <div className="mt-4 flex gap-4 text-xs tracking-[0.14em] uppercase text-ink-soft">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
