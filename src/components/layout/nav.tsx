"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { MenuToggle } from "@/components/ui/menu-toggle";
import { TelegramIcon, WhatsAppIcon } from "@/components/ui/messenger-icons";
import { NavLink } from "@/components/ui/nav-link";
import { navLinks } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Nav (§1) — a solid #F2F2F2 bar, 70px tall (8 + 54 + 8), with a single 1px
 * #D9D9D9 bottom border. Opaque by design, so there is no transparent-over-hero
 * state to manage.
 *
 * The border itself only shows once the page has scrolled: sitting right on
 * top of the hero on the first screen, an outline made it read as a second
 * frame around the hero rather than as the bar's own edge — dropped there
 * and faded in past `scrollY > 0` instead, where the bar has a plain
 * background behind it to separate from.
 *
 * Width: the bar sticks out past the content of every section by exactly
 * its own vertical inset — 8px padding + 1px border — on each side, and its
 * horizontal padding is the same 8px. So the logo and the button line up
 * with the content edges of the sections below, and the gap around the bar's
 * contents is equal on all four sides. The content box is the Container's
 * frame minus its gutter (20 / 24 / 32px on phone / tablet / desktop), which
 * puts the bar 11 / 15 / 23px in from the frame: width `100% - 22/30/46px`,
 * capped at 600/1200/1480 minus the same.
 *
 * Content zones are flexed 0.5 / 1 / 0.5 so the link row stays dead-centre
 * regardless of how wide the logo or the button turn out to be.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ScrollBlocker — lock the page behind the open mobile panel.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // BorderOnScroll — only show the bar's border past the first screen.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-2 z-(--z-header) mx-auto flex w-[calc(100%-22px)] max-w-[578px] flex-col tablet:w-[calc(100%-30px)] tablet:max-w-[1170px] desktop:w-[calc(100%-46px)] desktop:max-w-[1434px] items-center overflow-hidden rounded-md border bg-background transition-colors duration-(--dur-base)",
        scrolled ? "border-grey" : "border-transparent",
      )}
    >
      {/* Content — 8px on every side, matching the bar's vertical padding
       * (see the width note above). */}
      <div className="flex w-full items-center gap-2.5 p-2">
        {/* Logo Container — natural width now the logo is mark-only, so the
         * links can sit right beside it instead of centred in a 0.5-share box. */}
        <div className="flex shrink-0 items-center justify-start gap-2.5">
          <Logo />
        </div>

        {/* Links — the only growing item on desktop, so they land centred in
         * the gap between the logo and the icon cluster rather than at the
         * page's true centre (which the wider icon cluster would skew toward
         * itself). */}
        <nav className="hidden grow basis-0 items-center justify-center gap-1 desktop:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Icons — natural width from desktop up, where the links above grow
         * to meet it; grows to fill the row itself below that, where the
         * links are hidden, so it still lands on the right edge. */}
        <div className="flex grow basis-0 items-center justify-end gap-1 desktop:grow-0 desktop:basis-auto">
          {/* Only where it fits beside the icons: from 590 (below that it
           * moves into the menu panel) and, once the nav pills appear at 1200,
           * again from 1356. Two lines stacked (rather than one wider line)
           * keep this from pushing the breakpoint out further still. */}
          <div className="mr-2 hidden flex-col justify-center leading-tight min-[590px]:flex desktop:hidden min-[1356px]:flex">
            {site.phones.map((phone) => (
              <a
                key={phone}
                href={telHref(phone)}
                className="font-display text-body-xs font-medium whitespace-nowrap text-text-black underline-offset-4 hover:underline"
              >
                {phone}
              </a>
            ))}
          </div>
          <MessengerLink
            href={site.telegram}
            label="Написать в Telegram"
            className="bg-telegram"
          >
            <TelegramIcon className="size-5" />
          </MessengerLink>
          <MessengerLink
            href={site.whatsapp}
            label="Написать в WhatsApp"
            className="bg-whatsapp"
          >
            <WhatsAppIcon className="size-5" />
          </MessengerLink>
          <Button
            href="/contact"
            data-lead=""
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
        <div className="flex w-full flex-col gap-1 px-2 pt-1 pb-2">
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
          <div className="mt-2 flex flex-col gap-1 px-6 min-[590px]:hidden">
            {site.phones.map((phone) => (
              <a
                key={phone}
                href={telHref(phone)}
                className="font-display text-body font-medium text-text-black underline-offset-4 hover:underline"
              >
                {phone}
              </a>
            ))}
          </div>
          {/* Full width, so the arrow pins to the right edge instead of
           * floating in the middle of the pill. */}
          <Button
            href="/contact"
            data-lead=""
            onClick={() => setOpen(false)}
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

/** 54px square in the messenger's brand colour with a white glyph, like the
 * buttons in the lead dialog. */
function MessengerLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className={cn(
        "grid size-[54px] shrink-0 place-items-center rounded-btn text-paper transition-opacity duration-(--dur-fast) hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className,
      )}
    >
      {children}
    </a>
  );
}

/** "+998 90 123 45 67" -> "tel:+998901234567". */
function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
