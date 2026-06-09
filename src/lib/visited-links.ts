const STORAGE_KEY = "morning-dashboard-visits";
const VISIT_DURATION_MS = 24 * 60 * 60 * 1000;

export type VisitRecord = Record<string, number>;

export function getVisits(): VisitRecord {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as VisitRecord;
  } catch {
    return {};
  }
}

export function markVisited(linkId: string): void {
  const visits = getVisits();
  visits[linkId] = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
}

export function isVisitedWithin24h(linkId: string, visits?: VisitRecord): boolean {
  const record = visits ?? getVisits();
  const visitedAt = record[linkId];
  if (!visitedAt) return false;
  return Date.now() - visitedAt < VISIT_DURATION_MS;
}

export function getTimeUntilReset(linkId: string, visits?: VisitRecord): number | null {
  const record = visits ?? getVisits();
  const visitedAt = record[linkId];
  if (!visitedAt) return null;

  const remaining = VISIT_DURATION_MS - (Date.now() - visitedAt);
  return remaining > 0 ? remaining : null;
}

export function formatTimeRemaining(ms: number): string {
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
