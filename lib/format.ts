export function formatPkr(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

export function durationLabel(days: number, nights: number) {
  return `${days} days / ${nights} nights`;
}

export function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
