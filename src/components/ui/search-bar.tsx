"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { cars } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * SearchBar — ported from the Framer component `Search Bar` (n2tqi86G1).
 *
 * Base variant (KnR_LmAL9): 206px white pill, radius 16, 4px padding, 4px gap,
 * overflow clip. Row is [Label 1fr][IconContainer 45x45], bottom-aligned.
 *
 * Hover variant (x6tZazYtt) changes exactly one attribute: overflow -> visible,
 * which lets `SearchItems` (opacity 0 in the base variant) escape the bar. The
 * `Trigger` frame is 200%x200% at top -26, so once the bar is open the hover
 * area covers the dropdown and the pointer can travel down into it.
 *
 * The XML omits SearchItems' padding; it is 24px (confirmed against the Framer
 * file). Timings are likewise not carried by the XML; opacity uses the project's
 * 200ms / ease-out pair from tokens.md §6.
 */
export function SearchBar({
  onSearch,
  className,
}: {
  onSearch?: (query: string) => void;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const results = q
    ? cars.filter((car) => car.name.toLowerCase().includes(q))
    : cars;

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(query);
      }}
      className={cn(
        "group relative flex w-[206px] flex-row items-end justify-end gap-1 overflow-clip rounded-md bg-paper p-1",
        "hover:overflow-visible focus-within:overflow-visible",
        className,
      )}
    >
      {/* Trigger — hover area, clipped away until the bar opens */}
      <span
        aria-hidden
        className="absolute top-[-26px] left-1/2 z-0 h-[200%] w-[200%] -translate-x-1/2"
      />

      {/* Label */}
      <div className="relative z-1 flex min-w-0 flex-1 flex-col justify-center self-stretch px-3">
        <label htmlFor="hero-search" className="sr-only">
          Search inventory
        </label>
        <input
          id="hero-search"
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full min-w-0 bg-transparent text-body-xs text-ink outline-none [&::-webkit-search-cancel-button]:hidden"
        />
      </div>

      {/* IconContainer */}
      <button
        type="submit"
        aria-label="Search"
        className="relative z-1 flex size-[45px] shrink-0 flex-row items-center justify-center gap-2.5 overflow-clip rounded-icon bg-ink"
      >
        <Search
          className="size-3.5 text-paper"
          aria-hidden
          strokeWidth={2}
        />
      </button>

      {/* SearchItems */}
      <div
        className={cn(
          "pointer-events-none absolute top-[63px] left-1/2 z-1 flex w-[240px] -translate-x-1/2 flex-col items-start justify-center gap-4 rounded-md bg-background-mid p-6 opacity-0",
          "transition-opacity duration-(--dur-fast) ease-out",
          "group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100",
        )}
      >
        {/* Content */}
        <div className="flex w-full flex-row items-start justify-center gap-2">
          {/* Inventories */}
          <div
            className={cn(
              "flex flex-col items-start justify-center gap-3 opacity-0",
              "transition-opacity duration-(--dur-fast) ease-out",
              "group-hover:opacity-100 group-focus-within:opacity-100",
            )}
          >
            {results.map((car) => (
              /* Inventory */
              <Link
                key={car.slug}
                href={`/inventory/${car.slug}`}
                className="flex flex-row items-center justify-start gap-2.5"
              >
                <SmallCarCard name={car.name} />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <SearchMicroAnimation />
        </div>
      </div>
    </form>
  );
}

/**
 * Small Car Cards (nUSaSrJQg) — CMS-bound, so `getNodeXml` refuses it and only
 * the instance's text prop ("Veltora Seryn") is readable. Rendered as the car
 * name until the component itself can be read.
 */
function SmallCarCard({ name }: { name: string }) {
  return (
    <span className="text-body-xs whitespace-nowrap text-ink">{name}</span>
  );
}

/** Search Micro-Animation (S73595blv) — 40px row of three 6px Greys/Grey dots. */
function SearchMicroAnimation() {
  return (
    <div
      aria-hidden
      className="flex w-10 flex-row items-center justify-center gap-1"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="animate-search-dot size-1.5 rounded-full bg-grey"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}
