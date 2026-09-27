/**
 * Stand-in for the Framer CMS collections and static section copy.
 * Swap these for real CMS/database reads once the backend lands — the shape is
 * what the components consume, so only this file needs to change.
 */

import type { CarPricing } from "./pricing";
import { SHOW_CATALOG } from "./site";

export type NavLink = { label: string; href: string };

/**
 * Menu entries jump to landing sections rather than separate pages. `/#id`
 * scrolls in place on the home page and, from any other page, goes home and
 * lands on the section. "Контакты" is the footer, present on every page, so it
 * never leaves the current one. "Проверка" has no landing section yet (the
 * inspection breakdown block is still missing), so it keeps its page — and
 * is left out of the header menu for now, only the footer links to it.
 */
const links = {
  portfolio: { label: "Каталог", href: "/#portfolio" },
  steps: { label: "Как мы работаем", href: "/#how-it-works" },
  inspection: { label: "Проверка", href: "/financing" },
  team: { label: "О команде", href: "/#team" },
  contacts: { label: "Контакты", href: "#contacts" },
} satisfies Record<string, NavLink>;

const catalogLinks = SHOW_CATALOG ? [links.portfolio] : [];

export const navLinks: NavLink[] = [
  ...catalogLinks,
  links.steps,
  links.team,
  links.contacts,
];

export const footerLinksLeft: NavLink[] = [
  { label: "Главная", href: "/" },
  ...catalogLinks,
  links.steps,
  links.inspection,
];

export const footerLinksRight: NavLink[] = [
  links.team,
  links.contacts,
  { label: "Блог", href: "/blog" },
];

/** One offer link, not one per country: the two used to be told apart only by
 * a flag emoji, and without it the labels were identical. If the offers really
 * differ by country, give them distinct wording rather than flags. */
export const legalLinks: NavLink[] = [
  { label: "Договор-оферта", href: "/terms" },
  { label: "Политика обработки персональных данных", href: "/privacy" },
];

/* --- Inventories collection → /inventory/:slug (§4) --- */
export type Spec = { label: string; value: string };

/**
 * Facets the /inventory filters run on. Framer filters by Make / Condition /
 * Year / Max Mileage; none of those exist for a portfolio of closed deals, so
 * the same controls carry the facets this business actually has.
 */
export const countries = ["Китай", "Корея"] as const;
export type Country = (typeof countries)[number];

/** The Tabs Filter taxonomy — fixed, so a tab may legitimately match nothing. */
export const bodyTypes = [
  "Седан",
  "Кроссовер",
  "Внедорожник",
  "Минивэн",
] as const;
export type BodyType = (typeof bodyTypes)[number];

/**
 * Price Range checkboxes. `max` is exclusive; a car whose price is still 0
 * (unknown, the placeholder state) is never filtered out by a range.
 */
export const priceRanges = [
  { id: "lt15", label: "до $15 000", max: 15000 },
  { id: "15-30", label: "$15 000 – 30 000", min: 15000, max: 30000 },
  { id: "gt30", label: "больше $30 000", min: 30000 },
] as const;

export type Car = {
  slug: string;
  name: string;
  price: number;
  /** Shown instead of the formatted price while the real figures are unknown. */
  priceLabel?: string;
  year: number;
  /** Origin and delivery window, e.g. "Из Гуанчжоу, 20–30 дней". */
  badge?: string;
  /** Filter facets on /inventory: country of purchase and body type. */
  country?: Country;
  bodyType?: BodyType;
  image: string;
  /**
   * Walk-around clip for the detail page. `src` is an mp4; `poster` defaults to
   * the card image. The three demo files are placeholders generated from the
   * car photo — replace them with the real walk-arounds.
   */
  video?: { src: string; poster?: string };
  /** Detail page ("Каталог → модель") — everything below is per-car. */
  preHeader?: string[];
  description?: string;
  vin?: string;
  dealNo?: string;
  /** Quick Infos: the price tile plus the four small ones. */
  quick?: Spec[];
  specs?: Spec[];
  gallery?: string[];
  /** "Цена под ключ" block: Korean price plus per-destination costs. */
  pricing?: CarPricing;
  details?: { title: string; body: string }[];
};

export const cars: Car[] = [
  {
    slug: "case-04",
    name: "BMW X3 xDrive20 M Sport",
    price: 70900,
    priceLabel: "$70 900",
    year: 2025,
    badge: "Из Кореи, 20–30 дней",
    country: "Корея",
    bodyType: "Кроссовер",
    image: "/media/cars/bmw-x3/01.jpg",
    preHeader: ["Каталог", "Кроссовер", "Корея"],
    description:
      "BMW X3 (G45) xDrive20 M Sport 2025 года с пробегом 4 800 км — почти новый бензиновый кроссовер в белом цвете. Цена в Корее 73 000 000 ₩, без залогов и арестов. Привезём под ключ с проверкой и документами.",
    quick: [
      { label: "Стоимость авто", value: "$70 900" },
      { label: "Год", value: "2025" },
      { label: "Кузов", value: "Кроссовер" },
      { label: "Топливо", value: "Бензин" },
      { label: "Владельцев", value: "1" },
    ],
    specs: [
      { label: "Цена в Корее", value: "73 000 000 ₩" },
      { label: "Стоимость авто", value: "$70 900" },
      { label: "Пробег", value: "4 800 км" },
      { label: "Год", value: "2025 (10/2025)" },
      { label: "Кузов", value: "Кроссовер" },
      { label: "Модель", value: "BMW X3 (G45)" },
      { label: "Комплектация", value: "xDrive20 M Sport" },
      { label: "Топливо", value: "Бензин, 2.0 л (1 998 см³)" },
      { label: "Коробка", value: "Автомат" },
      { label: "Цвет", value: "Белый" },
      { label: "Мест", value: "5" },
      { label: "Владельцев", value: "1" },
    ],
    gallery: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/media/cars/bmw-x3/0${n}.jpg`),
    pricing: {
      krw: 73_000_000,
      destinations: [
        {
          id: "ru",
          label: "Россия",
          delivery: [
            { label: "Доставка из Кореи", amount: 3500, currency: "USD" },
            { label: "Дорога до города", amount: 1500, currency: "USD" },
          ],
          customs: [
            { label: "Таможенная пошлина", amount: 13200, currency: "USD" },
            { label: "Услуги декларанта", amount: 1200, currency: "USD" },
            { label: "Лаборатория (СБКТС)", amount: 40000, currency: "RUB" },
            { label: "Утильсбор", amount: 952800, currency: "RUB" },
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
      {
        title: "Технические данные",
        body: "Двигатель 2.0 л бензиновый (1 998 см³), автоматическая коробка, полный привод xDrive, пять мест. Гарантия производителя на кузов — 24 месяца, на двигатель и коробку — 36 месяцев или 60 000 км.",
      },
      {
        title: "Состояние и история",
        body: "Пробег 4 800 км, авто 2025 года. По данным Encar залогов и арестов нет. Есть панорамная крыша, задняя камера, датчики парковки, навигация, климат-контроль, бесключевой доступ, кожаный салон с подогревом и вентиляцией сидений — всего 43 опции. [Данные по ДТП и окрасам — после проверки.]",
      },
    ],
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

/* --- Services (§5) --- */
/** `image` may be omitted; Framer fills that tile with the brand-logo strip. */
export type Service = { title: string; image?: string };

/** Not currently rendered — kept as reference for the Framer image tiles this
 * section used before it switched to `trustPoints` below. */
export const services: Service[] = [
  {
    title: "Мы отказываемся от машин",
    image: "/media/services/inspection.webp",
  },
  {
    title: "Один договор — одна ответственность",
    image: "/media/services/contract.jpg",
  },
  { title: "Гарантия соответствия авто", image: "/media/services/warranty.webp" },
  {
    title: "Работаем по всему СНГ",
    image: "/media/services/detailing.webp",
  },
  {
    title: "Более 50 автомобилей доставлено в этом году",
    image: "/media/services/financing.jpg",
  },
];

/** "Почему выбирают Varion Motors" cards (§5) — plain icon/title/body, no
 * photo. `icon` is a key into the lookup in `trust-card.tsx` rather than a
 * component here, so this file stays free of UI imports.
 *
 * Copy is adapted from two competitors' equivalent blocks: the legal/price
 * points borrow netcars.ru's phrasing (with any Russia-specific facts —
 * "российским юр.лицом", the export-control-association claim — swapped for
 * what's actually true of this business), and the sourcing/support points
 * borrow carexkorea.ru's "Почему выбирают" wording, generalised from
 * Korea-only to Korea+China. */
export type TrustPoint = {
  icon: "shield" | "car" | "banknote" | "users";
  title: string;
  body: string;
};

export const trustPoints: TrustPoint[] = [
  {
    icon: "shield",
    title: "Юридическая безопасность сделки",
    body: "Договор заключается с нашим юридическим лицом с оплатой на расчётный счёт.",
  },
  {
    icon: "car",
    title: "Гарантия соответствия авто ожиданиям",
    body: "Мы несём полную ответственность за любые отклонения от заявленных характеристик.",
  },
  {
    icon: "banknote",
    title: "Прозрачный расчёт без скрытых комиссий",
    body: "Все расходы и комиссии прописаны в договоре — никаких сюрпризов в переписке задним числом.",
  },
  {
    icon: "users",
    title: "Работаем без посредников",
    body: "Напрямую с поставщиками и аукционами в Корее и Китае — никаких лишних комиссий.",
  },
];

/* --- Testimonials (§6) --- */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Outstanding service from start to finish, truly professional team and exceptional vehicle quality throughout",
    author: "James Mitchell",
    role: "Porsche 911 Owner",
    image: "/media/testimonials/james-mitchell.png",
  },
  {
    quote:
      "They found the exact specification I had been chasing for two years and handled every detail of the import",
    author: "Elena Vasquez",
    role: "Aston Martin DB11 Owner",
    image: "/media/testimonials/james-mitchell.png",
  },
  {
    quote:
      "Transparent pricing, a genuinely honest inspection report, and the delivery arrived a day early",
    author: "Daniel Osei",
    role: "Range Rover Autobiography Owner",
    image: "/media/testimonials/james-mitchell.png",
  },
];

/* --- Team (§7) --- */
export type TeamMember = {
  name: string;
  role: string;
  image: string;
  /** Optional first-person bio. Long enough to need the card's clamp/expand
   * treatment — see `team-member-card.tsx`. */
  bio?: string;
};

export const team: TeamMember[] = [
  {
    name: "Акмаль",
    role: "Эксперт по подбору и проверке авто · Telegram: @aim_team1",
    image: "/media/team/akmal-bw.png",
    bio: "Подбираю лучшие предложения на рынке Кореи и лично проверяю каждое авто — техническое состояние и юридическую чистоту. Организую доставку и оформление, чтобы покупка была безопасной и спокойной.",
  },
  {
    name: "Тимур Умаров",
    role: "Эксперт по клиентскому сервису и сопровождению сделок · Telegram: @status_3",
    image: "/media/team/timur-umarov.webp",
    bio: "Веду вас от первой заявки до получения ключей: согласовываю договор и оплату, держу в курсе на каждом этапе доставки и растаможки. На связи всегда один человек, который знает всё о вашей сделке.",
  },
];

/* --- Blog collection (§8) — the articles live in posts.ts --- */
export { posts, type Post, type PostBlock } from "./posts";

/** "18 сентября 2026" — Intl adds a trailing "г.", which reads as clutter
 * next to a date on a card. */
export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(new Date(iso))
    .replace(/\s?г\.$/, "");

/* --- FAQ (§10) --- */
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Можно ли проверить авто перед покупкой?",
    answer:
      "Да, и это обязательный этап — мы не предлагаем машину, которую не смотрели сами. Проверяем историю, пробег, юридическую чистоту и техническое состояние, присылаем фото- и видеоотчёт. Рекомендацию к покупке даём только после проверки.",
  },
  {
    question: "Мне придётся выбирать машину только по фото?",
    answer:
      "Нет. Когда вариант вам предварительно подошёл, наш русскоязычный специалист на месте проводит видеообзор: толщина ЛКП, состояние кузова и днища, салон, двигатель, электроника. Вы смотрите машину глазами человека, который стоит рядом с ней.",
  },
  {
    question: "Что входит в стоимость доставки?",
    answer:
      "Выкуп и перегон авто от дилера или с аукциона, снятие с учёта и экспортная декларация, осмотр и хранение на нашей площадке, доставка до границы, фрахт и оформление документов. Всё это уже в цене под ключ — по дороге доплат не появляется.",
  },
  {
    question: "Сколько занимает доставка?",
    answer:
      "От 20 до 30 дней от оплаты до выдачи. Сроки могут сдвинуться из-за очереди на границе — предупреждаем заранее, а не ставим перед фактом.",
  },
  {
    question: "Какие машины выгоднее всего везти?",
    answer:
      "Выгода почти всегда упирается в возраст авто: от него зависит размер пошлины. Поэтому мы считаем сразу несколько вариантов и показываем, где разница в итоговой цене действительно существенная, а где переплата не стоит ожидания.",
  },
  {
    question: "Можно ли отложить отправку и оставить машину на стоянке?",
    answer:
      "Да. Купленный автомобиль может подождать на нашей площадке — например, чтобы дособрать сумму или дождаться более выгодного по пошлине возраста. Условия хранения оговариваем заранее.",
  },
  {
    question: "Зачем нужен депозит и паспортные данные?",
    answer:
      "Депозит закрепляет за вами подбор, проверку и бронь конкретного авто — он возвратный и засчитывается в стоимость. Паспортные данные нужны для договора и оформления автомобиля сразу на вас, а не на посредника.",
  },
  {
    question: "Из чего складывается растаможка?",
    answer:
      "Пошлина считается по правилам страны ввоза и зависит от возраста авто и объёма двигателя, к ней добавляются НДС, утилизационный и регистрационные сборы. Считаем по вашей стране и показываем разбивку по статьям до оплаты.",
  },
  {
    question: "Что, если машина придёт повреждённой?",
    answer:
      "Автомобиль застрахован на полную стоимость. Повреждения фиксируются актом при выдаче. Претензию к перевозчику и страховой ведём мы.",
  },
  {
    question: "Как вам доверять, если я покупаю машину дистанционно?",
    answer:
      "Только в этом году мы привезли более 50 автомобилей. Договор заключается напрямую с вами, авто оформляется на ваше имя, на каждом этапе — фото, видео и документы. Мы не берём деньги за «воздух»: до согласования конкретного VIN вы ничем не связаны.",
  },
];

/* --- "Шесть шагов от заявки до ключей" (§3 лендинга) --- */
export type Step = { title: string; body: string };

export const steps: Step[] = [
  {
    title: "Заявка",
    body: "Обсуждаем бюджет, модель, приоритеты. Бесплатно.",
  },
  {
    title: "Подбор",
    body: "Находим варианты под ваш запрос, присылаем список с ценами под ключ.",
  },
  {
    title: "Проверка",
    body: "Аукционный лист, фото, диагностика. Показываем всё, включая дефекты. Не подходит — ищем дальше.",
  },
  {
    title: "Договор и оплата",
    body: "Фиксируем конкретный автомобиль по VIN, цену и срок. Оплата по договору.",
  },
  {
    title: "Доставка",
    body: "От 20 до 30 дней. Держим вас в курсе на каждом этапе.",
  },
  {
    title: "Растаможка и выдача",
    body: "Оформляем документы, передаём машину с полным пакетом.",
  },
];
