"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/whatsapp";

export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const room = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${room > 0 ? Math.min(window.scrollY / room, 1) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={bar} className="reading-progress" aria-hidden="true" />;
}

export function ShareTools({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${title} ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" className="btn btn-ghost !min-h-10 !px-3.5 !text-[0.68rem]" onClick={copy} aria-live="polite">
        {copied ? "Link copied" : "Copy link"}
      </button>
      <button type="button" className="btn btn-ghost !min-h-10 !px-3.5 !text-[0.68rem]" onClick={shareOnWhatsApp}>
        <WhatsAppIcon size={15} />
        Share
      </button>
    </div>
  );
}
