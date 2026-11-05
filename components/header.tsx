"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/tours", label: "Tours" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const home = pathname === "/";
  const light = home && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        light ? "text-paper" : "bg-paper/95 text-ink backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 md:h-20 md:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Eventures Club, home">
          <Image src="/brand/icon.svg" alt="" width={36} height={36} className="h-9 w-9" />
          <span className="display text-[1.65rem] leading-none">eventures</span>
          <span className="mt-1 hidden text-[0.62rem] tracking-[0.22em] sm:inline">CLUB</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Primary">
          {links.slice(0, 2).map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-copper">
              {link.label}
            </Link>
          ))}
          <div className="group relative">
            <Link href="/plan/tour" className="hover:text-copper">
              Plan
            </Link>
            <div className="invisible absolute left-1/2 top-full w-44 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="border border-line bg-paper p-2 text-ink shadow-none">
                <Link href="/plan/tour" className="block px-3 py-2 hover:bg-paper-deep">
                  Plan a tour
                </Link>
                <Link href="/plan/event" className="block px-3 py-2 hover:bg-paper-deep">
                  Plan an event
                </Link>
              </div>
            </div>
          </div>
          {links.slice(2).map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-copper">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="text-xs uppercase tracking-[0.18em] md:hidden"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-paper px-5 py-8 text-ink md:hidden">
          <div className="flex flex-col gap-5 text-3xl">
            <Link href="/tours" className="display" onClick={close}>
              Tours
            </Link>
            <Link href="/events" className="display" onClick={close}>
              Events
            </Link>
            <Link href="/plan/tour" className="display" onClick={close}>
              Plan a tour
            </Link>
            <Link href="/plan/event" className="display" onClick={close}>
              Plan an event
            </Link>
            <Link href="/blog" className="display" onClick={close}>
              Journal
            </Link>
            <Link href="/about" className="display" onClick={close}>
              About
            </Link>
            <Link href="/contact" className="display" onClick={close}>
              Contact
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
