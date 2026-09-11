import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { typo } from "@/lib/utils";

/**
 * «Бесплатная консультация» — a one-line offer banner between the portfolio and
 * the FAQ, right after the visitor has seen what we bring in.
 *
 * Built from the client's reference, which accents the first word in orange;
 * the site has no colour accent, so the accent is the house grey (Text Extra
 * Muted) against black, the pairing the tags and muted copy already use.
 * The button opens the lead dialog, like every other request CTA.
 */
export function Consultation() {
  return (
    <section aria-labelledby="consultation-title">
      <Container>
        <div className="flex flex-col items-start gap-6 rounded-lg bg-background-mid p-6 shadow-[0_24px_48px_-16px_rgb(0_0_0/0.14)] tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-10 tablet:px-10 tablet:py-8">
          <div className="flex max-w-[760px] flex-col gap-3">
            <h2
              id="consultation-title"
              className="text-h3 font-bold tablet:text-[2rem] tablet:leading-[1.15]"
            >
              <span className="text-ink-subtle">Бесплатная</span>{" "}
              {typo("консультация специалиста")}
            </h2>
            <p className="max-w-[600px] text-body text-ink-muted">
              {typo(
                "Поможем найти лучший вариант из Китая или Кореи, пришлём цену под ключ и расскажем все подробности.",
              )}
            </p>
          </div>
          <Button href="/contact" data-lead="" variant="secondary">
            Подобрать авто
          </Button>
        </div>
      </Container>
    </section>
  );
}
