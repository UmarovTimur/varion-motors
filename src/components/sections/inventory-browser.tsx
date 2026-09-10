"use client";

import { useMemo, useState } from "react";
import { CarsCard } from "@/components/ui/cars-card";
import { Container } from "@/components/ui/container";
import { Tab } from "@/components/ui/tab";
import {
  FilterCheckbox,
  FilterField,
  FilterInput,
  FilterSelect,
} from "@/components/ui/filter-field";
import {
  bodyTypes,
  cars,
  cities,
  countries,
  priceRanges,
  type BodyType,
} from "@/lib/content";

/**
 * Inventory (Framer node C5xyaajgW) — the browsing section of /inventory.
 *
 * Content is one row on desktop (gap 80, max 1480/32) and a single column
 * below (gap 64 on tablet, 48 on phone). Inside it:
 *  - `Filters Bar` — 250px, sticky at 94px on desktop only, gap 16.
 *  - `Container` — gap 80, holding the sticky `Tabs Filter` (top 70, painted in
 *    the section background so cards scroll under it) over the card grid
 *    (2 columns, gap 24; one column on phone).
 *
 * Framer's own filters are Make / Condition / Year / Max Mileage; the facets
 * here are the ones a portfolio of closed deals actually has (see content.ts).
 */
export function InventoryBrowser() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [ranges, setRanges] = useState<string[]>([]);
  const [bodyType, setBodyType] = useState<BodyType | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const from = Number(yearFrom);
    const to = Number(yearTo);

    return cars.filter((car) => {
      if (q && !car.name.toLowerCase().includes(q)) return false;
      if (country && car.country !== country) return false;
      if (city && car.city !== city) return false;
      if (yearFrom && Number.isFinite(from) && car.year < from) return false;
      if (yearTo && Number.isFinite(to) && car.year > to) return false;
      if (bodyType && car.bodyType !== bodyType) return false;

      /* A car with no price yet (the placeholder state) passes every range,
       * so an unpriced deal is never hidden by a filter it cannot answer. */
      if (ranges.length > 0 && car.price > 0) {
        const inSome = priceRanges.some(
          (range) =>
            ranges.includes(range.id) &&
            car.price >= ("min" in range ? range.min : 0) &&
            car.price < ("max" in range ? range.max : Infinity),
        );
        if (!inSome) return false;
      }

      return true;
    });
  }, [query, country, city, yearFrom, yearTo, ranges, bodyType]);

  const toggleRange = (id: string) =>
    setRanges((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );

  return (
    <section id="inventory" className="bg-background">
      <Container className="flex flex-col items-start gap-12 tablet:gap-16 desktop:flex-row desktop:gap-20">
        {/* Filters Bar */}
        <div className="flex w-full flex-col items-start gap-4 desktop:sticky desktop:top-[94px] desktop:z-(--z-sticky) desktop:w-[250px] desktop:shrink-0">
          {/* Title & Search */}
          <div className="flex w-full flex-col items-start gap-4">
            <h2 className="text-h3">Фильтры</h2>
            <FilterInput
              type="search"
              placeholder="Поиск по названию…"
              aria-label="Поиск по названию"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex w-full flex-col items-start gap-4">
            {/* Wrap — a column, except on tablet where the bar runs full width */}
            <div className="flex w-full flex-col items-center gap-4 tablet:flex-row desktop:flex-col">
              <FilterField label="Страна">
                <FilterSelect
                  options={countries}
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                />
              </FilterField>
              <FilterField label="Город выдачи">
                <FilterSelect
                  options={cities}
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </FilterField>
            </div>

            {/* Wrap */}
            <div className="flex w-full flex-row items-center gap-4">
              <FilterField label="Год от">
                <FilterInput
                  type="number"
                  inputMode="numeric"
                  placeholder="2020"
                  value={yearFrom}
                  onChange={(event) => setYearFrom(event.target.value)}
                />
              </FilterField>
              <FilterField label="Год до">
                <FilterInput
                  type="number"
                  inputMode="numeric"
                  placeholder="2026"
                  value={yearTo}
                  onChange={(event) => setYearTo(event.target.value)}
                />
              </FilterField>
            </div>
          </div>

          {/* Price Range */}
          <fieldset className="flex w-full flex-col items-start gap-2">
            <legend className="text-body">Цена под ключ</legend>
            {priceRanges.map((range) => (
              <FilterCheckbox
                key={range.id}
                label={range.label}
                checked={ranges.includes(range.id)}
                onChange={() => toggleRange(range.id)}
              />
            ))}
          </fieldset>
        </div>

        {/* Container */}
        <div className="flex w-full flex-col items-start gap-20 desktop:flex-1">
          {/* Tabs Filter — z-sticky, not z-decor: the Cars Card arrow patch is
           * z-content (10) and would otherwise scroll over the pinned bar. */}
          <div className="sticky top-[70px] z-(--z-sticky) flex w-full flex-col items-start gap-2 bg-background">
            <div className="grid w-full grid-cols-2 gap-2 tablet:grid-cols-5">
              <Tab active={bodyType === null} onClick={() => setBodyType(null)}>
                Все
              </Tab>
              {bodyTypes.map((type) => (
                <Tab
                  key={type}
                  active={bodyType === type}
                  onClick={() => setBodyType(type)}
                >
                  {type}
                </Tab>
              ))}
            </div>
          </div>

          {/* Inventories */}
          {results.length > 0 ? (
            <div className="grid w-full grid-cols-1 gap-6 tablet:grid-cols-2">
              {results.map((car) => (
                <CarsCard key={car.slug} car={car} />
              ))}
            </div>
          ) : (
            <p className="text-body text-ink-muted">
              Под эти фильтры пока ничего нет. Снимите часть условий — или
              напишите нам, и мы найдём такую машину под заказ.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
