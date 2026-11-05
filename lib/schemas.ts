import { z } from "zod";
import {
  cateringChoices,
  comforts,
  contactTopics,
  departures,
  destinations,
  eventBudgets,
  eventSettings,
  eventTypes,
  seasons,
  tourBudgets,
  tripLengths,
} from "@/lib/options";

const destinationIds = destinations.map((item) => item.id) as [
  (typeof destinations)[number]["id"],
  ...(typeof destinations)[number]["id"][],
];

const honeypot = z.string().max(0, "Leave this blank.").optional().or(z.literal(""));

const contactFields = {
  name: z.string().trim().min(2, "Tell us your name.").max(80),
  email: z.string().trim().email("Use a real email so we can write back."),
  phone: z
    .string()
    .trim()
    .min(7, "Add a phone number.")
    .max(24, "That phone number is too long."),
};

export const tourBriefSchema = z.object({
  ...contactFields,
  destinations: z.array(z.enum(destinationIds)).min(1, "Choose at least one place."),
  season: z.enum(seasons),
  dates: z.string().trim().max(40).optional().or(z.literal("")),
  groupSize: z.coerce.number().int().min(1, "Add the group size.").max(40),
  departure: z.enum(departures),
  length: z.enum(tripLengths),
  comfort: z.enum(comforts),
  budget: z.enum(tourBudgets),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  startedFrom: z.string().trim().max(120).optional().or(z.literal("")),
  honeypot,
});

export const eventBriefSchema = z.object({
  ...contactFields,
  eventType: z.enum(eventTypes),
  place: z.string().trim().min(2, "Name a city, or write that you want help finding one.").max(160),
  date: z.string().trim().max(40).optional().or(z.literal("")),
  guests: z.coerce.number().int().min(1, "Add a guest count.").max(2000),
  setting: z.enum(eventSettings),
  catering: z.enum(cateringChoices),
  budget: z.enum(eventBudgets),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  honeypot,
});

export const contactSchema = z.object({
  name: contactFields.name,
  email: contactFields.email,
  phone: z.string().trim().max(24).optional().or(z.literal("")),
  topic: z.enum(contactTopics),
  message: z.string().trim().min(10, "Write a few lines so we know what you need.").max(2000),
  honeypot,
});

export type TourBrief = z.infer<typeof tourBriefSchema>;
export type EventBrief = z.infer<typeof eventBriefSchema>;
export type ContactBrief = z.infer<typeof contactSchema>;

export type FieldErrorMap = Record<string, string>;

export function fieldErrorsFrom(error: z.ZodError): FieldErrorMap {
  const map: FieldErrorMap = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !map[key]) map[key] = issue.message;
  }
  return map;
}
