"use client";

import { useEffect, useState } from "react";
import type { MorningLink } from "@/config/links";
import {
  getMorningLinks,
  saveMorningLinks,
} from "@/lib/morning-links-storage";
import {
  getVisits,
  isVisitedWithin24h,
  type VisitRecord,
} from "@/lib/visited-links";
import { AddLinkForm } from "@/lib/adding-links";
import { LinkItem } from "@/components/link-item";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 10) return "Good morning";
  if (hour < 12) return "Good late morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function Dashboard() {
  const [links, setLinks] = useState<MorningLink[]>([]);
  const [visits, setVisits] = useState<VisitRecord>({});
  const [mounted, setMounted] = useState(false);
  

  useEffect(() => {
    setLinks(getMorningLinks());
    setVisits(getVisits());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveMorningLinks(links);
  }, [links, mounted]);

  const visitedCount = links.filter((link) =>
    isVisitedWithin24h(link.id, visits)
  ).length;
  const totalCount = links.length;
  const progress = totalCount > 0 ? (visitedCount / totalCount) * 100 : 0;
  const allDone = totalCount > 0 && visitedCount === totalCount;

  function handleVisit(linkId: string) {
    setVisits((prev) => ({ ...prev, [linkId]: Date.now() }));
  }

  function handleDeleteLink(linkId: string) {
    setLinks((prev) => prev.filter((link) => link.id !== linkId));
  }

  
  return (
    <div className="relative min-h-screen overflow-hidden bg-blue-800">
      
      <main className="relative mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12">
        <header className="mb-10 text-center">
          <p className="mb-1 text-sm font-medium uppercase tracking-widest text-gray-400/80">
            {mounted ? formatDate() : "\u00a0"}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-800">
            {getGreeting()} 
          </h1>
          <p className="mt-2 text-neutral-500">Check of all your must do's</p>
        </header>

        <div className="mb-8 flex justify-center">
          <Dialog>
            <DialogTrigger
              className={cn(
                "group flex size-14 items-center justify-center rounded-full",
                "bg-green-300",
                "ring-4 ring-white/80 transition-all duration-200",
                "hover:scale-105 hover:shadow-xl hover:shadow-rose-300/60 active:scale-95",
                "focus-visible:outline-none focus-visible:ring-rose-300"
              )}
            >
              <Plus className="size-7 stroke-[2.5] transition-transform group-hover:rotate-90" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new link</DialogTitle>
              </DialogHeader>
              <AddLinkForm setLinks={setLinks} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-neutral-600">
              {mounted ? (
                allDone ? (
                  <span className="text-emerald-600">All done for today</span>
                ) : (
                  `${visitedCount} of ${totalCount} visited`
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
                  : "bg-blue-300"
              )}
              style={{ width: mounted ? `${progress}%` : "0%" }}
            />
          </div>
        </div>

        <nav className="grid md:grid-cols-2 gap-3 grid-cols-1" aria-label="Morning links">
          {links.map((link) => (
            <LinkItem
              key={link.id}
              link={link}
              visits={visits}
              onVisit={handleVisit}
              onDelete={handleDeleteLink}
            />
          ))}
        </nav>

        <p className="mt-10 text-center text-xs text-neutral-400">
          Visited links turn gray for 24 hours
        </p>
      </main>
    </div>
  );
}
