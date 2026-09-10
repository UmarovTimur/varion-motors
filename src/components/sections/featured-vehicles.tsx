import { CarsCard } from "@/components/ui/cars-card";
import { Container } from "@/components/ui/container";
import { SectionTop } from "@/components/ui/section-top";
import { cars } from "@/lib/content";

/** Featured Vehicles (§4) */
export function FeaturedVehicles() {
  return (
    <section className="bg-surface py-24">
      <Container className="flex flex-col gap-14">
        <SectionTop
          tag="Featured cars"
          title="Performance Meets Prestige"
          body="Handpicked from our collection. Each one represents the pinnacle of automotive excellence today."
          action={{ label: "Browse Inventory", href: "/inventory" }}
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
