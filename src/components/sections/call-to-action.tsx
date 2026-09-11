import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { SectionTop } from "@/components/ui/section-top";

/**
 * Call To Action (§9).
 *
 * The photo fills the content frame (so it is inset by the page padding) with a
 * 24px radius, and the header sits centred on top behind 124px of vertical
 * padding. Unlike the other sections the button here is the Primary (light) one.
 */
export function CallToAction() {
  return (
    <section>
      <Container>
        <div className="relative isolate flex flex-col items-center overflow-hidden rounded-lg px-8 py-[124px] text-paper">
          <Media src="/media/cta/background.png" alt="" className="-z-1" />

          <SectionTop
            variant="center"
            tone="light"
            title="Начнём с расчёта"
            body="Расскажите, какая машина нужна и на какой бюджет. Пришлём варианты с ценой под ключ в течение [XX] часов — бесплатно и ни к чему не обязывает."
            action={{
              label: "Получить подборку",
              href: "/contact",
              variant: "primary",
              lead: true,
            }}
          />
        </div>
      </Container>
    </section>
  );
}
