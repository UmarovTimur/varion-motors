import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { CallToAction } from "@/components/sections/call-to-action";
import { FeaturedVehicles } from "@/components/sections/featured-vehicles";
import { CarGallery } from "@/components/ui/car-gallery";
import { Container } from "@/components/ui/container";
import { CopyButton } from "@/components/ui/copy-button";
import { Media } from "@/components/ui/media";
import { Tag } from "@/components/ui/tag";
import { VideoPlayer } from "@/components/ui/video-player";
import { cars, type Spec } from "@/lib/content";
import {
  AlignLeft,
  Calendar,
  CarFront,
  Fuel,
  Tag as TagIcon,
  User,
} from "lucide-react";
import { typo } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);
  return { title: car ? `${car.name} — ${car.badge ?? "кейс"}` : "Кейс" };
}

/** Quick Infos tile: 44px black icon square, 16px label, on white, radius 16. */
function QuickTile({
  icon: Icon,
  value,
  className,
}: {
  icon: typeof Calendar;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-[52px] flex-1 items-center gap-2 rounded-md bg-paper p-1 ${className ?? ""}`}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-icon bg-black">
        <Icon className="size-5 text-surface" aria-hidden />
      </span>
      <span className="truncate pr-2 text-body">{value}</span>
    </div>
  );
}

/** Specs tile: 330x69 on #FAFAFA, label over value, both centred. */
function SpecTile({ spec }: { spec: Spec }) {
  return (
    <div className="flex flex-col items-center justify-between gap-1 rounded-md bg-background-mid py-3">
      <span className="text-body font-medium">{spec.label}</span>
      <span className="text-body-xs text-ink-muted">{spec.value}</span>
    </div>
  );
}

export default async function CarPage({ params }: Params) {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);
  if (!car) notFound();

  const [price, ...quick] = car.quick ?? [];
  const quickIcons = [Calendar, CarFront, Fuel, User];

  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <Container className="flex flex-col gap-10 pt-[104px] desktop:flex-row desktop:items-center desktop:gap-20">
          {/* Left */}
          <div className="flex flex-col items-start gap-4 desktop:flex-[501]">
            {/* Title */}
            <div className="flex flex-col items-start gap-4">
              {car.preHeader ? <Tag>{car.preHeader.join(" - ")}</Tag> : null}
              <h1 className="text-h1">{typo(car.name)}</h1>
            </div>

            {/* Container */}
            <div className="flex flex-col items-start gap-8">
              {/* Text & Button */}
              <div className="flex flex-col items-start gap-6">
                {car.description ? (
                  <p className="max-w-[480px] text-body text-ink-muted">
                    {car.description}
                  </p>
                ) : null}
                <Button href="/contact" variant="secondary">
                  Хочу такую же
                </Button>
              </div>

              {/* VIN & Stock */}
              <div className="flex flex-wrap items-center gap-2">
                {car.vin ? (
                  <CopyButton label="Копировать VIN" value={car.vin} />
                ) : null}
                {car.dealNo ? (
                  <CopyButton label="Копировать № сделки" value={car.dealNo} />
                ) : null}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex flex-col items-end gap-8 desktop:flex-[835]">
            <div className="relative aspect-[835/387] w-full overflow-hidden rounded-card">
              <Media src={car.image} alt={car.name} priority />
            </div>

            {/* Quick Infos */}
            {car.quick ? (
              <div className="flex w-[280px] flex-col gap-2 rounded-md bg-background-mid p-1 desktop:absolute desktop:right-4 desktop:bottom-4">
                <QuickTile icon={TagIcon} value={price.value} />
                <div className="grid grid-cols-2 gap-1">
                  {quick.map((item, i) => (
                    <QuickTile
                      key={item.label}
                      icon={quickIcons[i] ?? Calendar}
                      value={item.value}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Inventory */}
      <section className="bg-background">
        <Container className="flex flex-col gap-12 tablet:gap-16 desktop:gap-20">
          {/* Gallery & Specs */}
          <div className="flex flex-col gap-12 desktop:flex-row desktop:items-start desktop:gap-20">
            <CarGallery
              images={car.gallery?.length ? car.gallery : [car.image]}
              alt={car.name}
              className="desktop:flex-[668]"
            />

            {/* Specs */}
            <div className="flex flex-col items-start gap-8 desktop:flex-[668]">
              <div className="flex flex-col items-start gap-4">
                <Tag>Детали сделки</Tag>
                <h2 className="text-h2">{typo("Характеристики")}</h2>
              </div>
              <div className="grid w-full grid-cols-2 gap-2">
                {car.specs?.map((spec) => (
                  <SpecTile key={spec.label} spec={spec} />
                ))}
              </div>
            </div>
          </div>

          {/* Видео осмотра — не из Framer: в оригинале видеоблока нет */}
          {car.video ? (
            <div className="flex w-full flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-4">
                <Tag>Видео осмотра</Tag>
                <h2 className="text-h2">{typo("Как машина выглядит вживую")}</h2>
              </div>
              <VideoPlayer
                src={car.video.src}
                poster={car.video.poster ?? car.image}
                label={car.name}
              />
            </div>
          ) : null}

          {/* Accordions */}
          {car.details ? (
            <Accordion.Root type="single" collapsible className="w-full">
              {car.details.map((item) => (
                <Accordion.Item
                  key={item.title}
                  value={item.title}
                  className="border-b border-grey"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between gap-6 py-6 text-left text-h5">
                      {item.title}
                      <AlignLeft
                        className="size-5 shrink-0 text-ink transition-transform duration-(--dur-base) ease-out group-data-[state=open]:rotate-180"
                        aria-hidden
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="max-w-[900px] pb-6 text-body text-ink-muted">
                      {item.body}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          ) : null}
        </Container>
      </section>

      {/* Framer puts the CTA and the portfolio row under every case page */}
      <CallToAction />
      <FeaturedVehicles />
    </>
  );
}
