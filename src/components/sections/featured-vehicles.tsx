import { CarsCard } from "@/components/ui/cars-card";
import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { cars } from "@/lib/content";

/** Featured Vehicles (§4) */
export function FeaturedVehicles() {
  return (
    <section id="portfolio" className="bg-background">
      <Container className="flex flex-col gap-12 tablet:gap-16 desktop:gap-20">
        <SectionTop
          tag="Портфолио"
          title="Машины, которые мы привезли"
          body="Каждая карточка — закрытая сделка: маршрут, срок доставки и итоговая цена под ключ. Так же будет выглядеть и ваша."
          action={{ label: "Все машины", href: "/inventory" }}
        />

        <div className="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
          {cars.map((car) => (
            <CarsCard key={car.slug} car={car} />
          ))}
        </div>
      </Container>
    </section>
  );
}
