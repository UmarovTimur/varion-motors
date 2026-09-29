import { CarsCard } from "@/components/ui/cars-card";
import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { carsAt } from "@/lib/content";
import { getRates } from "@/lib/rates";

/** Featured Vehicles (§4) */
export async function FeaturedVehicles() {
  const cars = carsAt(await getRates());
  return (
    <section id="portfolio" className="bg-background">
      <Container className="flex flex-col gap-8 tablet:gap-16 desktop:gap-20">
        <SectionTop
          tag="Авто под заказ"
          title="Каталог автомобилей"
          body="Модели из Кореи и Китая с ценой под ключ и сроком доставки. Подберём любую из них — или ту, которой здесь нет."
          action={{ label: "Весь каталог", href: "/inventory" }}
        />

        <div className="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
          {cars.slice(0, 6).map((car) => (
            <CarsCard key={car.slug} car={car} />
          ))}
        </div>
      </Container>
    </section>
  );
}
