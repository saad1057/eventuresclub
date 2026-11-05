"use server";

import { destinationLabel } from "@/lib/options";
import {
  deliverBrief,
  inboxAddress,
  renderBriefHtml,
  renderBriefText,
  type BriefField,
} from "@/lib/email";
import {
  contactSchema,
  eventBriefSchema,
  fieldErrorsFrom,
  tourBriefSchema,
  type FieldErrorMap,
} from "@/lib/schemas";

export type BriefResult =
  | { ok: true; delivery: "email" | "preview" }
  | { ok: false; message: string; fieldErrors?: FieldErrorMap };

function clean(value: string | undefined) {
  const text = value?.trim();
  return text ? text : "—";
}

async function sendPair(args: {
  subject: string;
  customerSubject: string;
  customerIntro: string;
  name: string;
  email: string;
  fields: BriefField[];
}): Promise<BriefResult> {
  const inboxIntro = `${args.name} sent this through the website. Reply to this message to reach them.`;
  const inboxHtml = renderBriefHtml(args.subject, inboxIntro, args.fields);
  const inboxText = renderBriefText(args.subject, inboxIntro, args.fields);
  const copyHtml = renderBriefHtml(args.customerSubject, args.customerIntro, args.fields);
  const copyText = renderBriefText(args.customerSubject, args.customerIntro, args.fields);

  try {
    const delivery = await deliverBrief([
      {
        to: inboxAddress(),
        subject: args.subject,
        html: inboxHtml,
        text: inboxText,
        replyTo: args.email,
      },
      {
        to: args.email,
        subject: args.customerSubject,
        html: copyHtml,
        text: copyText,
      },
    ]);
    return { ok: true, delivery };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The brief could not be emailed. Write to hello@eventuresclub.com and we will pick it up.";
    return { ok: false, message };
  }
}

export async function submitTourBrief(input: unknown): Promise<BriefResult> {
  const parsed = tourBriefSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Some answers need another look.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }
  const data = parsed.data;
  if (data.honeypot) return { ok: true, delivery: "email" };

  const fields: BriefField[] = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    { label: "Places", value: data.destinations.map((id) => destinationLabel(id)).join(", ") },
    { label: "Season", value: data.season },
    { label: "Dates", value: clean(data.dates) },
    { label: "Group size", value: String(data.groupSize) },
    { label: "Pickup", value: data.departure },
    { label: "Length", value: data.length },
    { label: "Comfort", value: data.comfort },
    { label: "Budget", value: data.budget },
    { label: "Started from", value: clean(data.startedFrom) },
    { label: "Notes", value: clean(data.notes) },
  ];

  return sendPair({
    subject: `New tour brief — ${data.name}`,
    customerSubject: "We have your tour brief",
    customerIntro:
      "This is the brief you sent to Eventures Club in Lahore. We will answer on this email. Nothing is booked until you approve a written plan.",
    name: data.name,
    email: data.email,
    fields,
  });
}

export async function submitEventBrief(input: unknown): Promise<BriefResult> {
  const parsed = eventBriefSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Some answers need another look.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }
  const data = parsed.data;
  if (data.honeypot) return { ok: true, delivery: "email" };

  const fields: BriefField[] = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    { label: "Event", value: data.eventType },
    { label: "Place", value: data.place },
    { label: "Date", value: clean(data.date) },
    { label: "Guests", value: String(data.guests) },
    { label: "Setting", value: data.setting },
    { label: "Catering", value: data.catering },
    { label: "Budget", value: data.budget },
    { label: "Notes", value: clean(data.notes) },
  ];

  return sendPair({
    subject: `New event brief — ${data.name}`,
    customerSubject: "We have your event brief",
    customerIntro:
      "This is the brief you sent to Eventures Club in Lahore. We will answer on this email with a direction before anything is booked.",
    name: data.name,
    email: data.email,
    fields,
  });
}

export async function submitContact(input: unknown): Promise<BriefResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Some answers need another look.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }
  const data = parsed.data;
  if (data.honeypot) return { ok: true, delivery: "email" };

  const fields: BriefField[] = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Phone", value: clean(data.phone) },
    { label: "About", value: data.topic },
    { label: "Message", value: data.message },
  ];

  return sendPair({
    subject: `New note — ${data.name}`,
    customerSubject: "We have your note",
    customerIntro: "This is the note you sent to Eventures Club. We will reply by email.",
    name: data.name,
    email: data.email,
    fields,
  });
}
