import type { BodyType, Car } from "./content";
import {
  type CarPricing,
  type CostLine,
  formatMoney,
  originLines,
  type Rates,
  sumKnownUsd,
} from "./pricing";

/**
 * Cars bought in China, from the supplier's own listings (photos and figures
 * as sent, entered 2026-10-03). Prices are in yuan on the terms the supplier
 * quoted; the catalog price is that plus the known duty and fee, converted at
 * the live rate. Delivery to the buyer's city is quoted per request.
 */
type ChinaListing = {
  slug: string;
  name: string;
  year: number;
  /** "DD.MM.YYYY". */
  registered: string;
  mileage: number;
  /** Filter facet on /inventory. */
  bodyType: BodyType;
  /** What the page says about the body, when the facet is only the nearest. */
  bodyLabel?: string;
  model: string;
  trim: string;
  fuel: string;
  engine: string;
  /** Left out of the specs when the listing doesn't say. */
  drive?: string;
  color: string;
  condition: string;
  cny: number;
  /** Quoting terms, e.g. "FOB Хоргос"; omitted when the seller didn't give any. */
  basis?: string;
  /** Duty and our fee on top of the yuan price, if they are known. */
  extras?: { title: string; lines: CostLine[] };
  description: string;
  equipment: string;
  photos: number;
};

/** "190 км", "30 000 км" — same thousands spacing as `formatMoney`. */
const km = (n: number) => `${formatMoney(n, "KRW").slice(0, -2)} км`;

const dutyAndFee: NonNullable<ChinaListing["extras"]> = {
  title: "Пошлина и услуги",
  lines: [
    { label: "Таможенная пошлина", amount: 7000, currency: "EUR" },
    { label: "Услуги Varion Motors", amount: 1200, currency: "USD" },
  ],
};

const deliveryNote =
  "Город доставки обсуждаем отдельно: стоимость пути из Китая до вашего города и растаможку считаем под конкретный адрес и страну.";

function fromChina(l: ChinaListing, rates: Rates): Car {
  const pricing: CarPricing = {
    cny: l.cny,
    basis: l.basis,
    extras: l.extras,
    destinations: [],
  };
  const { usd: total, partial } = sumKnownUsd(
    [...originLines(pricing), ...(l.extras?.lines ?? [])],
    rates,
  );
  const usd = Math.ceil(total / 100) * 100;
  const priceLabel = `${partial ? "от " : ""}${formatMoney(usd, "USD")}`;
  const body = l.bodyLabel ?? l.bodyType;
  const terms = l.basis ?? "в Китае";
  return {
    slug: l.slug,
    name: l.name,
    price: usd,
    priceLabel,
    year: l.year,
    badge: l.extras ? "Из Китая, без доставки" : `Цена ${terms}`,
    country: "Китай",
    bodyType: l.bodyType,
    image: `/media/cars/${l.slug}/01.jpg`,
    preHeader: ["Каталог", l.bodyType, "Китай"],
    description: l.description,
    quick: [
      { label: "Цена", value: priceLabel },
      { label: "Год", value: String(l.year) },
      { label: "Кузов", value: body },
      { label: "Топливо", value: l.fuel.split(",")[0] },
      { label: "Пробег", value: km(l.mileage) },
    ],
    specs: [
      { label: `Цена ${terms}`, value: formatMoney(l.cny, "CNY") },
      ...(l.extras
        ? [{ label: "С пошлиной и услугами", value: `≈ ${priceLabel}` }]
        : [{ label: "В долларах", value: `≈ ${priceLabel}` }]),
      { label: "Пробег", value: km(l.mileage) },
      { label: "Дата регистрации", value: l.registered },
      { label: "Кузов", value: body },
      { label: "Модель", value: l.model },
      { label: "Комплектация", value: l.trim },
      { label: "Топливо", value: l.fuel },
      { label: "Двигатель", value: l.engine },
      ...(l.drive ? [{ label: "Привод", value: l.drive }] : []),
      { label: "Цвет", value: l.color },
      { label: "Состояние", value: l.condition },
    ],
    gallery: Array.from(
      { length: l.photos },
      (_, i) => `/media/cars/${l.slug}/${String(i + 1).padStart(2, "0")}.jpg`,
    ),
    pricing,
    details: [
      { title: "Комплектация", body: l.equipment },
      { title: "Состояние и история", body: `${l.condition}. Пробег ${km(l.mileage)}, дата регистрации ${l.registered}.` },
      { title: "Доставка", body: deliveryNote },
    ],
  };
}

const listings: ChinaListing[] = [
  {
    slug: "lynk-co-03-performance-2025",
    name: "Lynk & Co 03+ 2.0TD Performance",
    year: 2025,
    registered: "14.04.2026",
    mileage: 190,
    bodyType: "Седан",
    model: "Lynk & Co 03+",
    trim: "Performance",
    fuel: "Бензин, 2.0 л турбо",
    engine: "2.0 TD",
    color: "Зелёный",
    condition: "Состояние нового автомобиля",
    cny: 209_100,
    basis: "FOB Хоргос",
    extras: dutyAndFee,
    description:
      "Lynk & Co 03+ 2025 года в версии Performance: 2.0-литровый турбомотор, автомат, зелёный кузов. Пробег 190 км — состояние нового автомобиля.",
    equipment:
      "Версия Performance с 2.0-литровым турбомотором и автоматической коробкой: большое антикрыло, тёмный салон с жёлтой прострочкой и дисплей приборной панели.",
    photos: 8,
  },
  {
    slug: "lynk-co-03-racing-2023",
    name: "Lynk & Co 03+ 2.0TD Racing 4WD",
    year: 2024,
    registered: "29.07.2024",
    mileage: 30_000,
    bodyType: "Седан",
    model: "Lynk & Co 03+ (2023 модельный год)",
    trim: "Racing",
    fuel: "Бензин, 2.0 л турбо",
    engine: "2.0 TD",
    drive: "Полный (4WD)",
    color: "Чёрный",
    condition: "Три крашеных элемента кузова",
    cny: 193_000,
    basis: "FOB Хоргос",
    extras: dutyAndFee,
    description:
      "Lynk & Co 03+ Racing 2023 модельного года, полный привод, 2.0-литровый турбомотор и автомат. Пробег 30 000 км, три крашеных элемента кузова.",
    equipment:
      "Версия Racing с полным приводом 4WD и автоматической коробкой: чёрный кузов с жёлтыми суппортами, антикрыло и салон с алькантарой.",
    photos: 8,
  },
  {
    slug: "zeekr-001-you-2025",
    name: "Zeekr 001 YOU 100 кВт·ч 4WD, серый",
    year: 2025,
    registered: "03.07.2025",
    mileage: 2900,
    bodyType: "Седан",
    bodyLabel: "Лифтбек",
    model: "Zeekr 001",
    trim: "YOU, батарея 100 кВт·ч",
    fuel: "Электро",
    engine: "Два электромотора, 100 кВт·ч",
    drive: "Полный (4WD)",
    color: "Серый",
    condition: "Весь в заводском окрасе",
    cny: 252_800,
    description:
      "Электрический Zeekr 001 2025 года в версии YOU с батареей 100 кВт·ч и полным приводом. Пробег 2 900 км, кузов целиком в заводской краске.",
    equipment:
      "Версия YOU, батарея 100 кВт·ч, полный привод. Светлый салон с перфорированной кожей, панорамная крыша, большой центральный дисплей и экран для задних пассажиров, тормоза с оранжевыми суппортами.",
    photos: 8,
  },
  {
    slug: "zeekr-001-you-2025-white",
    name: "Zeekr 001 YOU 100 кВт·ч 4WD, белый",
    year: 2025,
    registered: "23.07.2025",
    mileage: 3600,
    bodyType: "Седан",
    bodyLabel: "Лифтбек",
    model: "Zeekr 001",
    trim: "YOU, батарея 100 кВт·ч",
    fuel: "Электро",
    engine: "Два электромотора, 100 кВт·ч",
    drive: "Полный (4WD)",
    color: "Белый",
    condition:
      "Весь в заводском окрасе: оригинальные кузовные детали, без подкрасов",
    cny: 237_300,
    basis: "FOB Хоргос",
    description:
      "Электрический Zeekr 001 2025 года в версии YOU с батареей 100 кВт·ч и полным приводом, белый кузов. Пробег 3 600 км, оригинальные кузовные детали без подкрасов.",
    equipment:
      "Версия YOU, батарея 100 кВт·ч, полный привод. Светлый салон с тёмно-синими вставками, стеклянная крыша, оранжевые тормозные суппорты.",
    photos: 5,
  },
];

/** The listings as cars, with USD prices at the given exchange rates. */
export const chinaCarsAt = (rates: Rates) =>
  listings.map((l) => fromChina(l, rates));
