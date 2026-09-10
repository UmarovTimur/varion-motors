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
    <section className="bg-background">
      <Container className="flex flex-col gap-12 tablet:gap-16 desktop:gap-20">
        <SectionTop
          tag="Как мы работаем"
          title="Шесть шагов от заявки до ключей"
          body="От заявки до ключей — [XX] дней. На каждом этапе присылаем фото и статус в Telegram, так что вы всегда знаете, где машина."
          action={{ label: "Написать в Telegram", href: "/contact" }}
        />

        <ol className="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col gap-4 rounded-card bg-background-mid p-6"
            >
              <span className="text-body-xs text-ink-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Bold on request: the project's Heading 5 is medium (500) everywhere else. */}
              <h3 className="text-h5 font-bold">{typo(step.title)}</h3>
              <p className="text-body text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
