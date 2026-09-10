import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { cars, formatPrice } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);
  return { title: car?.name ?? "Vehicle" };
}

export default async function CarPage({ params }: Params) {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);
  if (!car) notFound();

  return (
    <section className="bg-surface pt-[150px] pb-24">
      <Container className="flex flex-col gap-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-card">
          <Media src={car.image} alt={car.name} priority />
          {car.badge ? (
            <span className="absolute top-6 left-6 rounded-full bg-paper px-4 py-2 text-body-xs font-medium">
              {car.badge}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-8 desktop:flex-row desktop:items-start desktop:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-h1">
              {car.name}
            </h1>
            <p className="text-body-xl text-ink-subtle">{car.year}</p>
          </div>
          <div className="flex flex-col items-start gap-6">
            <p className="text-metric font-medium tracking-normal">
              {formatPrice(car.price)}
            </p>
            <Button href="/contact">Schedule Test Drive</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
