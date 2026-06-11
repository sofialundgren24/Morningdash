import { morningLinks, type MorningLink } from "@/config/links";

const STORAGE_KEY = "morning-dashboard-links";

export function getMorningLinks(): MorningLink[] {
  if (typeof window === "undefined") return morningLinks;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return morningLinks;
    const parsed = JSON.parse(raw) as MorningLink[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : morningLinks;
  } catch {
    return morningLinks;
  }
}

export function saveMorningLinks(links: MorningLink[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}
