import { Button } from "@/components/ui/button";
import { HeroVideo } from "@/components/ui/hero-video";
import { site } from "@/lib/site";
import { typo } from "@/lib/utils";

/**
 * Hero (§3).
 * Full-bleed section holding a black container inset 8px on the sides and
 * bottom, offset from the top to clear the fixed navbar plus a 16px gap:
 * 96px on tablet+ (navbar bottom at 80px = 8px top offset + 72px tall row,
 * border included) and 82px below that, where the navbar itself is shorter
 * (smaller logo/icons, tighter padding).
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
      className="flex h-auto min-h-[100svh] w-full flex-col items-center justify-start gap-2.5 overflow-clip bg-background px-2 pt-[82px] pb-2 tablet:min-h-screen tablet:pt-24"
    >
      {/* Container */}
      <div className="relative z-1 flex w-full flex-1 items-center justify-center overflow-clip rounded-md bg-black">
        {/* Background */}
        <HeroVideo className="pointer-events-none absolute inset-0 z-0 size-full object-cover object-center" />
        {/* DarkOverlay — 60%, a step darker than Framer's Black 50% token. */}
        <div aria-hidden className="absolute inset-0 z-0 bg-black/60" />

        {/* Content */}
        {/* `self-stretch` rather than `h-full`: the parent's height comes from
         * `flex-1`, which Chrome treats as indefinite, so a percentage height
         * here silently collapsed back to the content height. */}
        <div className="relative z-1 flex w-full max-w-[1480px] flex-1 flex-col items-center justify-center gap-8 self-stretch overflow-clip rounded-md tablet:flex-row tablet:gap-10 desktop:gap-20">
          {/* Left — takes 1.5 of the row from tablet up so the enlarged
           * headline has room to run wide before it wraps. */}
          <div className="flex w-full max-w-[1200px] flex-1 flex-col items-start justify-between gap-8 overflow-clip p-5 tablet:flex-[1.5] tablet:p-8">
            <h1
              id="hero-title"
              /* Deliberately larger and wider than Framer's Heading 1, which
               * is a flat 56px/550px on desktop and tablet alike. From tablet up
               * the size is fluid (40 -> 68px) rather than stepped: at 810 a
               * stepped 54px wrapped this headline into six lines and pushed the
               * column past the 100vh frame. */
              className="w-full max-w-[820px] text-[40px] leading-[1.02] text-text-white uppercase tablet:text-[clamp(2.5rem,4.4vw,4rem)]"
            >
              {typo("Авто под заказ из Кореи, Китая с доставкой по всему СНГ")}
            </h1>

            {/* TextButton */}
          <div className="flex w-full flex-col items-start justify-end gap-6">
              <p className="w-full max-w-[480px] text-body text-text-white">
                Подбираем, проверяем и привозим по всему СНГ. Вы получаете
                машину с документами и полным расчётом на руках.
              </p>

              {/* Буллеты */}
              {/* <ul className="flex w-full max-w-[480px] flex-col gap-2 text-body text-text-white">
                <li>Прозрачная цена под ключ — без сюрпризов по дороге</li>
                <li>Проверка до покупки: аукционный лист, фото, диагностика</li>
                <li>Срок от 20 до 30 дней от оплаты до выдачи</li>
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

        </div>
      </div>
    </section>
  );
}
