"use client";

import { useEffect, useState } from "react";
import { morningLinks } from "@/config/links";
import {
  getVisits,
  isVisitedWithin24h,
  type VisitRecord,
} from "@/lib/visited-links";
import { LinkItem } from "@/components/link-item";
import { cn } from "@/lib/utils";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 10) return "God morgon";
  if (hour < 12) return "God förmiddag";
  if (hour < 18) return "God eftermiddag";
  return "God kväll";
}

function formatDate(): string {
  return new Date().toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function Dashboard() {
  const [visits, setVisits] = useState<VisitRecord>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVisits(getVisits());
    setMounted(true);
  }, []);

  const visitedCount = morningLinks.filter((link) =>
    isVisitedWithin24h(link.id, visits)
  ).length;
  const totalCount = morningLinks.length;
  const progress = totalCount > 0 ? (visitedCount / totalCount) * 100 : 0;
  const allDone = visitedCount === totalCount;

  function handleVisit(linkId: string) {
    setVisits((prev) => ({ ...prev, [linkId]: Date.now() }));
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-100 via-rose-50 to-sky-100" />
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 size-64 rounded-full bg-amber-200/40 blur-3xl" />

      <main className="relative mx-auto flex min-h-screen max-w-lg flex-col px-6 py-12">
        <header className="mb-10 text-center">
          <p className="mb-1 text-sm font-medium uppercase tracking-widest text-rose-400/80">
            {mounted ? formatDate() : "\u00a0"}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-800">
            {getGreeting()} 
          </h1>
          <p className="mt-2 text-neutral-500">Din morgonrutin</p>
        </header>

        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-neutral-600">
              {mounted ? (
                allDone ? (
                  <span className="text-emerald-600">Allt klart för idag! 🎉</span>
                ) : (
                  `${visitedCount} av ${totalCount} besökta`
                )
              ) : (
                "\u00a0"
              )}
            </span>
            <span className="text-neutral-400">{mounted ? `${Math.round(progress)}%` : ""}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/60 shadow-inner">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                allDone
                  ? "bg-gradient-to-r from-emerald-400 to-green-400"
                  : "bg-gradient-to-r from-rose-400 via-amber-400 to-sky-400"
              )}
              style={{ width: mounted ? `${progress}%` : "0%" }}
            />
          </div>
        </div>

        <nav className="flex flex-col gap-3" aria-label="Morgonlänkar">
          {morningLinks.map((link) => (
            <LinkItem
              key={link.id}
              link={link}
              visits={visits}
              onVisit={handleVisit}
            />
          ))}
        </nav>

        <p className="mt-10 text-center text-xs text-neutral-400">
          Besökta länkar blir grå i 24 timmar
        </p>
      </main>
    </div>
  );
}
