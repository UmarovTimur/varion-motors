import type { Metadata } from "next";
import { CarsCard } from "@/components/ui/cars-card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { cars } from "@/lib/content";

export const metadata: Metadata = { title: "Inventory" };

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        tag="Inventory"
        title="The Current Collection"
        body="Every vehicle is inspected, history-verified and ready for immediate viewing."
      />
      <section className="bg-surface pb-24">
        <Container>
          <div className="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
            {cars.map((car) => (
              <CarsCard key={car.slug} car={car} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
