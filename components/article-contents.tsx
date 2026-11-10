"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog";

/** "On this page" list. Marks the section being read and links straight to each heading. */
export function ArticleContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const targets = headings.map((heading) => document.getElementById(heading.id)).filter((node): node is HTMLElement => Boolean(node));
    if (targets.length === 0) return;
    let frame = 0;
    // The current section is the last heading that has scrolled past the top third of the screen.
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = targets[0].id;
      for (const node of targets) {
        if (node.getBoundingClientRect().top <= line) current = node.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="On this page" className="toc">
      <p className="field-label">On this page</p>
      <ol className="mt-3 space-y-0.5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} aria-current={active === heading.id ? "location" : undefined} className="toc-link">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
