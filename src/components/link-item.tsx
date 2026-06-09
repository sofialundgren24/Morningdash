"use client";

import { Check } from "lucide-react";
import type { MorningLink } from "@/config/links";
import {
  formatTimeRemaining,
  getTimeUntilReset,
  markVisited,
  type VisitRecord,
} from "@/lib/visited-links";
import { cn } from "@/lib/utils";

type LinkItemProps = {
  link: MorningLink;
  visits: VisitRecord;
  onVisit: (linkId: string) => void;
};

export function LinkItem({ link, visits, onVisit }: LinkItemProps) {
  const visited = visits[link.id]
    ? Date.now() - visits[link.id] < 24 * 60 * 60 * 1000
    : false;
  const timeRemaining = visited ? getTimeUntilReset(link.id, visits) : null;

  function handleClick() {
    markVisited(link.id);
    onVisit(link.id);
    window.location.href = link.url;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "group relative flex w-full items-center gap-4 rounded-2xl p-5 text-left transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        visited
          ? "bg-neutral-200/80 text-neutral-500 shadow-none hover:bg-neutral-300/80"
          : cn(
              "bg-gradient-to-br text-white shadow-lg hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]",
              link.color
            )
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold",
          visited ? "bg-neutral-300/60 text-neutral-500" : "bg-white/20"
        )}
      >
        {visited ? <Check className="size-5" strokeWidth={2.5} /> : link.label[0]}
      </div>

      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-base font-semibold", visited && "text-neutral-500")}>
          {link.label}
        </p>
        {link.description && (
          <p className={cn("truncate text-sm", visited ? "text-neutral-400" : "text-white/80")}>
            {link.description}
          </p>
        )}
      </div>

      {visited && timeRemaining && (
        <span className="shrink-0 text-xs text-neutral-400">
          {formatTimeRemaining(timeRemaining)}
        </span>
      )}
    </button>
  );
}
