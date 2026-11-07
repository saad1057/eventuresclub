"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, whatsappLink } from "@/lib/site";

export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.2-3.6.94.96-3.5-.23-.36a9.46 9.46 0 0 1-1.46-5.05c0-5.25 4.28-9.52 9.54-9.52 2.55 0 4.94.99 6.74 2.8a9.45 9.45 0 0 1 2.79 6.73c0 5.25-4.28 9.5-9.54 9.5Zm8.13-17.63A11.4 11.4 0 0 0 12.05.5C5.71.5.55 5.65.55 11.98c0 2.03.53 4 1.53 5.74L.45 23.5l5.92-1.55a11.47 11.47 0 0 0 5.67 1.45h.01c6.34 0 11.5-5.15 11.5-11.48 0-3.07-1.2-5.95-3.37-8.05Z" />
    </svg>
  );
}

const options = [
  { label: "Plan an event", note: "A wedding, an office, a birthday", message: "Hello Eventures Club. I would like to plan an event." },
  { label: "Plan a tour", note: "A route north, or a custom trip", message: "Hello Eventures Club. I would like to plan a northern tour." },
  { label: "Ask the desk", note: "Anything that is not quite either", message: "Hello Eventures Club. I have a question." },
];

function pageSubject(pathname: string) {
  const isDetail = /^\/(tours|events)\/[^/]+$/.test(pathname);
  if (!isDetail || typeof document === "undefined") return null;
  return document.title.split("—")[0]?.replace(/ from Lahore( or Islamabad)?$/, "").trim() || null;
}

/** The floating desk: one quiet button, opening a short menu of pre-written notes. */
export function WhatsAppDesk() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  if (!whatsappLink("")) return null;

  const rows = subject
    ? [
        {
          label: `Ask about ${subject}`,
          note: "The page you are reading",
          message: `Hello Eventures Club. I am looking at ${subject} on your site and have a question.`,
        },
        ...options,
      ]
    : options;

  const toggle = () => {
    setSubject(pageSubject(pathname));
    setOpen((value) => !value);
  };

  return (
    <div ref={root} className="wa-root">
      <div className={`wa-panel ${open ? "is-open" : ""}`} inert={!open} aria-hidden={!open}>
        <div className="flex items-center gap-3 bg-forest-deep px-5 py-4 text-paper">
          <Image src="/brand/icon.svg" alt="" width={40} height={40} className="h-10 w-10 border border-paper/20" />
          <div>
            <p className="display text-xl leading-none">The Eventures desk</p>
            <p className="mt-1.5 text-xs text-paper/75">{site.pickups.join(" and ")}, on WhatsApp</p>
          </div>
        </div>
        <p className="px-5 pb-1 pt-4 text-sm leading-6 text-ink-soft">Choose one. WhatsApp opens with the note already written, and you can change it before sending.</p>
        <div className="divide-y divide-line py-1">
          {rows.map((row, index) => (
            <a
              key={row.label}
              href={whatsappLink(row.message) ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-option"
              style={{ "--i": index } as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              <span>
                <span className="block text-[0.95rem] font-medium">{row.label}</span>
                <span className="mt-0.5 block text-sm text-ink-soft">{row.note}</span>
              </span>
              <span className="wa-option-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
        <p className="border-t border-line bg-paper-deep/60 px-5 py-3 text-xs text-ink-soft">
          Prefer email?{" "}
          <a className="link-quiet underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      </div>
      <button type="button" className="wa-trigger" aria-expanded={open} aria-label="Message the desk on WhatsApp" onClick={toggle}>
        <span className="wa-trigger-icon">
          <WhatsAppIcon size={24} />
          <span className="wa-pulse" aria-hidden="true" />
        </span>
        <span className="wa-trigger-label">
          <span>
            <span>{open ? "Close" : "WhatsApp the desk"}</span>
          </span>
        </span>
      </button>
    </div>
  );
}

/** An inline button for detail pages and the contact page. */
export function WhatsAppButton({ message, label = "Ask on WhatsApp", className = "" }: { message: string; label?: string; className?: string }) {
  const href = whatsappLink(message);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn btn-whatsapp ${className}`}>
      <WhatsAppIcon size={18} />
      {label}
    </a>
  );
}
