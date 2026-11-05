"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { ViewTransition } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return (
    <ViewTransition name="page" share="page-fade" default="none">
      <div key={pathname}>{children}</div>
    </ViewTransition>
  );
}
