"use client";

import { X } from "lucide-react";
import type { MorningLink } from "@/config/links";
import { CategoryIcon } from "@/config/category-svg";
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
  onDelete?: (linkId: string) => void;
};

export function LinkItem({ link, visits, onVisit, onDelete }: LinkItemProps) {
  const visited = visits[link.id]
    ? Date.now() - visits[link.id] < 24 * 60 * 60 * 1000
    : false;
  const timeRemaining = visited ? getTimeUntilReset(link.id, visits) : null;

  function handleClick() {
    markVisited(link.id);
    onVisit(link.id);
    window.location.href = link.url;
  }

  function handleDelete(event: React.MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    onDelete?.(link.id);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "group relative flex w-full items-center gap-4 rounded-4xl p-2 text-left transition-all duration-300 min-h-20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          visited
            ? "bg-neutral-200/80 text-neutral-500 shadow-none hover:bg-neutral-300/80"
            : cn(
                "bg-gradient-to-br text-white hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]",
                link.color
              )
        )}
      >
        <div
          
        >
          <CategoryIcon category={link.category} size={120} visited={visited} />
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

      {onDelete && (
        <button
          type="button"
          onClick={handleDelete}
          aria-label={`Remove ${link.label}`}
          className={cn(
            "absolute top-3 right-3 flex size-7 items-center justify-center rounded-full transition-colors",
            visited
              ? "bg-neutral-300/80 text-neutral-600 hover:bg-neutral-400/80"
              : "bg-white/20 text-white hover:bg-white/30"
          )}
        >
          <X className="size-4" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
