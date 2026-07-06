export function formatDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}

export function formatDateRange(date: string, endDate?: string) {
  if (!endDate || endDate === date) {
    return formatDate(date);
  }

  return `${formatDate(date)} - ${formatDate(endDate)}`;
}
