import { Container } from "@/components/ui/container";
import { HeroSocialProof } from "@/components/ui/hero-social-proof";
import { typo } from "@/lib/utils";

/**
 * Hero of /inventory (Framer node Q8H1j2olz) — a light hero, unlike the black
 * one on the landing page: 80vh on desktop, Background (#f2f2f2), content
 * padding 104/32/0 with the two columns bottom-aligned and 80px apart.
 * Below desktop Framer drops the fixed height and the columns stack.
 */
export function InventoryHero() {
  return (
    <section className="flex w-full flex-col items-center gap-2.5 overflow-clip bg-background desktop:h-[80vh]">
      <Container className="flex flex-1 flex-col items-start justify-end gap-8 pt-[90px] tablet:gap-10 tablet:pt-[104px] desktop:flex-row desktop:items-end desktop:gap-20">
        {/* Left */}
        <div className="flex w-full flex-col items-start justify-end gap-4 desktop:flex-1">
          <h1 className="w-full max-w-[550px] text-balance text-[34px] leading-[1.05] tracking-heading tablet:text-[42px] desktop:text-h1">
            {typo("Каталог автомобилей")}
          </h1>

          {/* Text */}
          <div className="flex w-full flex-col items-start justify-end gap-6">
            <p className="w-full max-w-[480px] text-body text-ink-muted">
              Модели из Кореи и Китая с ценой под ключ и сроком доставки.
              Подберём любую из них — или ту, которой здесь нет.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex w-full flex-row items-start gap-2 desktop:flex-1 desktop:flex-col desktop:items-end desktop:justify-end">
          <HeroSocialProof metric="20–30 дн." label="срок доставки" />
        </div>
      </Container>
    </section>
  );
}
