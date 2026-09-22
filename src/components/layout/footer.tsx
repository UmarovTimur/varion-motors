import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactLink } from "@/components/ui/contact-link";
import { NavLink } from "@/components/ui/nav-link";
import { footerLinksLeft, footerLinksRight, legalLinks } from "@/lib/content";
import { site } from "@/lib/site";
import { typo } from "@/lib/utils";

/**
 * Footer — Template component, ported from the Framer node `Footer/Desktop`.
 *
 * Frame: background #F2F2F2, 1px top border in Greys/Grey, 8px padding, content
 * centred and capped at 1480px with 32px of its own padding.
 */
/** See the note by the address below: it is rendered in pieces on purpose. */
const [emailLocal, emailDomain] = site.email.split("@");

export function Footer() {
  return (
    <footer id="contacts" className="flex flex-col items-center overflow-clip border-t border-grey bg-background p-2">
      {/* Content */}
      <div className="relative z-1 flex w-full max-w-[1480px] flex-col gap-20 overflow-clip p-8">
        {/* Main */}
        <div className="flex flex-col gap-20 desktop:flex-row desktop:items-start">
          {/* Infos */}
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-h2">{typo("Начнём с расчёта")}</h2>
            {/* TextButtons */}
            <div className="flex flex-col items-start gap-6">
              <p className="max-w-[480px] text-body">{site.tagline}</p>
              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2">
                <Button href="/contact" data-lead="" variant="secondary">
                  Получить подборку
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

            {/* Реквизиты и контакты */}
            <div className="flex flex-col gap-1 text-body text-ink-muted">
              <p>{site.legalName}</p>
              <p>{site.address}</p>
              <p>{site.phones.join(", ")}</p>
              <p>
                <a href={site.telegram}>Telegram</a> ·{" "}
                {/* Cloudflare's Email Address Obfuscation (Scrape Shield) finds
                 * any address in the HTML and swaps it for a placeholder link
                 * in flight, so what React hydrates is not what it rendered and
                 * the subtree throws a mismatch. Splitting the address across
                 * elements is what defeats the scan — its own <!--email_off-->
                 * opt-out cannot work here, since Cloudflare eats the comments
                 * and the innerHTML then differs from what React expects. */}
                <span>{emailLocal}</span>
                <span>@</span>
                <span>{emailDomain}</span>
              </p>
            </div>
          </div>

          {/* Links — 0.8fr against the 1fr Infos column. Framer keeps the two
           * columns side by side even on phone, but its labels are single
           * English words; "Как мы работаем" in a 24px-padded pill cannot fit
           * two columns into a 310px content width, so below tablet the two
           * navs stack into one list instead of running off the right edge. */}
          <div className="flex flex-col gap-4 tablet:flex-row tablet:gap-16 desktop:flex-[0.8] desktop:items-start">
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
                © 2026 {site.name} — все права защищены
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

            {/* Mention — legal links. Framer separates them with "|", which
             * only works while they sit on one line: these labels are long
             * enough to wrap on every width, leaving a pipe dangling at the
             * start or end of a row. Spacing separates them instead. */}
            <div className="flex flex-1 flex-col items-start gap-1 tablet:flex-row tablet:flex-wrap tablet:items-center tablet:gap-x-5 tablet:gap-y-1 desktop:justify-end">
              {legalLinks.map((link) => (
                <span key={link.href} className="flex items-center gap-2">
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
