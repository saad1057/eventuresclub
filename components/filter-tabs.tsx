"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Holds "what was picked" apart from "what is on screen", so the old content can
 * leave before the new content arrives. Only runs JS timers, so it works everywhere.
 */
export function useSwap<T>(initial: T, leaveMs = 200) {
  const [picked, setPicked] = useState(initial);
  const [shown, setShown] = useState(initial);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const pick = useCallback(
    (value: T) => {
      setPicked(value);
      setLeaving(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setShown(value);
        setLeaving(false);
      }, leaveMs);
    },
    [leaveMs],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return { picked, shown, leaving, pick };
}

/** A row of options with one marker that slides to the active option. */
export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  counts,
  label,
}: {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  counts?: Partial<Record<T, number>>;
  label: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const container = root.current;
    const bar = marker.current;
    if (!container || !bar) return;
    const place = () => {
      const active = container.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!active) return;
      bar.style.width = `${active.offsetWidth}px`;
      bar.style.height = `${active.offsetHeight}px`;
      bar.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(container);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={root} className="tabs" role="group" aria-label={label}>
      <span ref={marker} className="tab-marker" aria-hidden="true" />
      {options.map((option) => (
        <button key={option} type="button" className="tab" aria-pressed={option === value} onClick={() => onChange(option)}>
          {option}
          {counts?.[option] !== undefined ? <span className="tab-count">{counts[option]}</span> : null}
        </button>
      ))}
    </div>
  );
}
