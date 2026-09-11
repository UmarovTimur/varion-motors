import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { ServiceBlock } from "@/components/ui/service-block";
import { services } from "@/lib/content";

/**
 * Services (§5).
 *
 * Desktop puts Section Top and the tiles side by side in one 80px-gap row,
 * split 0.8fr / 1fr, both 636px tall; the header runs as a column with its copy
 * and button at the bottom. Tablet drops the header above the tiles (64px gap)
 * and the row shrinks to 587px. Below 810px everything stacks into 224px tiles.
 *
 * The tiles themselves are two equal columns with a 24px gap — two on the left,
 * three on the right, each column splitting its height evenly.
 *
 * Framer's Block 03 ("Verified History & Trusted Brand") is the black tile with
 * the brand-logo marquee inside; the marquee is not ported yet.
 *
 * NOTE: this section uses Framer's real content frame (1480px / 32px padding on
 * desktop). The shared `Container` is still the 1200px / 24px tablet frame, so
 * the other sections read narrower than the Framer original.
 */
export function Services() {
  const [inspection, history, warranty, detailing, financing] = services;
  const tile = "h-[224px] tablet:h-auto tablet:flex-1";

  return (
    <section id="why-us" className="bg-background">
      <Container className="flex max-w-[1480px] flex-col gap-12 tablet:gap-16 desktop:flex-row desktop:items-stretch desktop:gap-20 desktop:px-8">
        <SectionTop
          variant="aside"
          tag="Почему мы"
          title="На чём держится наша работа"
          body="Мы зарабатываем на доставке, а не на конкретной машине. Поэтому если проверка нашла скрытое ДТП или скрученный пробег — говорим об этом и ищем другую."
          action={{ label: "Посмотреть портфолио", href: "/inventory" }}
          className="desktop:flex-[0.8]"
        />

        {/* Container */}
        <div className="flex flex-col gap-6 tablet:h-[587px] tablet:flex-row tablet:items-end desktop:h-[636px] desktop:flex-1">
          {/* Left */}
          <div className="flex flex-1 flex-col gap-6 tablet:h-full">
            <ServiceBlock {...inspection} className={tile} />
            <ServiceBlock {...detailing} className={tile} />
          </div>

          {/* Right */}
          <div className="flex flex-1 flex-col gap-6 tablet:h-full">
            <ServiceBlock {...history} className={tile} />
            <ServiceBlock {...warranty} className={tile} />
            <ServiceBlock {...financing} className={tile} />
          </div>
        </div>
      </Container>
    </section>
  );
}
