/**
 * Turnkey price model for the car page ("Цена под ключ").
 *
 * A car's price is its price at the origin — a Korean listing plus the fixed
 * Korean costs, or a Chinese FOB price at the border — plus delivery and
 * customs lines that depend on where the car is going. Lines keep
 * the currency they are paid in; the total is converted to USD with `rates`.
 */

export type Currency = "USD" | "KRW" | "RUB" | "CNY" | "EUR";

/** Units of each currency per 1 USD, as of `asOf` (YYYY-MM-DD). Live values
 * come from the Bank of Russia via `getRates()` in rates.ts. */
export type Rates = {
  asOf: string;
  KRW: number;
  RUB: number;
  CNY: number;
  EUR: number;
  source: "cbr" | "fallback";
};

/** Used when the Bank of Russia can't be reached, and wherever a price only
 * needs to be roughly right (search, metadata). */
export const fallbackRates: Rates = {
  asOf: "2026-09-27",
  KRW: 1390,
  RUB: 82,
  CNY: 7.1,
  EUR: 0.86,
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
  const from = originOf(pricing).from;
  return destinationCountries.map(
    (country) =>
      pricing.destinations.find((d) => d.id === country.id) ?? {
        ...country,
        delivery: [{ label: `Доставка ${from}`, amount: null, currency: "USD" }],
        customs: [
          { label: "Растаможка и оформление", amount: null, currency: "USD" },
        ],
      },
  );
}

type CommonPricing = {
  destinations: Destination[];
  /** Known costs past the origin that apply whatever the destination (duty,
   * our fee) — shown as their own group and counted in the total. */
  extras?: { title: string; lines: CostLine[] };
};

/** Bought in Korea: the listing price, plus KOREA_BASE_KRW on top. */
type KoreaPricing = CommonPricing & {
  /** Listing price in Korea. */
  krw: number;
};

/** Bought in China at a price that already covers the way to the border. */
type ChinaPricing = CommonPricing & {
  /** Price in yuan on `basis` terms. */
  cny: number;
  /** Where the price is quoted, e.g. "FOB Хоргос"; omitted while the seller
   * hasn't said which terms the yuan price is on. */
  basis?: string;
};

export type CarPricing = KoreaPricing | ChinaPricing;

/** Wording that depends on where the car is bought. */
export function originOf(pricing: CarPricing) {
  return "cny" in pricing
    ? {
        currency: "CNY" as const,
        group: "В Китае",
        tag: `Цена ${pricing.basis ?? "в Китае"}`,
        total: `Итого ${pricing.basis ?? "в Китае"}`,
        from: "из Китая",
      }
    : {
        currency: "KRW" as const,
        group: "В Корее",
        tag: "Расходы в Корее",
        total: "Итого в Корее",
        from: "из Кореи",
      };
}

export const toUsd = (amount: number, currency: Currency, rates: Rates) =>
  currency === "USD" ? amount : amount / rates[currency];

const symbols: Record<Currency, string> = {
  USD: "$",
  KRW: "₩",
  RUB: "₽",
  CNY: "¥",
  EUR: "€",
};

/** "$3 500", "73 000 000 ₩", "40 000 ₽" — the site writes prices with spaces. */
export function formatMoney(amount: number, currency: Currency) {
  const n = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 })
    .format(Math.round(amount))
    .replace(/ /g, " ");
  return currency === "USD" ? `$${n}` : `${n} ${symbols[currency]}`;
}

/** Costs at the origin, shared by every destination. */
export function originLines(pricing: CarPricing): CostLine[] {
  if ("cny" in pricing)
    return [
      {
        label: pricing.basis
          ? `Цена автомобиля, ${pricing.basis}`
          : "Цена автомобиля в Китае",
        amount: pricing.cny,
        currency: "CNY",
      },
    ];
  return [
    { label: "Цена автомобиля в Корее", amount: pricing.krw, currency: "KRW" },
    { label: "Логистика и затраты в Корее", amount: KOREA_BASE_KRW, currency: "KRW" },
  ];
}

/** Sum of the priced lines in USD; `partial` when some line is still unpriced,
 * which makes the sum a minimum rather than a total. */
export function sumKnownUsd(lines: CostLine[], rates: Rates) {
  let usd = 0;
  let partial = false;
  for (const line of lines) {
    if (line.amount === null) partial = true;
    else usd += toUsd(line.amount, line.currency, rates);
  }
  return { usd, partial };
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
