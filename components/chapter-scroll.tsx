"use client";

import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type Chapter = {
  kicker: string;
  title: string;
  text: string;
  href: string;
  image: string;
  alt: string;
};

export function ChapterScroll({ chapters }: { chapters: Chapter[] }) {
  const root = useRef<HTMLElement>(null);
  const [reduce, setReduce] = useState(false);

  useLenis(() => {
    if (reduce) return;
    ScrollTrigger.update();
  }, [reduce]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      gsap.set(panels, { autoAlpha: 0 });
      if (panels[0]) gsap.set(panels[0], { autoAlpha: 1 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
        },
      });
      panels.forEach((panel, index) => {
        if (index === 0) return;
        timeline
          .to(panels[index - 1], { autoAlpha: 0, duration: 0.45 }, index)
          .to(panel, { autoAlpha: 1, duration: 0.45 }, index);
      });
    }, root);
    return () => ctx.revert();
  }, [reduce, chapters.length]);

  if (reduce) {
    return (
      <div>
        {chapters.map((chapter) => (
          <ChapterFrame key={chapter.title} chapter={chapter} />
        ))}
      </div>
    );
  }

  return (
    <section ref={root} className="relative bg-ink" style={{ height: `${chapters.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {chapters.map((chapter, index) => (
          <article key={chapter.title} data-panel className="absolute inset-0">
            <ChapterFrame chapter={chapter} index={index} overlay />
          </article>
        ))}
      </div>
    </section>
  );
}

function ChapterFrame({
  chapter,
  index = 0,
  overlay = false,
}: {
  chapter: Chapter;
  index?: number;
  overlay?: boolean;
}) {
  return (
    <div className={`relative ${overlay ? "h-full" : "h-screen"} overflow-hidden text-paper`}>
      <Image
        src={chapter.image}
        alt={chapter.alt}
        fill
        priority={index === 0}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-ink/30" />
      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-16 md:px-10 md:pb-24">
        <p className="kicker">
          0{index + 1} · {chapter.kicker}
        </p>
        <h2 className="display mt-4 max-w-5xl text-6xl md:text-8xl">{chapter.title}</h2>
        <p className="mt-5 max-w-md text-base leading-7 text-paper/90">{chapter.text}</p>
        <Link href={chapter.href} className="btn btn-light mt-8 w-fit">
          Open the route
        </Link>
      </div>
    </div>
  );
}
