"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/tours", label: "Tours" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const plans = [
  {
    href: "/plan/tour",
    kicker: "Tour",
    label: "Plan a tour",
    text: "Places, dates, and how you want to travel.",
  },
  {
    href: "/plan/event",
    kicker: "Event",
    label: "Plan an event",
    text: "The room, the guests, and the hour.",
  },
];

function current(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const planRef = useRef<HTMLDivElement>(null);
  const home = pathname === "/";
  const light = home && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPlanOpen(false);
        setMenuOpen(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!planRef.current?.contains(event.target as Node)) setPlanOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    setPlanOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,color,border-color] duration-500 ${
        light ? "border-transparent text-paper" : "border-line/80 bg-paper/95 text-ink backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 md:h-20 md:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Eventures Club, home" onClick={closeMenus}>
          <Image src="/brand/icon.svg" alt="" width={36} height={36} className="h-9 w-9" />
          <span className="display text-[1.65rem] leading-none">eventures</span>
          <span className="mt-1 hidden text-[0.62rem] tracking-[0.22em] sm:inline">CLUB</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Primary">
          {links.slice(0, 2).map((link) => (
            <Link key={link.href} href={link.href} className={`nav-link ${current(pathname, link.href) ? "is-active" : ""}`}>
              {link.label}
            </Link>
          ))}
          <div
            ref={planRef}
            className="relative"
            onMouseEnter={() => setPlanOpen(true)}
            onMouseLeave={() => setPlanOpen(false)}
          >
            <button
              type="button"
              className={`nav-link inline-flex items-center ${pathname.startsWith("/plan") ? "is-active" : ""}`}
              aria-expanded={planOpen}
              aria-haspopup="true"
              onClick={(event) => {
                if (event.detail === 0) setPlanOpen((open) => !open);
                else setPlanOpen(true);
              }}
            >
              Plan
              <span className={`plan-chevron ${planOpen ? "is-open" : ""}`} aria-hidden="true" />
            </button>
            <div className={`plan-menu ${planOpen ? "is-open" : ""}`}>
              <div className="plan-panel" role="menu">
                {plans.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className={`plan-item ${pathname === item.href ? "is-active" : ""}`}
                    onClick={closeMenus}
                  >
                    <span className="kicker">{item.kicker}</span>
                    <span className="mt-2 block text-[0.95rem]">{item.label}</span>
                    <span className="mt-1 block text-sm leading-5 text-ink-soft">{item.text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {links.slice(2).map((link) => (
            <Link key={link.href} href={link.href} className={`nav-link ${current(pathname, link.href) ? "is-active" : ""}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="text-xs uppercase tracking-[0.18em] transition-opacity duration-300 hover:opacity-60 md:hidden"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div className={`mobile-menu md:hidden ${menuOpen ? "is-open" : ""}`} inert={!menuOpen} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <div className="flex flex-col gap-5 px-5 py-8 text-3xl">
            <Link href="/tours" className="display" onClick={closeMenus}>
              Tours
            </Link>
            <Link href="/events" className="display" onClick={closeMenus}>
              Events
            </Link>
            <Link href="/plan/tour" className="display" onClick={closeMenus}>
              Plan a tour
            </Link>
            <Link href="/plan/event" className="display" onClick={closeMenus}>
              Plan an event
            </Link>
            <Link href="/blog" className="display" onClick={closeMenus}>
              Journal
            </Link>
            <Link href="/about" className="display" onClick={closeMenus}>
              About
            </Link>
            <Link href="/contact" className="display" onClick={closeMenus}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
