"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { MenuToggle } from "@/components/ui/menu-toggle";
import { NavLink } from "@/components/ui/nav-link";
import { navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Nav (§1) — a solid #F2F2F2 bar, 70px tall (8 + 54 + 8), with a single 1px
 * #D9D9D9 bottom border. Opaque by design, so there is no transparent-over-hero
 * state to manage.
 *
 * Content zones are flexed 0.5 / 1 / 0.5 so the link row stays dead-centre
 * regardless of how wide the logo or the button turn out to be.
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  // ScrollBlocker — lock the page behind the open mobile panel.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-(--z-header) flex flex-col items-center border-b border-grey bg-background">
      {/* Content — 600/20 on phone; from tablet up the bar is capped at the
       * 1480 content frame on a 32px gutter, so it runs edge to edge on every
       * screen narrower than that and centres with the page above it. Matches
       * the published nav, which measures 985 wide at 1000px and 1480 at 1530. */}
      <div className="flex w-full max-w-[600px] items-center gap-2.5 px-5 py-2 tablet:max-w-[1480px] tablet:px-8">
        {/* Logo Container */}
        <div className="flex shrink-0 grow-[0.5] basis-0 items-center justify-start gap-2.5">
          <Logo />
        </div>

        {/* Links */}
        <nav className="hidden grow basis-0 items-center justify-center gap-1 desktop:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex grow-[0.5] basis-0 items-center justify-end gap-1">
          <Button
            href="/contact"
            variant="secondary"
            className="hidden desktop:inline-flex"
          >
            Рассчитать под ключ
          </Button>
          <MenuToggle
            open={open}
            onClick={() => setOpen((v) => !v)}
            className="desktop:hidden"
          />
        </div>
      </div>

      {/* Tablet Open / Mobile Open — panel unfolds beneath the row */}
      <div
        className={cn(
          "w-full overflow-hidden transition-[max-height] duration-(--dur-base) desktop:hidden",
          open ? "max-h-[80vh]" : "max-h-0",
        )}
      >
        <div className="mx-auto flex w-full max-w-[600px] flex-col gap-1 px-5 pt-1 pb-5 tablet:max-w-[1480px] tablet:px-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="w-full justify-start"
            >
              {link.label}
            </NavLink>
          ))}
          {/* Full width, so the arrow pins to the right edge instead of
           * floating in the middle of the pill. */}
          <Button
            href="/contact"
            variant="secondary"
            className="mt-2 w-full justify-between"
          >
            Рассчитать под ключ
          </Button>
        </div>
      </div>
    </header>
  );
}
