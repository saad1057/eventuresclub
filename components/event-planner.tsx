"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { StepRail, useSteps } from "@/components/step-rail";
import { submitEventBrief, type BriefResult } from "@/lib/actions";
import {
  cateringChoices,
  eventBudgets,
  eventSettings,
  eventTypes,
} from "@/lib/options";

const steps = ["Occasion", "Details", "You"];

const typeFromQuery: Record<string, (typeof eventTypes)[number]> = {
  corporate: "Corporate",
  weddings: "Wedding",
  birthday: "Birthday",
  custom: "Custom event",
  government: "Government office",
  private: "Private gathering",
};

export function EventPlanner() {
  const params = useSearchParams();
  const preset = typeFromQuery[params.get("type") || ""];
  const { step, direction, leaving, moveTo } = useSteps(2);
  const [eventType, setEventType] = useState<(typeof eventTypes)[number]>(preset || "Not sure yet");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(40);
  const [setting, setSetting] = useState<(typeof eventSettings)[number]>("Help us decide");
  const [catering, setCatering] = useState<(typeof cateringChoices)[number]>("Not sure");
  const [budget, setBudget] = useState<(typeof eventBudgets)[number]>("Not sure yet");
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
      ["Event", eventType],
      ["Place", place || "Not set"],
      ["Date", date || "Open"],
      ["Guests", String(guests)],
      ["Setting", setting],
      ["Catering", catering],
      ["Budget", budget],
    ],
    [eventType, place, date, guests, setting, catering, budget],
  );

  function next() {
    if (step === 1 && place.trim().length < 2) {
      setLocalError("Name a city, or write that you want help finding a room.");
      return;
    }
    setLocalError("");
    moveTo(step + 1);
  }

  async function onSubmit() {
    setPending(true);
    const response = await submitEventBrief({
      name,
      email,
      phone,
      eventType,
      place,
      date,
      guests,
      setting,
      catering,
      budget,
      notes,
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
        <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
          {summary.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 py-3">
              <dt className="text-ink-soft">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[8rem_1fr] gap-4 py-3">
            <dt className="text-ink-soft">Name</dt>
            <dd>{name}</dd>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-4 py-3">
            <dt className="text-ink-soft">Email</dt>
            <dd>{email}</dd>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-4 py-3">
            <dt className="text-ink-soft">Phone</dt>
            <dd>{phone}</dd>
          </div>
          {notes ? (
            <div className="grid grid-cols-[8rem_1fr] gap-4 py-3">
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
            <div className="grid gap-3">
              {eventTypes.map((item) => (
                <button key={item} type="button" className="choice" aria-pressed={eventType === item} onClick={() => setEventType(item)}>
                  {item}
                </button>
              ))}
            </div>
          ) : null}
          {step === 1 ? (
            <div className="grid gap-6">
              <label className="field">
                <span className="field-label">City or venue</span>
                <input value={place} onChange={(event) => setPlace(event.target.value)} placeholder="Lahore, or help us find one" />
              </label>
              <label className="field">
                <span className="field-label">Date, if you have one</span>
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              </label>
              <label className="field">
                <span className="field-label">Guests</span>
                <input type="number" min={1} max={2000} value={guests} onChange={(event) => setGuests(Number(event.target.value))} />
              </label>
              <fieldset>
                <legend className="field-label">Setting</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {eventSettings.map((item) => (
                    <button key={item} type="button" className="choice" aria-pressed={setting === item} onClick={() => setSetting(item)}>
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="field-label">Catering</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cateringChoices.map((item) => (
                    <button key={item} type="button" className="choice" aria-pressed={catering === item} onClick={() => setCatering(item)}>
                      {item}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="field">
                <span className="field-label">Budget</span>
                <select value={budget} onChange={(event) => setBudget(event.target.value as typeof budget)}>
                  {eventBudgets.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span className="field-label">Notes</span>
                <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="The thing a form usually misses" />
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
            {result.message} {result.fieldErrors ? Object.values(result.fieldErrors).join(" ") : ""}
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
