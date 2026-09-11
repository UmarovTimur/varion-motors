import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { steps } from "@/lib/content";
import { typo } from "@/lib/utils";

/**
 * «Как мы работаем» — шесть шагов от заявки до ключей.
 *
 * Срок в шаге 5 и в подписи зависит от страны получения: маршрут и очередь на
 * границе у Узбекистана и Кыргызстана не совпадают, поэтому цифра подставляется
 * из выбранной страны, а не общая (переключателя страны пока нет — см. TODO).
 */
export function Steps() {
  return (
    <section id="how-it-works" className="bg-background">
      <Container className="flex flex-col gap-12 tablet:gap-16 desktop:gap-20">
        <SectionTop
          tag="Как мы работаем"
          title="Шесть шагов от заявки до ключей"
          body="От заявки до ключей — [XX] дней. На каждом этапе присылаем фото и статус в Telegram, так что вы всегда знаете, где машина."
          action={{ label: "Написать в Telegram", href: "/contact" }}
        />

        <ol className="grid gap-8 tablet:grid-cols-2 desktop:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col rounded-[20px] bg-background-mid p-1"
            >
              {/* Framer `Trade-in Step Card`: white pill (number + title) inset 4px, description sits directly on the card below it. */}
              <div className="flex items-center rounded-md bg-background-light p-1">
                <span className="grid size-[73px] shrink-0 place-items-center rounded-md bg-black">
                  <span className="text-body-xl text-text-white">{i + 1}</span>
                </span>
                <h3 className="flex-1 px-6 py-2 text-body-l">
                  {typo(step.title)}
                </h3>
              </div>
              <p className="max-w-[480px] p-6 text-body text-ink-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
