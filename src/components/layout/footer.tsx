import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactLink } from "@/components/ui/contact-link";
import { NavLink } from "@/components/ui/nav-link";
import { footerLinksLeft, footerLinksRight, legalLinks } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Footer — Template component, ported from the Framer node `Footer/Desktop`.
 *
 * Frame: background #F2F2F2, 1px top border in Greys/Grey, 8px padding, content
 * centred and capped at 1480px with 32px of its own padding.
 */
export function Footer() {
  return (
    <footer className="flex flex-col items-center overflow-clip border-t border-grey bg-background p-2">
      {/* Content */}
      <div className="relative z-1 flex w-full max-w-[1480px] flex-col gap-20 overflow-clip p-8">
        {/* Main */}
        <div className="flex flex-col gap-20 desktop:flex-row desktop:items-start">
          {/* Infos */}
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-h2">Ready to test your dream car?</h2>
            {/* TextButtons */}
            <div className="flex flex-col items-start gap-6">
              <p className="max-w-[480px] text-body">{site.tagline}</p>
              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2">
                <Button href="/contact" variant="secondary">
                  Contact us
                </Button>
                {/* ContactLinks */}
                <div className="flex items-start gap-2">
                  <ContactLink
                    icon="Location"
                    href={site.mapsUrl}
                    ariaLabel="Maps"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Links — 0.8fr against the 1fr Infos column */}
          <div className="flex gap-16 desktop:flex-[0.8] desktop:items-start">
            <nav className="flex flex-1 flex-col items-start gap-4">
              {footerLinksLeft.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <nav className="flex flex-1 flex-col items-start gap-4">
              {footerLinksRight.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-2">
          {/* BrandName — Framer fits the wordmark to the container width, so the
            * size tracks the container rather than the viewport. */}
          <div className="@container w-full">
            <p
              aria-hidden
              className="w-full text-center font-display text-[12.7cqw] leading-[1.1] font-semibold tracking-normal whitespace-nowrap"
            >
              {site.name}
            </p>
          </div>

          {/* BottomInfos */}
          <div className="flex w-full flex-col gap-8 overflow-clip text-body opacity-60 desktop:flex-row desktop:items-start desktop:gap-20">
            {/* CopyrightMention */}
            <div className="flex flex-1 flex-col items-start gap-1">
              <p className="text-ink-muted">
                © 2026 {site.name} - ALL RIGHT RESERVED
              </p>
              <p className="flex flex-wrap items-center gap-1">
                <span>Made By</span>
                <a
                  href="https://marketplace.framer.com/@akem-design/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Akem
                </a>
                <span>in</span>
                <a
                  href="https://framer.link/akem-design"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Framer
                </a>
              </p>
            </div>

            {/* Mention — legal links */}
            <div className="flex flex-1 flex-wrap items-center gap-2 desktop:justify-end">
              {legalLinks.map((link, i) => (
                <span key={link.href} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden>|</span> : null}
                  <Link href={link.href} target="_blank">
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
