"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Light / dark switch in the nav. The theme itself lives on <html
 * data-theme>, set before paint by `themeScript` in layout.tsx; this button
 * flips it and remembers the choice. Both icons are rendered and CSS picks
 * one, so the server markup never has to guess the visitor's theme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode / blocked storage: the switch still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Переключить тему"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-btn bg-background-mid text-ink transition-colors duration-(--dur-fast) hover:bg-grey focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink tablet:size-[54px]",
        className,
      )}
    >
      <Moon className="size-4 tablet:size-5 dark:hidden" aria-hidden />
      <Sun className="hidden size-4 tablet:size-5 dark:block" aria-hidden />
    </button>
  );
}
