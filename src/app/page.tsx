import { Hero } from "@/components/sections/hero";
import { Steps } from "@/components/sections/steps";
import { Services } from "@/components/sections/services";
import { FeaturedVehicles } from "@/components/sections/featured-vehicles";
import { Consultation } from "@/components/sections/consultation";
import { Faq } from "@/components/sections/faq";
import { Team } from "@/components/sections/team";
import { CallToAction } from "@/components/sections/call-to-action";

/**
 * Порядок блоков лендинга: первый экран → как мы работаем → почему мы →
 * портфолио → консультация → частые вопросы → о команде → финальный CTA.
 *
 * Не хватает двух блоков, для которых нет компонентов: калькулятор цены под
 * ключ (идёт сразу после первого экрана) и разбор проверки одной машины
 * (между портфолио и FAQ). Блоки Testimonials и Blog сняты с главной: отзывов
 * пока нет, а блога в структуре лендинга нет — сами компоненты остались.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Steps />
      <Services />
      <FeaturedVehicles />
      <Consultation />
      <Faq />
      <Team />
      <CallToAction />
    </>
  );
}
