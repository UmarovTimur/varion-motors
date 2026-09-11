import Image from "next/image";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { HeroSocialProof } from "@/components/ui/hero-social-proof";
import { typo } from "@/lib/utils";

/**
 * Hero (§3).
 * Full-bleed section holding a black container inset 8px on the sides and
 * bottom, 70px from the top so it clears the fixed navbar.
 *
 * Layout below desktop follows §7: the columns stack on phone, the gap steps
 * 32 -> 40 -> 80, and the height drops the fixed 100vh for 100svh so the mobile
 * address bar cannot clip it.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="flex h-auto min-h-[100svh] w-full flex-col items-center justify-start gap-2.5 overflow-clip bg-background px-2 pt-[70px] pb-2 tablet:min-h-screen"
    >
      {/* Container */}
      <div className="relative z-1 flex w-full flex-1 items-center justify-center overflow-clip rounded-md bg-black">
        {/* Background */}
        <Image
          src="/media/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover object-center"
        />
        {/* DarkOverlay — 60%, a step darker than Framer's Black 50% token. */}
        <div aria-hidden className="absolute inset-0 z-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-1 flex h-full w-full max-w-[1480px] flex-1 flex-col items-center justify-center gap-8 overflow-clip rounded-md tablet:flex-row tablet:gap-10 desktop:gap-20">
          {/* Left — takes 1.5 of the row from tablet up so the enlarged
           * headline has room to run wide before it wraps. */}
          <div className="flex w-full max-w-[1200px] flex-1 flex-col items-start justify-between gap-8 overflow-clip p-5 tablet:h-full tablet:flex-[1.5] tablet:p-8">
            <h1
              id="hero-title"
              /* Deliberately larger and wider than Framer's Heading 1, which
               * is a flat 56px/550px on desktop and tablet alike. From tablet up
               * the size is fluid (40 -> 68px) rather than stepped: at 810 a
               * stepped 54px wrapped this headline into six lines and pushed the
               * column past the 100vh frame. */
              className="w-full max-w-[820px] text-[40px] leading-[1.02] text-text-white tablet:text-[clamp(2.5rem,4.4vw,4rem)]"
            >
              {typo("Автомобиль из Китая и Кореи в Узбекистан и Кыргызстан")}
            </h1>

            {/* TextButton */}
            <div className="flex w-full flex-col items-start justify-end gap-6">
              <p className="w-full max-w-[480px] text-body text-text-white">
                Подбираем, проверяем и привозим в Ташкент и Бишкек. Вы получаете
                машину с документами и итоговой ценой, известной заранее.
              </p>

              {/* Буллеты */}
              {/* <ul className="flex w-full max-w-[480px] flex-col gap-2 text-body text-text-white">
                <li>Фиксированная цена под ключ — без доплат по дороге</li>
                <li>Проверка до покупки: аукционный лист, фото, диагностика</li>
                <li>Срок [XX] дней от оплаты до выдачи</li>
              </ul> */}

              {/* The primary label is 344px wide, more than a 390px phone
               * leaves inside the frame. Below tablet the pills therefore keep
               * their natural width but let the label wrap onto a second line
               * and grow in height — stretching them full width instead left a
               * dead gap between the label and the arrow. */}
              <div className="flex w-full flex-wrap items-center gap-2">
                <Button
                  href="/contact"
                  data-lead=""
                  variant="primary"
                  className="max-tablet:h-auto max-tablet:min-h-[54px] max-tablet:max-w-full max-tablet:py-1 max-tablet:whitespace-normal"
                >
                  Рассчитать под ключ
                </Button>
                <Button
                  href={site.telegram}
                  variant="secondary"
                  className="max-tablet:h-auto max-tablet:min-h-[54px] max-tablet:max-w-full max-tablet:py-1 max-tablet:whitespace-normal"
                >
                  Написать в Telegram
                </Button>
              </div>
            </div>
          </div>

          {/* Right */}
          {/* Framer puts the Search Bar at the top of this column; it is
           * hidden for now, so the column just bottom-aligns the pills.
           * The component itself stays in ui/search-bar.tsx. */}
          <div className="flex w-full flex-1 flex-col items-start justify-end gap-2.5 p-5 tablet:h-full tablet:items-end tablet:p-8">
            {/* SocialProof */}
            {/* Framer stacks the two pills on phone as well; side by side they
             * add up to 429px and get clipped on a 390px screen. */}
            <div className="flex w-full flex-col items-start justify-start gap-2.5 tablet:items-end">
              {/* <HeroSocialProof metric="[XX]" label="авто доставлено" />
              <HeroSocialProof metric="[XX] дн." label="средний срок" /> */}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
