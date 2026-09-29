/**
 * Turnkey price model for the car page ("Цена под ключ").
 *
 * A car's price is its Korean listing price plus the fixed Korean costs, plus
 * delivery and customs lines that depend on where the car is going. Lines keep
 * the currency they are paid in; the total is converted to USD with `rates`.
 */

export type Currency = "USD" | "KRW" | "RUB";

/** Units of each currency per 1 USD, as of `asOf` (YYYY-MM-DD). Live values
 * come from the Bank of Russia via `getRates()` in rates.ts. */
export type Rates = {
  asOf: string;
  KRW: number;
  RUB: number;
  source: "cbr" | "fallback";
};

/** Used when the Bank of Russia can't be reached, and wherever a price only
 * needs to be roughly right (search, metadata). */
export const fallbackRates: Rates = {
  asOf: "2026-09-27",
  KRW: 1390,
  RUB: 82,
  source: "fallback",
};

/** Logistics and costs in Korea — the same for every car. */
export const KOREA_BASE_KRW = 1_500_000;

export type CostLine = {
  label: string;
  /** `null` while the figure is not known yet — shown as "по запросу". */
  amount: number | null;
  currency: Currency;
};

export type Destination = {
  id: DestinationId;
  /** Tab label, e.g. "Россия". */
  label: string;
  delivery: CostLine[];
  customs: CostLine[];
};

/**
 * Every country the site delivers to, in tab order. `id` is the ISO code the
 * flag is looked up by. A car lists only the destinations it has figures for;
 * the rest show as unpriced ("по запросу").
 */
export const destinationCountries = [
  { id: "ru", label: "Россия" },
  { id: "uz", label: "Узбекистан" },
  { id: "kz", label: "Казахстан" },
  { id: "by", label: "Беларусь" },
  { id: "kg", label: "Кыргызстан" },
  { id: "tj", label: "Таджикистан" },
] as const;

export type DestinationId = (typeof destinationCountries)[number]["id"];

/** A car's own figures for each country, falling back to unpriced lines. */
export function destinationsFor(pricing: CarPricing): Destination[] {
  return destinationCountries.map(
    (country) =>
      pricing.destinations.find((d) => d.id === country.id) ?? {
        ...country,
        delivery: [{ label: "Доставка из Кореи", amount: null, currency: "USD" }],
        customs: [
          { label: "Растаможка и оформление", amount: null, currency: "USD" },
        ],
      },
  );
}

export type CarPricing = {
  /** Listing price in Korea. */
  krw: number;
  destinations: Destination[];
};

export const toUsd = (amount: number, currency: Currency, rates: Rates) =>
  currency === "USD" ? amount : amount / rates[currency];

const symbols: Record<Currency, string> = { USD: "$", KRW: "₩", RUB: "₽" };

/** "$3 500", "73 000 000 ₩", "40 000 ₽" — the site writes prices with spaces. */
export function formatMoney(amount: number, currency: Currency) {
  const n = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 })
    .format(Math.round(amount))
    .replace(/ /g, " ");
  return currency === "USD" ? `$${n}` : `${n} ${symbols[currency]}`;
}

/** Korean lines shared by every destination. */
export function koreaLines(pricing: CarPricing): CostLine[] {
  return [
    { label: "Цена автомобиля в Корее", amount: pricing.krw, currency: "KRW" },
    { label: "Логистика и затраты в Корее", amount: KOREA_BASE_KRW, currency: "KRW" },
  ];
}

/** Sum in USD, or `null` if any line is still unpriced. */
export function sumUsd(lines: CostLine[], rates: Rates): number | null {
  let total = 0;
  for (const line of lines) {
    if (line.amount === null) return null;
    total += toUsd(line.amount, line.currency, rates);
  }
  return total;
}
