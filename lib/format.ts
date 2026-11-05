export function formatPkr(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

export function durationLabel(days: number, nights: number) {
  return `${days} days / ${nights} nights`;
}
