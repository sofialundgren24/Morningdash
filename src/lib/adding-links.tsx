"use client";

import { FormEvent, useState } from "react";
import type { MorningLink } from "@/config/links";
import { CategoryIcon, linkCategories } from "@/config/category-svg";
import { Button } from "@/components/ui/button";

export const colorOptions = [
  { value: "from-pink-500 to-rose-400", label: "Pink" },
  { value: "from-red-500 to-orange-400", label: "Red" },
  { value: "from-sky-500 to-cyan-400", label: "Blue" },
  { value: "from-violet-500 to-purple-400", label: "Purple" },
  { value: "from-amber-500 to-yellow-400", label: "Yellow" },
  { value: "from-emerald-500 to-green-400", label: "Green" },
];

type NewLinkForm = {
  label: string;
  url: string;
  description: string;
  color: string;
  category: string;
};

const emptyForm: NewLinkForm = {
  label: "",
  url: "",
  description: "",
  color: colorOptions[0].value,
  category: linkCategories[0],
};

type AddLinkFormProps = {
  setLinks: React.Dispatch<React.SetStateAction<MorningLink[]>>;
};

export function handleAddLink(
  form: NewLinkForm,
  setLinks: React.Dispatch<React.SetStateAction<MorningLink[]>>,
  setForm: React.Dispatch<React.SetStateAction<NewLinkForm>>,
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  const label = form.label.trim();
  const url = form.url.trim();
  if (!label || !url) return;

  const id =
    label
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") || "link";

  const newLink: MorningLink = {
    id: `${id}-${Date.now()}`,
    label,
    url: url.startsWith("http") ? url : `https://${url}`,
    description: form.description.trim() || undefined,
    color: form.color,
    category: form.category,
    custom: true,
  };

  setLinks((prev) => [...prev, newLink]);
  setForm(emptyForm);
}

export function AddLinkForm({ setLinks }: AddLinkFormProps) {
  const [form, setForm] = useState<NewLinkForm>(emptyForm);

  return (
    <form
      onSubmit={(event) => handleAddLink(form, setLinks, setForm, event)}
      className="mb-8 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-sm"
    >
     
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-neutral-500">Label</span>
          <input
            type="text"
            value={form.label}
            onChange={(e) => setForm((prev) => ({ ...prev, label: e.target.value }))}
            placeholder="e.g. Instagram"
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-neutral-500">URL</span>
          <input
            type="url"
            value={form.url}
            onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
            placeholder="https://..."
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-neutral-500">Description</span>
          <input
            type="text"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Optional"
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-neutral-500">Color</span>
          <select
            value={form.color}
            onChange={(e) => setForm((prev) => ({ ...prev, color: e.target.value }))}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
          >
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-neutral-500">Category</span>
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white">
              <CategoryIcon category={form.category} size={40} />
            </div>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
            >
              {linkCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>
      <Button type="submit" className="mt-3 w-full sm:w-auto bg-green-500">
        Add link
      </Button>
    </form>
  );
}
