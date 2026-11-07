"use client";

import Image from "next/image";
import Link from "next/link";
import { SliderIcon, useSlider } from "@/components/use-slider";

export type HeroSlide = {
  desk: "Events" | "Tours";
  place: string;
  line: string;
  href: string;
  image: string;
  alt: string;
};

const SLIDE_MS = 6500;

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const { root, slider } = useSlider<HTMLElement>(slides.length);
  const current = slides[slider.index]!;

  return (
    <section
      ref={root}
      data-dark-hero
      aria-roledescription="carousel"
      aria-label="What Eventures Club plans"
      className="relative flex min-h-[100svh] touch-pan-y flex-col justify-end overflow-hidden bg-ink text-paper"
      {...slider.surface}
    >
      {slides.map((slide, index) => (
        <div key={slide.place} className={`hero-frame ${index === slider.index ? "is-active" : ""}`} aria-hidden={index !== slider.index}>
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="scrim" />

      <div className="page-width relative z-10 pb-6 pt-32 md:pb-8">
        <p className="chip rise">Lahore · Islamabad</p>
        <h1
          className="display text-lift rise mt-5 max-w-5xl text-[clamp(2.7rem,5.6vw,5.5rem)]"
          style={{ "--delay": "90ms" } as React.CSSProperties}
        >
          Weddings, events and northern tours, planned from Lahore.
        </h1>
        <div
          className="rise mt-6 flex flex-wrap items-center gap-3"
          style={{ "--delay": "180ms" } as React.CSSProperties}
        >
          <Link href="/events" className="btn btn-paper btn-go">
            Explore events
          </Link>
          <Link href="/tours" className="btn btn-light btn-go">
            Explore tours
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-5 md:mt-14" aria-live={slider.held ? "polite" : "off"}>
          <Link key={current.place} href={current.href} className="group rise block max-w-xl">
            <span className="chip chip-sm">
              {current.desk} · {current.place}
            </span>
            <span className="text-lift mt-3 block text-[1.05rem] leading-7 text-paper">
              {current.line} <span className="link-go ml-1 inline-flex align-baseline text-paper">View</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="slide-arrow"
              aria-label={slider.userPaused ? "Play slideshow" : "Pause slideshow"}
              onClick={slider.togglePaused}
            >
              <SliderIcon name={slider.userPaused ? "play" : "pause"} />
            </button>
            <button type="button" className="slide-arrow" aria-label="Previous slide" onClick={slider.prev}>
              <SliderIcon name="prev" />
            </button>
            <button type="button" className="slide-arrow" aria-label="Next slide" onClick={slider.next}>
              <SliderIcon name="next" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-2 md:gap-4" style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}>
          {slides.map((slide, index) => {
            const active = index === slider.index;
            return (
              <button
                key={slide.place}
                type="button"
                className={`slide-tab ${active ? "is-active" : ""}`}
                aria-label={`Show ${slide.place}`}
                aria-current={active}
                onClick={() => slider.go(index, index > slider.index ? 1 : -1)}
              >
                <span className="slide-tab-track">
                  {active ? (
                    <span
                      key={slider.index}
                      className={`slide-tab-fill ${slider.held ? "is-held" : ""}`}
                      style={{ "--slide-ms": `${SLIDE_MS}ms` } as React.CSSProperties}
                      onAnimationEnd={slider.next}
                    />
                  ) : null}
                </span>
                <span className="hidden text-[0.68rem] uppercase tracking-[0.18em] text-paper/70 md:block">{slide.desk}</span>
                <span className="mt-1 hidden text-sm md:block">{slide.place}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
