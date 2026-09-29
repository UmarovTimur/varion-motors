"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { BY, KG, KZ, RU, TJ, UZ } from "country-flag-icons/react/3x2";
import { Button } from "@/components/ui/button";
import { Tab } from "@/components/ui/tab";
import { Tag } from "@/components/ui/tag";
import {
  type CarPricing,
  type CostLine,
  type DestinationId,
  destinationsFor,
  formatMoney,
  koreaLines,
  type Rates,
  sumUsd,
  toUsd,
} from "@/lib/pricing";
import { typo } from "@/lib/utils";

/** SVG, not emoji: Windows renders flag emoji as two bare letters. */
const flags: Record<DestinationId, typeof RU> = {
  ru: RU,
  uz: UZ,
  kz: KZ,
  by: BY,
  kg: KG,
  tj: TJ,
};

/** "Курс ЦБ РФ на 29.09.2026: 1 $ = 84,41 ₽, 1 $ = 1 352 ₩." */
function rateNote(rates: Rates) {
  const [y, m, d] = rates.asOf.split("-");
  const rub = rates.RUB.toFixed(2).replace(".", ",");
  const krw = formatMoney(rates.KRW, "KRW");
  return rates.source === "cbr"
    ? `Курс ЦБ РФ на ${d}.${m}.${y}: 1 $ = ${rub} ₽, 1 $ = ${krw}.`
    : `Пересчёт по курсу: 1 $ = ${rub} ₽, 1 $ = ${krw}.`;
}

/** Rounded up to $100 — a turnkey quote, not an invoice. */
const roundUp = (usd: number) => Math.ceil(usd / 100) * 100;

function Line({ line, rates }: { line: CostLine; rates: Rates }) {
  const known = line.amount !== null;
  return (
    <li className="flex items-baseline gap-3 py-3">
      <span className="flex-1 text-body tablet:flex-none">{line.label}</span>
      <span
        aria-hidden
        className="mb-1 hidden min-w-4 flex-1 self-end border-b border-dotted border-grey-dark/60 tablet:block"
      />
      <span className="flex shrink-0 flex-col items-end text-right whitespace-nowrap">
        <span
          className={
            known ? "text-body font-medium" : "text-body text-ink-subtle"
          }
        >
          {known ? formatMoney(line.amount!, line.currency) : "по запросу"}
        </span>
        {known && line.currency !== "USD" ? (
          <span className="text-body-xs text-ink-subtle">
            ≈ {formatMoney(toUsd(line.amount!, line.currency, rates), "USD")}
          </span>
        ) : null}
      </span>
    </li>
  );
}

function Group({
  step,
  title,
  lines,
  rates,
}: {
  step: number;
  title: string;
  lines: CostLine[];
  rates: Rates;
}) {
  const subtotal = sumUsd(lines, rates);
  return (
    <div className="rounded-md bg-background-mid p-5 tablet:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-grey pb-4">
        <div className="flex items-center gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-body-xs text-paper">
            {step}
          </span>
          <h3 className="text-h5">{title}</h3>
        </div>
        <span className="shrink-0 text-body whitespace-nowrap text-ink-muted">
          {subtotal !== null ? `≈ ${formatMoney(subtotal, "USD")}` : "—"}
        </span>
      </div>
      <ul className="divide-y divide-grey/60">
        {lines.map((line) => (
          <Line key={line.label} line={line} rates={rates} />
        ))}
      </ul>
    </div>
  );
}

/**
 * Destination tabs with delivery and customs lines per country. Off for now:
 * the page shows only the costs in Korea, and delivery and customs are quoted
 * per request. The data and markup stay — flip this to bring them back.
 */
const SHOW_DESTINATIONS = false;

/**
 * "Цена под ключ" on the car page: pick a destination, see the Korean costs,
 * delivery and customs lines, and the USD total. A destination with any
 * unpriced line shows "рассчитаем" instead of a total that would be wrong.
 * With SHOW_DESTINATIONS off it is just the Korean costs and their total.
 */
export function PriceBreakdown({
  pricing,
  carName,
  rates,
}: {
  pricing: CarPricing;
  carName: string;
  /** From `getRates()` on the server. */
  rates: Rates;
}) {
  const destinations = destinationsFor(pricing);
  const [destId, setDestId] = useState<DestinationId>(destinations[0].id);
  const dest = destinations.find((d) => d.id === destId) ?? destinations[0];

  const korea = koreaLines(pricing);
  const total = sumUsd(
    SHOW_DESTINATIONS ? [...korea, ...dest.delivery, ...dest.customs] : korea,
    rates,
  );

  return (
    <div className="flex w-full flex-col items-start gap-8">
      <div className="flex flex-col items-start gap-4">
        <Tag>{SHOW_DESTINATIONS ? "Цена под ключ" : "Расходы в Корее"}</Tag>
        <h2 className="text-h2">{typo("Из чего складывается цена")}</h2>
      </div>

      {/* Destination — full width: six countries don't fit the left column */}
      {SHOW_DESTINATIONS ? (
        <fieldset className="flex w-full flex-col gap-3">
          <legend className="mb-3 flex items-center gap-2 text-body text-ink-muted">
            <MapPin className="size-4" aria-hidden />
            Куда доставить
          </legend>
          <div className="flex flex-wrap gap-2 desktop:grid desktop:grid-cols-6">
            {destinations.map((d) => {
              const Flag = flags[d.id];
              return (
                <Tab
                  key={d.id}
                  active={d.id === dest.id}
                  onClick={() => setDestId(d.id)}
                  className="w-auto min-w-36 flex-1"
                >
                  <Flag
                    aria-hidden
                    className="h-4 w-6 shrink-0 rounded-[3px] shadow-[0_0_0_1px_rgb(0_0_0/0.08)]"
                  />
                  {d.label}
                </Tab>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="flex w-full flex-col gap-6 desktop:flex-row desktop:items-start desktop:gap-10">
        {/* Cost lines */}
        <div className="flex w-full flex-col gap-4 desktop:flex-[3]">
          <Group step={1} title="В Корее" lines={korea} rates={rates} />
          {SHOW_DESTINATIONS ? (
            <>
              <Group
                step={2}
                title="Доставка"
                lines={dest.delivery}
                rates={rates}
              />
              <Group
                step={3}
                title="Растаможка и оформление"
                lines={dest.customs}
                rates={rates}
              />
            </>
          ) : null}
        </div>

        {/* Total */}
        <aside className="flex w-full flex-col gap-6 rounded-lg bg-ink p-6 text-paper shadow-[inset_-10px_-10px_20px_0_rgb(255_255_255/0.12)] tablet:p-8 desktop:sticky desktop:top-[110px] desktop:flex-[2]">
          <div className="flex flex-col gap-2">
            <span className="text-tag text-paper-muted uppercase">
              {SHOW_DESTINATIONS
                ? `Итого под ключ · ${dest.label}`
                : "Итого в Корее"}
            </span>
            {total !== null ? (
              <span className="font-display text-h1 font-semibold tabular-nums">
                {formatMoney(roundUp(total), "USD")}
              </span>
            ) : (
              <span className="text-h3">
                {typo("Рассчитаем под ваш город")}
              </span>
            )}
          </div>

          <p className="text-body-xs text-paper-muted">
            {!SHOW_DESTINATIONS
              ? `Без доставки и растаможки — их посчитаем под ваш город и страну бесплатно. ${rateNote(rates)}`
              : total !== null
                ? `${rateNote(rates)} Точную сумму фиксируем в договоре.`
                : "Для этого направления пришлём полный расчёт в рабочее время — бесплатно."}
          </p>

          <Button
            href="/contact"
            data-lead={carName}
            variant="primary"
            className="w-full justify-between"
          >
            {SHOW_DESTINATIONS && total !== null
              ? "Хочу такую же"
              : "Рассчитать под ключ"}
          </Button>
        </aside>
      </div>
    </div>
  );
}
