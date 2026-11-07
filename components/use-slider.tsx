"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * State for an auto-advancing slider. The timing lives in CSS: the active tab's
 * progress fill is an animation, and its `animationend` moves to the next slide.
 * That keeps the bar and the slide in step, and pausing is a single CSS property.
 * The slider holds while a mouse is over it or a keyboard user is inside it, so
 * there is no pause button to find. A tap on a touch screen never holds it.
 * Under prefers-reduced-motion the fill does not animate, so nothing auto-advances.
 */
export function useSlider<T extends HTMLElement>(count: number) {
  const [state, setState] = useState({ index: 0, previous: -1, direction: 1 as 1 | -1 });
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const root = useRef<T>(null);
  const swipeStart = useRef<number | null>(null);

  const go = useCallback((target: number, direction: 1 | -1) => {
    setState((current) => {
      if (target === current.index) return current;
      return { index: target, previous: current.index, direction };
    });
  }, []);

  const next = useCallback(() => {
    setState((current) => ({
      index: (current.index + 1) % count,
      previous: current.index,
      direction: 1,
    }));
  }, [count]);

  const previous = useCallback(() => {
    setState((current) => ({
      index: (current.index - 1 + count) % count,
      previous: current.index,
      direction: -1,
    }));
  }, [count]);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry?.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const surface = {
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType !== "touch") setPointerInside(true);
    },
    onPointerLeave: () => setPointerInside(false),
    onFocus: (event: React.FocusEvent) => {
      if (event.target.matches(":focus-visible")) setFocusInside(true);
    },
    onBlur: (event: React.FocusEvent) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocusInside(false);
    },
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    },
    onPointerDown: (event: React.PointerEvent) => {
      if (event.pointerType === "touch") swipeStart.current = event.clientX;
    },
    onPointerUp: (event: React.PointerEvent) => {
      if (swipeStart.current === null) return;
      const distance = event.clientX - swipeStart.current;
      swipeStart.current = null;
      if (Math.abs(distance) < 48) return;
      if (distance < 0) next();
      else previous();
    },
    onPointerCancel: () => {
      swipeStart.current = null;
    },
  };

  return {
    root,
    slider: {
      ...state,
      go,
      next,
      prev: previous,
      surface,
      held: pointerInside || focusInside || offscreen,
    },
  };
}
