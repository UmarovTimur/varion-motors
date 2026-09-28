import type { BodyType, Car } from "./content";
import { formatMoney, rates } from "./pricing";

/**
 * Cars currently on sale on Encar, picked on 2026-09-28: 2024–2025, low
 * mileage, one owner, no insurance claims and no liens per Encar's record.
 * Photos and figures come from the listing, which every page links back to
 * (`source`). A listing can sell at any time — recheck before quoting.
 */
type EncarListing = {
  slug: string;
  name: string;
  /** Encar listing id — fem.encar.com/cars/detail/<id>. */
  encarId: string;
  vin: string;
  krw: number;
  year: number;
  /** First registration, "MM/YYYY". */
  registered: string;
  mileage: number;
  bodyType: BodyType;
  model: string;
  trim: string;
  fuel: string;
  engine: string;
  drive: string;
  color: string;
  seats: number;
  description: string;
  equipment: string;
  warranty?: string;
  photos: number;
};

/** "16 754 км" — same thousands spacing as `formatMoney`. */
const km = (n: number) => `${formatMoney(n, "KRW").slice(0, -2)} км`;

function fromEncar(l: EncarListing): Car {
  const usd = Math.round(l.krw / rates.KRW / 100) * 100;
  const priceLabel = formatMoney(usd, "USD");
  const fuelShort = l.fuel.split(",")[0];
  return {
    slug: l.slug,
    name: l.name,
    price: usd,
    priceLabel,
    year: l.year,
    badge: "Цена в Корее",
    country: "Корея",
    bodyType: l.bodyType,
    image: `/media/cars/${l.slug}/01.jpg`,
    preHeader: ["Каталог", l.bodyType, "Корея"],
    description: l.description,
    vin: l.vin,
    source: {
      label: `Encar, объявление № ${l.encarId}`,
      url: `https://fem.encar.com/cars/detail/${l.encarId}`,
    },
    quick: [
      { label: "Цена в Корее", value: priceLabel },
      { label: "Год", value: String(l.year) },
      { label: "Кузов", value: l.bodyType },
      { label: "Топливо", value: fuelShort },
      { label: "Владельцев", value: "1" },
    ],
    specs: [
      { label: "Цена в Корее", value: formatMoney(l.krw, "KRW") },
      { label: "В долларах", value: `≈ ${priceLabel}` },
      { label: "Пробег", value: km(l.mileage) },
      { label: "Год", value: `${l.year} (${l.registered})` },
      { label: "Кузов", value: l.bodyType },
      { label: "Модель", value: l.model },
      { label: "Комплектация", value: l.trim },
      { label: "Топливо", value: l.fuel },
      { label: "Двигатель", value: l.engine },
      { label: "Привод", value: l.drive },
      { label: "Цвет", value: l.color },
      { label: "Мест", value: String(l.seats) },
    ],
    gallery: Array.from(
      { length: l.photos },
      (_, i) => `/media/cars/${l.slug}/${String(i + 1).padStart(2, "0")}.jpg`,
    ),
    pricing: {
      krw: l.krw,
      destinations: [
        {
          id: "ru",
          label: "Россия",
          delivery: [
            { label: "Доставка из Кореи", amount: null, currency: "USD" },
          ],
          customs: [
            { label: "Таможня и утильсбор", amount: null, currency: "USD" },
          ],
        },
        {
          id: "uz",
          label: "Узбекистан",
          delivery: [
            { label: "Доставка из Кореи", amount: null, currency: "USD" },
          ],
          customs: [
            { label: "Растаможка и оформление", amount: null, currency: "USD" },
          ],
        },
      ],
    },
    details: [
      { title: "Комплектация", body: l.equipment },
      {
        title: "Состояние и история",
        body: `Один владелец, страховых случаев по истории Encar нет, залогов и арестов нет. ${l.warranty ?? ""}`.trim(),
      },
      {
        title: "Источник",
        body: `Машина продаётся в Корее; фото и данные — из объявления на Encar (№ ${l.encarId}), актуальны на 28.09.2026. Объявление может уйти в любой момент — перед покупкой проверим наличие, историю и состояние на месте.`,
      },
    ],
  };
}

const factoryWarranty = (body: string, powertrain: string) =>
  `Заводская гарантия в Корее: кузов — ${body}, двигатель и коробка — ${powertrain}.`;

const listings: EncarListing[] = [
  {
    slug: "genesis-gv80-2025",
    name: "Genesis GV80 2.5T AWD",
    encarId: "42714838",
    vin: "KMTHA81BDSU276701",
    krw: 80_900_000,
    year: 2025,
    registered: "03/2025",
    mileage: 11865,
    bodyType: "Внедорожник",
    model: "Genesis GV80",
    trim: "2.5T AWD, 7 мест",
    fuel: "Бензин, 2.5 л турбо",
    engine: "2 497 см³, турбо",
    drive: "Полный",
    color: "Чёрный",
    seats: 7,
    description:
      "Genesis GV80 2025 года с пробегом 11 900 км: 2.5-литровый турбомотор, полный привод, семь мест. Новым стоил 97 650 000 ₩ — сейчас на 17 миллионов дешевле, с заводской гарантией.",
    equipment:
      "Опции сверх базы на 3 250 000 ₩, два ключа и карта-ключ. Некурящий салон, машина не была в аренде.",
    warranty: factoryWarranty("5 лет / 100 000 км", "5 лет / 100 000 км"),
    photos: 9,
  },
  {
    slug: "kia-carnival-2025",
    name: "Kia Carnival 3.5 Signature",
    encarId: "42668352",
    vin: "KNANE813BTS592703",
    krw: 49_990_000,
    year: 2025,
    registered: "09/2025",
    mileage: 4549,
    bodyType: "Минивэн",
    model: "Kia Carnival (KA4, рестайлинг)",
    trim: "Signature, 7 мест",
    fuel: "Бензин, 3.5 л",
    engine: "3 470 см³, V6",
    drive: "Передний",
    color: "Белый",
    seats: 7,
    description:
      "Kia Carnival после рестайлинга, сентябрь 2025 года, 4 500 км — по сути новый семиместный минивэн в топовой комплектации Signature.",
    equipment:
      "Двойной люк, пакет Drive Wise, проекционный дисплей, встроенный видеорегистратор, пакет Monitoring и Style.",
    warranty: factoryWarranty("3 года / 60 000 км", "5 лет / 100 000 км"),
    photos: 9,
  },
  {
    slug: "hyundai-palisade-2025",
    name: "Hyundai Palisade 2.5T 4WD",
    encarId: "42774514",
    vin: "KMHRK811DSU001443",
    krw: 52_600_000,
    year: 2025,
    registered: "02/2025",
    mileage: 16754,
    bodyType: "Внедорожник",
    model: "Hyundai Palisade (LX3)",
    trim: "Calligraphy 2.5T 4WD, 9 мест",
    fuel: "Бензин, 2.5 л турбо",
    engine: "2 497 см³, турбо",
    drive: "Полный",
    color: "Зелёный",
    seats: 9,
    description:
      "Новое поколение Palisade (LX3) 2025 года, 16 800 км: турбомотор 2.5, полный привод, девять мест и комплектация Calligraphy.",
    equipment:
      "Люк, навигация, проекционный дисплей, видеорегистратор, транспондер для платных дорог. Некурящий салон.",
    warranty: factoryWarranty("3 года / 60 000 км", "5 лет / 100 000 км"),
    photos: 9,
  },
  {
    slug: "mercedes-e300-2025",
    name: "Mercedes-Benz E300 4MATIC",
    encarId: "42608964",
    vin: "W1KLF4HB3SA132407",
    krw: 78_500_000,
    year: 2025,
    registered: "02/2025",
    mileage: 18930,
    bodyType: "Седан",
    model: "Mercedes-Benz E-Class (W214)",
    trim: "E300 4MATIC AMG Line",
    fuel: "Бензин, 2.0 л турбо",
    engine: "1 999 см³, турбо",
    drive: "Полный",
    color: "Чёрный",
    seats: 5,
    description:
      "Новый E-Class W214 2025 года, 18 900 км, в версии E300 4MATIC AMG Line. В Корее новым стоил 93 800 000 ₩.",
    equipment:
      "Версия E300 4MATIC с пакетом AMG Line: полный привод, спортивный обвес и салон AMG Line.",
    photos: 9,
  },
  {
    slug: "genesis-g80-2024",
    name: "Genesis G80 2.5T AWD",
    encarId: "42721709",
    vin: "KMTGB41CDSU257882",
    krw: 62_900_000,
    year: 2024,
    registered: "08/2024",
    mileage: 21956,
    bodyType: "Седан",
    model: "Genesis G80 (RG3)",
    trim: "2.5T AWD",
    fuel: "Бензин, 2.5 л турбо",
    engine: "2 497 см³, турбо",
    drive: "Полный",
    color: "Белый",
    seats: 5,
    description:
      "Genesis G80 2024 года (2025 модельный год), 22 000 км: бизнес-седан с турбомотором 2.5 и полным приводом.",
    equipment:
      "Панорамная крыша, адаптивная подвеска с камерой (Preview), аудио Bang & Olufsen, доводчики дверей (пакет Convenience), пакеты Driving Assistance, 2nd Row Comfort, Popular и Signature Design Selection II. Новым стоил 79 400 000 ₩.",
    warranty: factoryWarranty("5 лет / 100 000 км", "5 лет / 100 000 км"),
    photos: 9,
  },
  {
    slug: "hyundai-grandeur-hybrid-2024",
    name: "Hyundai Grandeur Hybrid Calligraphy",
    encarId: "42709088",
    vin: "KMHN3411BSA088970",
    krw: 43_900_000,
    year: 2024,
    registered: "09/2024",
    mileage: 13491,
    bodyType: "Седан",
    model: "Hyundai Grandeur (GN7)",
    trim: "Calligraphy Black Ink",
    fuel: "Гибрид, 1.6 л турбо",
    engine: "1 598 см³, турбо + электромотор",
    drive: "Передний",
    color: "Чёрный",
    seats: 5,
    description:
      "Флагманский седан Hyundai в гибридной версии, 2024 год (2025 модельный), 13 500 км, топовая комплектация Calligraphy Black Ink.",
    equipment:
      "Топовая Calligraphy в исполнении Black Ink — полная комплектация, кроме люка. Гибрид, поэтому расход заметно ниже, чем у бензиновой версии.",
    warranty: factoryWarranty("3 года / 60 000 км", "5 лет / 100 000 км"),
    photos: 9,
  },
  {
    slug: "kia-sorento-hybrid-2024",
    name: "Kia Sorento Hybrid Gravity",
    encarId: "42646048",
    vin: "KNARH81GBRA330038",
    krw: 44_500_000,
    year: 2024,
    registered: "08/2024",
    mileage: 27665,
    bodyType: "Кроссовер",
    model: "Kia Sorento (MQ4, рестайлинг)",
    trim: "HEV 1.6 Gravity, 6 мест",
    fuel: "Гибрид, 1.6 л турбо",
    engine: "1 598 см³, турбо + электромотор",
    drive: "Передний",
    color: "Белый",
    seats: 6,
    description:
      "Рестайлинговый Sorento Hybrid 2024 года, 27 700 км, в комплектации Gravity с шестью местами. Экономичный семейный кроссовер.",
    equipment:
      "Ксенон, кожаный салон с подогревом и вентиляцией, навигация, камера заднего вида, видеорегистратор, транспондер для платных дорог.",
    warranty: factoryWarranty("3 года / 60 000 км", "5 лет / 100 000 км"),
    photos: 9,
  },
];

export const encarCars = listings.map(fromEncar);
