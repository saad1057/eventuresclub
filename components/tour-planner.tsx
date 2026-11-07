"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { submitTourBrief, type BriefResult } from "@/lib/actions";
import {
  comforts,
  departures,
  destinationLabel,
  destinations,
  seasons,
  tourBudgets,
  tripLengths,
  type DestinationId,
} from "@/lib/options";
import { StepRail, useSteps } from "@/components/step-rail";
import { getTour } from "@/lib/tours";

const steps = ["Places", "Shape", "You"];

export function TourPlanner() {
  const params = useSearchParams();
  const preset = params.get("destination");
  const tour = getTour(params.get("tour") || "");
  const { step, direction, leaving, moveTo } = useSteps(2);
  const [selected, setSelected] = useState<DestinationId[]>(() =>
    destinations.some((item) => item.id === preset) ? [preset as DestinationId] : [],
  );
  const [season, setSeason] = useState<(typeof seasons)[number]>("Flexible");
  const [dates, setDates] = useState("");
  const [groupSize, setGroupSize] = useState(4);
  const [departure, setDeparture] = useState<(typeof departures)[number]>("Lahore");
  const [length, setLength] = useState<(typeof tripLengths)[number]>("4–5 days");
  const [comfort, setComfort] = useState<(typeof comforts)[number]>("Standard");
  const [budget, setBudget] = useState<(typeof tourBudgets)[number]>("Not sure yet");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<BriefResult | null>(null);
  const [localError, setLocalError] = useState("");

  const summary = useMemo(
    () => [
      ["Places", selected.map((id) => destinationLabel(id)).join(", ") || "Not chosen"],
      ["Season", season],
      ["Dates", dates || "Open"],
      ["Group", String(groupSize)],
      ["Pickup", departure],
      ["Length", length],
      ["Comfort", comfort],
      ["Budget", budget],
      ["Started from", tour ? `${tour.title}, ${tour.days} days` : "The planner"],
    ],
    [selected, season, dates, groupSize, departure, length, comfort, budget, tour],
  );

  function toggle(id: DestinationId) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function next() {
    if (step === 0 && selected.length === 0) {
      setLocalError("Choose at least one place.");
      return;
    }
    setLocalError("");
    moveTo(step + 1);
  }

  async function onSubmit() {
    setPending(true);
    setLocalError("");
    const response = await submitTourBrief({
      name,
      email,
      phone,
      destinations: selected,
      season,
      dates,
      groupSize,
      departure,
      length,
      comfort,
      budget,
      notes,
      startedFrom: tour ? `${tour.title}, ${tour.days} days` : "",
      honeypot,
    });
    setPending(false);
    setResult(response);
  }

  if (result?.ok) {
    return (
      <div className="panel rise p-6 md:p-10">
        <p className="kicker">Sent</p>
        <h2 className="display mt-3 text-4xl">The brief is with us.</h2>
        <p className="mt-4 max-w-xl text-ink-soft">
          {result.delivery === "email"
            ? "A copy is on its way to your inbox, and the same note is with the desk. We reply by email."
            : "This preview stored the email instead of sending it. The brief itself is complete, with every answer you gave."}
        </p>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {summary.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm">
              <dt className="text-ink-soft">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm">
            <dt className="text-ink-soft">Name</dt>
            <dd>{name}</dd>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm">
            <dt className="text-ink-soft">Email</dt>
            <dd>{email}</dd>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm">
            <dt className="text-ink-soft">Phone</dt>
            <dd>{phone}</dd>
          </div>
          {notes ? (
            <div className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm">
              <dt className="text-ink-soft">Notes</dt>
              <dd>{notes}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        <StepRail steps={steps} step={step} onBack={moveTo} />
        <div className={`swap step-out-${direction} mt-8 ${leaving ? "is-leaving" : ""}`}>
        <div key={step} className={`step-in-${direction}`}>
          {step === 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {destinations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="choice"
                  aria-pressed={selected.includes(item.id)}
                  onClick={() => toggle(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : null}
          {step === 1 ? (
            <div className="grid gap-6">
              <label className="field">
                <span className="field-label">Season</span>
                <select value={season} onChange={(event) => setSeason(event.target.value as typeof season)}>
                  {seasons.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span className="field-label">Dates, if you have them</span>
                <input type="date" value={dates} onChange={(event) => setDates(event.target.value)} />
              </label>
              <label className="field">
                <span className="field-label">People</span>
                <input
                  type="number"
                  min={1}
                  max={40}
                  value={groupSize}
                  onChange={(event) => setGroupSize(Number(event.target.value))}
                />
              </label>
              <fieldset>
                <legend className="field-label">Pickup</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {departures.map((item) => (
                    <button key={item} type="button" className="choice" aria-pressed={departure === item} onClick={() => setDeparture(item)}>
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="field-label">Length</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tripLengths.map((item) => (
                    <button key={item} type="button" className="choice" aria-pressed={length === item} onClick={() => setLength(item)}>
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="field-label">Comfort</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {comforts.map((item) => (
                    <button key={item} type="button" className="choice" aria-pressed={comfort === item} onClick={() => setComfort(item)}>
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="field">
                <span className="field-label">Budget</span>
                <select value={budget} onChange={(event) => setBudget(event.target.value as typeof budget)}>
                  {tourBudgets.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span className="field-label">Notes</span>
                <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Pace, elders, a pass you care about" />
              </label>
            </div>
          ) : null}
          {step === 2 ? (
            <div className="grid gap-6">
              <label className="field">
                <span className="field-label">Name</span>
                <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
              </label>
              <label className="field">
                <span className="field-label">Email</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
              </label>
              <label className="field">
                <span className="field-label">Phone</span>
                <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" />
              </label>
              <label className="absolute left-[-9999px]" aria-hidden="true">
                Website
                <input tabIndex={-1} value={honeypot} onChange={(event) => setHoneypot(event.target.value)} autoComplete="off" />
              </label>
            </div>
          ) : null}
        </div>
        </div>
        {localError ? <p className="mt-4 text-sm text-copper-deep">{localError}</p> : null}
        {result && !result.ok ? (
          <p className="mt-4 text-sm text-copper-deep">
            {result.message}
            {result.fieldErrors ? ` ${Object.values(result.fieldErrors).join(" ")}` : ""}
          </p>
        ) : null}
        <div className="mt-8 flex gap-3">
          {step > 0 ? (
            <button type="button" className="btn btn-ghost" onClick={() => moveTo(step - 1)}>
              Back
            </button>
          ) : null}
          {step < 2 ? (
            <button type="button" className="btn btn-solid btn-go" onClick={next}>
              Continue
            </button>
          ) : (
            <button type="button" className="btn btn-solid btn-go" disabled={pending} onClick={onSubmit}>
              {pending ? "Sending" : "Email the brief"}
            </button>
          )}
        </div>
      </div>
      <aside className="panel panel-dark h-fit p-6 lg:sticky lg:top-28">
        <p className="kicker kicker-light">Your brief</p>
        <dl className="mt-4 space-y-3 text-sm">
          {summary.map(([label, value]) => (
            <div key={label}>
              <dt className="text-paper/60">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}
