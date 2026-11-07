"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** A thin line at the top of the window that answers a click straight away. */
export function RouteProgress() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest?.("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      const node = bar.current;
      if (!node) return;
      node.classList.remove("is-done");
      void node.offsetWidth;
      node.classList.add("is-running");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const node = bar.current;
    if (!node) return;
    node.classList.remove("is-running");
    node.classList.add("is-done");
  }, [pathname]);

  return <div ref={bar} className="route-progress" aria-hidden="true" />;
}
