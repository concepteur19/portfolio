type Period = { start: string; end?: string; section?: "main" | "early" };

export type ExperienceSummary = { months: number; label: string };

function toMonthIndex(yearMonth: string): number {
  const [year, month] = yearMonth.split("-").map(Number);
  return year * 12 + (month - 1);
}

export function formatPeriod(start: string, end?: string): string {
  const format = (yearMonth: string) => {
    const [year, month] = yearMonth.split("-");
    return `${month}/${year}`;
  };
  return `${format(start)} - ${end ? format(end) : "aujourd'hui"}`;
}

export function experienceLabel(months: number): string {
  if (months < 12) return `${months} mois`;
  const years = Math.floor(months / 12);
  if (months % 12 === 0) return years === 1 ? "1 an" : `${years} ans`;
  return years === 1 ? "plus d'un an" : `plus de ${years} ans`;
}

// Merges overlapping periods so that concurrent roles are counted once.
export function getExperienceSummary(entries: Period[], today: Date): ExperienceSummary {
  const currentMonth = today.getFullYear() * 12 + today.getMonth();
  const intervals = entries
    .filter((entry) => (entry.section ?? "main") === "main")
    .map((entry) => [
      toMonthIndex(entry.start),
      entry.end ? toMonthIndex(entry.end) : currentMonth,
    ])
    .sort((a, b) => a[0] - b[0]);

  let months = 0;
  let current: number[] | undefined;
  for (const [start, end] of intervals) {
    if (current && start <= current[1] + 1) {
      current[1] = Math.max(current[1], end);
    } else {
      if (current) months += current[1] - current[0] + 1;
      current = [start, end];
    }
  }
  if (current) months += current[1] - current[0] + 1;

  return { months, label: experienceLabel(months) };
}
