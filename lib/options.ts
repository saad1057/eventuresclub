export const destinations = [
  { id: "galiyat", label: "Nathiagali and the Galiyat" },
  { id: "naran", label: "Naran and Kaghan" },
  { id: "swat", label: "Swat and Kalam" },
  { id: "kumrat", label: "Kumrat" },
  { id: "hunza", label: "Hunza" },
  { id: "skardu", label: "Skardu" },
  { id: "chitral", label: "Chitral and Kalash" },
] as const;

export const seasons = [
  "Spring (Mar–May)",
  "Summer (Jun–Aug)",
  "Autumn (Sep–Nov)",
  "Winter (Dec–Feb)",
  "Flexible",
] as const;

export const tripLengths = [
  "2–3 days",
  "4–5 days",
  "6–8 days",
  "9 days or more",
  "Not sure yet",
] as const;

export const departures = ["Lahore", "Islamabad", "Karachi", "Other"] as const;

export const comforts = ["Simple and local", "Standard", "Premium"] as const;

export const tourBudgets = [
  "Under PKR 40,000 per person",
  "PKR 40,000–70,000 per person",
  "PKR 70,000–120,000 per person",
  "PKR 120,000 or more per person",
  "Not sure yet",
] as const;

export const eventTypes = [
  "Corporate",
  "Wedding",
  "Private gathering",
  "Not sure yet",
] as const;

export const eventSettings = [
  "Indoor",
  "Outdoor",
  "Either",
  "Help us decide",
] as const;

export const cateringChoices = ["Yes", "No", "Not sure"] as const;

export const eventBudgets = [
  "Under PKR 300,000",
  "PKR 300,000–800,000",
  "PKR 800,000–2,000,000",
  "PKR 2,000,000 or more",
  "Not sure yet",
] as const;

export const contactTopics = ["A tour", "An event", "Something else"] as const;

export type DestinationId = (typeof destinations)[number]["id"];

export function destinationLabel(id: string) {
  return destinations.find((item) => item.id === id)?.label ?? id;
}
