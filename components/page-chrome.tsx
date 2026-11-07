"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

/** Fades the footer with each page change, so it never pops into its new position. */
export function FooterTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="chrome-in" exit="chrome-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
