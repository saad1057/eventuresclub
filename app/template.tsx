"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, ViewTransition } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return (
    <ViewTransition key={pathname} enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
