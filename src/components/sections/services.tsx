import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { TrustCard } from "@/components/ui/trust-card";
import { trustPoints } from "@/lib/content";
import { SHOW_CATALOG } from "@/lib/site";

/**
 * Services (§5) — "Почему выбирают Varion Motors".
 *
 * Desktop puts Section Top and the cards side by side in one 80px-gap row,
 * split 0.8fr / 1fr; the header runs as a column with its copy and button at
 * the bottom. Tablet drops the header above the cards (64px gap). Below 810px
 * everything stacks.
 *
 * Four cards now (up from the original two), so from tablet up they run a
 * 2x2 grid instead of a single row — a row of four got too narrow next to
 * the header column. The cards themselves used to be Framer's five photo
 * tiles (`ServiceBlock`, still in `service-block.tsx` with its data in
 * `content.ts`'s `services`); swapped for plain icon/title/body cards to
 * carry the client's trust copy, which doesn't fit a bottom-left title over
 * a photo.
 *
 * NOTE: this section uses Framer's real content frame (1480px / 32px padding on
 * desktop). The shared `Container` is still the 1200px / 24px tablet frame, so
 * the other sections read narrower than the Framer original.
 */
export function Services() {
  return (
    <section id="why-us" className="bg-background">
      <Container className="flex max-w-[1480px] flex-col gap-8 tablet:gap-16 desktop:flex-row desktop:items-stretch desktop:gap-20 desktop:px-8">
        <SectionTop
          variant="aside"
          tag="Почему мы"
          title="Почему выбирают Varion Motors"
          body="Мы зарабатываем на доставке, а не на конкретной машине. Поэтому если проверка нашла скрытое ДТП или скрученный пробег — говорим об этом и ищем другую."
          action={
            SHOW_CATALOG
              ? { label: "Смотреть каталог", href: "/inventory" }
              : { label: "Получить подборку", href: "/contact", lead: true }
          }
          className="desktop:flex-[0.8]"
        />

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:flex-1">
          {trustPoints.map((point) => (
            <TrustCard key={point.title} {...point} />
          ))}
        </div>
      </Container>
    </section>
  );
}
