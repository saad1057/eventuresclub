"use client";

import { useRef, useState } from "react";

/** Planner step state: the old step slides out, then the new one slides in from its own side. */
export function useSteps(last: number) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const moveTo = (target: number) => {
    const clamped = Math.max(0, Math.min(target, last));
    setDirection(clamped > step ? 1 : -1);
    setLeaving(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setStep(clamped);
      setLeaving(false);
    }, 180);
  };

  return { step, direction, leaving, moveTo };
}

export function StepRail({ steps, step, onBack }: { steps: string[]; step: number; onBack: (index: number) => void }) {
  return (
    <ol className="grid gap-3" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((label, index) => {
        const reached = index <= step;
        const content = (
          <>
            <span className={`step-bar block ${reached ? "is-done" : ""}`} />
            <span className={`mt-2.5 block text-sm transition-colors duration-500 ${reached ? "text-ink" : "text-ink-soft/70"}`}>
              <span className="mr-1.5 tabular-nums">{index + 1}</span>
              {label}
            </span>
          </>
        );
        return (
          <li key={label} aria-current={index === step ? "step" : undefined}>
            {index < step ? (
              <button type="button" className="block w-full text-left" onClick={() => onBack(index)}>
                {content}
              </button>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ol>
  );
}
