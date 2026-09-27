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
        <div className="relative isolate flex flex-col items-center overflow-hidden rounded-lg px-6 py-16 text-paper tablet:px-8 tablet:py-[124px]">
          <Media src="/media/cta/background.png" alt="" className="-z-1" />

          <SectionTop
            variant="center"
            tone="light"
            title="Подберём машину под ваш бюджет"
            body="Расскажите, какая машина нужна и на какой бюджет. Пришлём варианты с ценой под ключ в рабочее время — бесплатно и ни к чему не обязывает."
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
