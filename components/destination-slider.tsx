"use client";

import Image from "next/image";
import Link from "next/link";
import { SliderIcon, useSlider } from "@/components/use-slider";

export type Destination = {
  place: string;
  title: string;
  text: string;
  meta: string;
  href: string;
  image: string;
  alt: string;
};

const SLIDE_MS = 6000;

export function DestinationSlider({ destinations }: { destinations: Destination[] }) {
  const { root, slider } = useSlider<HTMLElement>(destinations.length);
  const current = destinations[slider.index]!;
  const position = String(slider.index + 1).padStart(2, "0");
  const total = String(destinations.length).padStart(2, "0");

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label="Northern destinations"
      className="relative touch-pan-y overflow-hidden bg-ink text-paper"
      {...slider.surface}
    >
      {destinations.map((destination, index) => (
        <div
          key={destination.place}
          className={`dest-frame dir-${slider.direction} ${index === slider.index ? "is-active" : ""} ${
            index === slider.previous ? "is-under" : ""
          } ${slider.previous === -1 ? "is-first" : ""}`}
          aria-hidden={index !== slider.index}
        >
          <Image src={destination.image} alt={destination.alt} fill sizes="100vw" className="object-cover" />
        </div>
      ))}
      <div className="scrim z-[3]" />

      <div className="page-width relative z-[4] flex min-h-[92svh] flex-col justify-end pb-8 pt-20 md:min-h-[46rem] md:pb-10">
        <p className="kicker kicker-light mb-auto">The road north</p>

        <div key={current.place} className="max-w-3xl">
          <p className="chip rise">
            {position} · {current.place}
          </p>
          <h2 className="display text-lift rise mt-4 text-[clamp(2.7rem,6.2vw,5.6rem)]" style={{ "--delay": "70ms" } as React.CSSProperties}>
            {current.title}
          </h2>
          <p className="text-lift rise mt-4 max-w-xl text-lg leading-8 text-paper" style={{ "--delay": "140ms" } as React.CSSProperties}>
            {current.text}
          </p>
          <div className="rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ "--delay": "210ms" } as React.CSSProperties}>
            <Link href={current.href} className="btn btn-paper btn-go">
              Open the route
            </Link>
            <p className="text-sm text-paper">{current.meta}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 md:mt-10">
          <p className="text-sm tabular-nums text-paper">
            <span className="display text-3xl">{position}</span>
            <span className="ml-2 text-paper/70">/ {total}</span>
          </p>
          <div className="flex items-center gap-2">
            <button type="button" className="slide-arrow" aria-label="Previous destination" onClick={slider.prev}>
              <SliderIcon name="prev" />
            </button>
            <button type="button" className="slide-arrow" aria-label="Next destination" onClick={slider.next}>
              <SliderIcon name="next" />
            </button>
          </div>
        </div>

        <div
          className="mt-5 grid gap-2 md:gap-3"
          style={{ gridTemplateColumns: `repeat(${destinations.length}, minmax(0, 1fr))` }}
        >
          {destinations.map((destination, index) => {
            const active = index === slider.index;
            return (
              <button
                key={destination.place}
                type="button"
                className={`dest-thumb ${active ? "is-active" : ""}`}
                aria-label={`Show ${destination.place}`}
                aria-current={active}
                onClick={() => slider.go(index, index > slider.index ? 1 : -1)}
              >
                <span className="relative block aspect-[5/2] bg-ink max-md:aspect-[4/3]">
                  <Image src={destination.image} alt="" fill sizes="(min-width: 768px) 16vw, 18vw" className="object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/85 to-ink/5" />
                  <span className="absolute inset-x-3 bottom-2 hidden truncate text-sm font-medium tracking-wide text-paper md:block">
                    {destination.place}
                  </span>
                </span>
                <span className="slide-tab-track !top-auto !bottom-0 !bg-transparent">
                  {active ? (
                    <span
                      key={slider.index}
                      className={`slide-tab-fill ${slider.held ? "is-held" : ""}`}
                      style={{ "--slide-ms": `${SLIDE_MS}ms` } as React.CSSProperties}
                      onAnimationEnd={slider.next}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
