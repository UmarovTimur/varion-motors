"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SearchBar (§5) — glass field sitting over the hero photo.
 * The original is a Framer code component, so this is built to the description.
 * `onSearch` is a stub: no search backend exists yet.
 */
export function SearchBar({
  placeholder = "Search…",
  onSearch,
  className,
}: {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}) {
  const [query, setQuery] = useState("");

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(query);
      }}
      className={cn(
        "flex items-center gap-3 rounded-sm bg-text-white/10 px-4 py-3 ring-1 ring-text-white/20 ring-inset backdrop-blur-md",
        className,
      )}
    >
      <Search className="size-4 shrink-0 text-text-white-muted" aria-hidden />
      <label htmlFor="hero-search" className="sr-only">
        Search inventory
      </label>
      <input
        id="hero-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-body-xs text-text-white outline-none placeholder:text-text-white-muted"
      />
    </form>
  );
}
