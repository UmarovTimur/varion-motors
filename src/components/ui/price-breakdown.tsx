"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tab } from "@/components/ui/tab";
import { Tag } from "@/components/ui/tag";
import {
  type CarPricing,
  type CostLine,
  formatMoney,
  koreaLines,
  rates,
  sumUsd,
  toUsd,
} from "@/lib/pricing";
import { typo } from "@/lib/utils";

/** Rounded up to $100 — a turnkey quote, not an invoice. */
const roundUp = (usd: number) => Math.ceil(usd / 100) * 100;

function Line({ line }: { line: CostLine }) {
  const known = line.amount !== null;
  return (
    <li className="flex items-baseline gap-3 py-3">
      <span className="flex-1 text-body tablet:flex-none">{line.label}</span>
      <span
        aria-hidden
        className="mb-1 hidden min-w-4 flex-1 self-end border-b border-dotted border-grey-dark/60 tablet:block"
      />
      <span className="flex shrink-0 flex-col items-end text-right whitespace-nowrap">
        <span className={known ? "text-body font-medium" : "text-body text-ink-subtle"}>
          {known ? formatMoney(line.amount!, line.currency) : "по запросу"}
        </span>
        {known && line.currency !== "USD" ? (
          <span className="text-body-xs text-ink-subtle">
            ≈ {formatMoney(toUsd(line.amount!, line.currency), "USD")}
          </span>
        ) : null}
      </span>
    </li>
  );
}

function Group({ step, title, lines }: { step: number; title: string; lines: CostLine[] }) {
  const subtotal = sumUsd(lines);
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
          <Line key={line.label} line={line} />
        ))}
      </ul>
    </div>
  );
}

/**
 * "Цена под ключ" on the car page: pick a destination, see the Korean costs,
 * delivery and customs lines, and the USD total. A destination with any
 * unpriced line shows "рассчитаем" instead of a total that would be wrong.
 */
export function PriceBreakdown({
  pricing,
  carName,
}: {
  pricing: CarPricing;
  carName: string;
}) {
  const [destId, setDestId] = useState(pricing.destinations[0]?.id);
  const dest =
    pricing.destinations.find((d) => d.id === destId) ?? pricing.destinations[0];
  if (!dest) return null;

  const korea = koreaLines(pricing);
  const total = sumUsd([...korea, ...dest.delivery, ...dest.customs]);

  return (
    <div className="flex w-full flex-col items-start gap-8">
      <div className="flex flex-col items-start gap-4">
        <Tag>Цена под ключ</Tag>
        <h2 className="text-h2">{typo("Из чего складывается цена")}</h2>
      </div>

      <div className="flex w-full flex-col gap-6 desktop:flex-row desktop:items-start desktop:gap-10">
        {/* Destination + lines */}
        <div className="flex w-full flex-col gap-4 desktop:flex-[3]">
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 flex items-center gap-2 text-body text-ink-muted">
              <MapPin className="size-4" aria-hidden />
              Куда доставить
            </legend>
            <div className="flex flex-wrap gap-2">
              {pricing.destinations.map((d) => (
                <Tab
                  key={d.id}
                  active={d.id === dest.id}
                  onClick={() => setDestId(d.id)}
                  className="w-auto min-w-32 flex-1 tablet:flex-none"
                >
                  {d.label}
                </Tab>
              ))}
            </div>
          </fieldset>

          <Group step={1} title="В Корее" lines={korea} />
          <Group step={2} title="Доставка" lines={dest.delivery} />
          <Group step={3} title="Растаможка и оформление" lines={dest.customs} />
        </div>

        {/* Total */}
        <aside className="flex w-full flex-col gap-6 rounded-lg bg-ink p-6 text-paper shadow-[inset_-10px_-10px_20px_0_rgb(255_255_255/0.12)] tablet:p-8 desktop:sticky desktop:top-[110px] desktop:flex-[2]">
          <div className="flex flex-col gap-2">
            <span className="text-tag text-paper-muted uppercase">
              Итого под ключ · {dest.label}
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
            {total !== null
              ? `Пересчёт по курсу: 1 $ = ${rates.KRW} ₩, 1 $ = ${rates.RUB} ₽. Точную сумму фиксируем в договоре.`
              : "Для этого направления пришлём полный расчёт в рабочее время — бесплатно."}
          </p>

          <Button
            href="/contact"
            data-lead={carName}
            variant="primary"
            className="w-full justify-between"
          >
            {total !== null ? "Хочу такую же" : "Получить расчёт"}
          </Button>
        </aside>
      </div>
    </div>
  );
}
