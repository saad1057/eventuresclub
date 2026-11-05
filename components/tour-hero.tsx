"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function TourHero({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);

  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        media.current,
        { yPercent: -6 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative h-[78vh] min-h-[520px] overflow-hidden bg-ink text-paper">
      <div ref={media} className="absolute inset-x-0 -top-[8%] h-[116%]">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/25" />
    </div>
  );
}
