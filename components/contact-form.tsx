"use client";

import { useState } from "react";
import { submitContact, type BriefResult } from "@/lib/actions";
import { contactTopics } from "@/lib/options";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState<(typeof contactTopics)[number]>("A tour");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<BriefResult | null>(null);

  async function onSubmit() {
    setPending(true);
    const response = await submitContact({ name, email, phone, topic, message, honeypot });
    setPending(false);
    setResult(response);
  }

  if (result?.ok) {
    return (
      <div className="rise">
        <h2 className="display text-4xl">We have the note.</h2>
        <p className="mt-4 text-ink-soft">
          {result.delivery === "email"
            ? "A copy is in your inbox, with the same words we received."
            : "This preview stored the email instead of sending it. The note itself is complete."}
        </p>
        <p className="mt-6 text-sm leading-7">{message}</p>
      </div>
    );
  }

  return (
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
        <span className="field-label">Phone, if you want</span>
        <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" />
      </label>
      <fieldset>
        <legend className="field-label">About</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {contactTopics.map((item) => (
            <button key={item} type="button" className="choice" aria-pressed={topic === item} onClick={() => setTopic(item)}>
              {item}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="field">
        <span className="field-label">Message</span>
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
      <label className="absolute left-[-9999px]" aria-hidden="true">
        Website
        <input tabIndex={-1} value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </label>
      {result && !result.ok ? (
        <p className="text-sm text-copper-deep">
          {result.message} {result.fieldErrors ? Object.values(result.fieldErrors).join(" ") : ""}
        </p>
      ) : null}
      <button type="button" className="btn btn-solid btn-go w-fit" disabled={pending} onClick={onSubmit}>
        {pending ? "Sending" : "Email the note"}
      </button>
    </div>
  );
}
