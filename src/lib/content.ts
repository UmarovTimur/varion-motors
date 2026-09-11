/**
 * Stand-in for the Framer CMS collections and static section copy.
 * Swap these for real CMS/database reads once the backend lands — the shape is
 * what the components consume, so only this file needs to change.
 */

export type NavLink = { label: string; href: string };

/**
 * Menu entries jump to landing sections rather than separate pages. `/#id`
 * scrolls in place on the home page and, from any other page, goes home and
 * lands on the section. "Контакты" is the footer, present on every page, so it
 * never leaves the current one. "Проверка" has no landing section yet (the
 * inspection breakdown block is still missing), so it keeps its page.
 */
const links = {
  portfolio: { label: "Портфолио", href: "/#portfolio" },
  steps: { label: "Как мы работаем", href: "/#how-it-works" },
  inspection: { label: "Проверка", href: "/financing" },
  team: { label: "О команде", href: "/#team" },
  contacts: { label: "Контакты", href: "#contacts" },
} satisfies Record<string, NavLink>;

export const navLinks: NavLink[] = [
  links.portfolio,
  links.steps,
  links.inspection,
  links.team,
  links.contacts,
];

export const footerLinksLeft: NavLink[] = [
  { label: "Главная", href: "/" },
  links.portfolio,
  links.steps,
  links.inspection,
];

export const footerLinksRight: NavLink[] = [
  links.team,
  links.contacts,
  { label: "Блог", href: "/blog" },
];

export const legalLinks: NavLink[] = [
  { label: "Договор-оферта 🇺🇿", href: "/terms" },
  { label: "Договор-оферта 🇰🇬", href: "/cookies" },
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

export const cities = ["Ташкент", "Бишкек"] as const;

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
  /** Route and delivery time, e.g. "Гуанчжоу → Ташкент, [XX] дней". */
  badge?: string;
  /** Filter facets on /inventory: country of purchase, handover city, body type. */
  country?: Country;
  city?: string;
  bodyType?: BodyType;
  image: string;
  /**
   * Walk-around clip for the detail page. `src` is an mp4; `poster` defaults to
   * the card image. The three demo files are placeholders generated from the
   * car photo — replace them with the real walk-arounds.
   */
  video?: { src: string; poster?: string };
  /** Detail page ("Портфолио → кейс") — everything below is per-deal. */
  preHeader?: string[];
  description?: string;
  vin?: string;
  dealNo?: string;
  /** Quick Infos: the price tile plus the four small ones. */
  quick?: Spec[];
  specs?: Spec[];
  gallery?: string[];
  details?: { title: string; body: string }[];
};

export const cars: Car[] = [
  {
    slug: "case-01",
    name: "[Марка Модель]",
    price: 0,
    priceLabel: "$[X] под ключ",
    year: 2024,
    badge: "Гуанчжоу → Ташкент, [XX] дней",
    country: "Китай",
    city: "Ташкент",
    bodyType: "Кроссовер",
    image: "/media/cars/dreznak-karov.png",
    video: { src: "/media/cars/dreznak-karov.mp4" },
    preHeader: ["Портфолио", "Кроссовер", "Ташкент"],
    description:
      "[Пара предложений о машине: почему выбрали именно её и для какой задачи брал клиент.]",
    vin: "[VIN]",
    dealNo: "[№ сделки]",
    quick: [
      { label: "Цена под ключ", value: "$[X]" },
      { label: "Год", value: "2024" },
      { label: "Кузов", value: "Кроссовер" },
      { label: "Топливо", value: "[Бензин]" },
      { label: "Владельцев", value: "[X]" },
    ],
    specs: [
      { label: "Цена под ключ ($)", value: "[X]" },
      { label: "Пробег", value: "[XX XXX] км" },
      { label: "Год", value: "2024" },
      { label: "Кузов", value: "Кроссовер" },
      { label: "Модель", value: "[Модель]" },
      { label: "Комплектация", value: "[Комплектация]" },
      { label: "Топливо", value: "[Бензин]" },
      { label: "Владельцев", value: "[X]" },
    ],
    gallery: ["/media/cars/dreznak-karov.png"],
    details: [
      {
        title: "Технические данные",
        body: "[Двигатель, коробка, привод, расход — из аукционного листа.]",
      },
      {
        title: "Состояние и история",
        body: "[Что показал аукционный лист и диагностика: пробег, окрасы, ДТП. Пишем и то, что нашли плохого.]",
      },
      {
        title: "Что вошло в цену",
        body: "Стоимость авто, доставка до границы, экспедирование, растаможка, наша комиссия. [Разбивка по статьям.]",
      },
    ],
  },
  {
    slug: "case-02",
    name: "[Марка Модель]",
    price: 0,
    priceLabel: "$[X] под ключ",
    year: 2023,
    badge: "Инчхон → Бишкек, [XX] дней",
    country: "Корея",
    city: "Бишкек",
    bodyType: "Седан",
    image: "/media/cars/zethrux-infernum.webp",
    video: { src: "/media/cars/zethrux-infernum.mp4" },
    preHeader: ["Портфолио", "Седан", "Бишкек"],
    description:
      "[Пара предложений о машине: почему выбрали именно её и для какой задачи брал клиент.]",
    vin: "[VIN]",
    dealNo: "[№ сделки]",
    quick: [
      { label: "Цена под ключ", value: "$[X]" },
      { label: "Год", value: "2023" },
      { label: "Кузов", value: "Седан" },
      { label: "Топливо", value: "[Бензин]" },
      { label: "Владельцев", value: "[X]" },
    ],
    specs: [
      { label: "Цена под ключ ($)", value: "[X]" },
      { label: "Пробег", value: "[XX XXX] км" },
      { label: "Год", value: "2023" },
      { label: "Кузов", value: "Седан" },
      { label: "Модель", value: "[Модель]" },
      { label: "Комплектация", value: "[Комплектация]" },
      { label: "Топливо", value: "[Бензин]" },
      { label: "Владельцев", value: "[X]" },
    ],
    gallery: ["/media/cars/zethrux-infernum.webp"],
    details: [
      {
        title: "Технические данные",
        body: "[Двигатель, коробка, привод, расход — из аукционного листа.]",
      },
      {
        title: "Состояние и история",
        body: "[Что показал аукционный лист и диагностика: пробег, окрасы, ДТП. Пишем и то, что нашли плохого.]",
      },
      {
        title: "Что вошло в цену",
        body: "Стоимость авто, доставка до границы, экспедирование, растаможка, наша комиссия. [Разбивка по статьям.]",
      },
    ],
  },
  {
    slug: "case-03",
    name: "[Марка Модель]",
    price: 0,
    priceLabel: "$[X] под ключ",
    year: 2024,
    badge: "Хоргос → Ташкент, [XX] дней",
    country: "Китай",
    city: "Ташкент",
    bodyType: "Внедорожник",
    image: "/media/cars/emblora-wyndcroft.webp",
    video: { src: "/media/cars/emblora-wyndcroft.mp4" },
    preHeader: ["Портфолио", "Внедорожник", "Ташкент"],
    description:
      "[Пара предложений о машине: почему выбрали именно её и для какой задачи брал клиент.]",
    vin: "[VIN]",
    dealNo: "[№ сделки]",
    quick: [
      { label: "Цена под ключ", value: "$[X]" },
      { label: "Год", value: "2024" },
      { label: "Кузов", value: "Внедорожник" },
      { label: "Топливо", value: "[Бензин]" },
      { label: "Владельцев", value: "[X]" },
    ],
    specs: [
      { label: "Цена под ключ ($)", value: "[X]" },
      { label: "Пробег", value: "[XX XXX] км" },
      { label: "Год", value: "2024" },
      { label: "Кузов", value: "Внедорожник" },
      { label: "Модель", value: "[Модель]" },
      { label: "Комплектация", value: "[Комплектация]" },
      { label: "Топливо", value: "[Бензин]" },
      { label: "Владельцев", value: "[X]" },
    ],
    gallery: ["/media/cars/emblora-wyndcroft.webp"],
    details: [
      {
        title: "Технические данные",
        body: "[Двигатель, коробка, привод, расход — из аукционного листа.]",
      },
      {
        title: "Состояние и история",
        body: "[Что показал аукционный лист и диагностика: пробег, окрасы, ДТП. Пишем и то, что нашли плохого.]",
      },
      {
        title: "Что вошло в цену",
        body: "Стоимость авто, доставка до границы, экспедирование, растаможка, наша комиссия. [Разбивка по статьям.]",
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

export const services: Service[] = [
  {
    title: "Мы отказываемся от машин",
    image: "/media/services/inspection.webp",
  },
  {
    title: "Один договор — одна ответственность",
    image: "/media/services/contract.jpg",
  },
  { title: "Цена не меняется", image: "/media/services/warranty.webp" },
  {
    title: "Работаем по Узбекистану и Кыргызстану",
    image: "/media/services/detailing.webp",
  },
  {
    title: "[XX] автомобилей доставлено с [год]",
    image: "/media/services/financing.jpg",
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
export type TeamMember = { name: string; role: string; image: string };

export const team: TeamMember[] = [
  {
    name: "[Имя Фамилия]",
    role: "Основатель, [XX] лет в перевозке авто · Telegram: [@ник]",
    image: "/media/team/michael-richardson.webp",
  },
  {
    name: "[Имя Фамилия]",
    role: "Представитель в Кыргызстане, [город] · Telegram: [@ник]",
    image: "/media/team/sarah-thompson.webp",
  },
];

/* --- Blog collection (§8) --- */
export type Post = {
  slug: string;
  date: string;
  title: string;
  image: string;
};

export const posts: Post[] = [
  {
    slug: "lamborghini-urus-performante",
    date: "2026-05-03",
    title:
      "The New Lamborghini Urus Performante Has Arrived—And It's Everything We Hoped For",
    image: "/media/blog/urus-performante.webp",
  },
  {
    slug: "leasing-vs-buying",
    date: "2026-05-03",
    title: "Leasing vs Buying a Luxury Car: Which Is Right for You in 2024?",
    image: "/media/blog/leasing-vs-buying.webp",
  },
];

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));

/* --- FAQ (§10) --- */
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Как я плачу и когда?",
    answer:
      "🇺🇿 [Схема по Узбекистану: аванс за подбор, оплата авто, остаток — кому и куда идут деньги.] 🇰🇬 [Схема по Кыргызстану — валютный контроль работает иначе, порядок отличается.]",
  },
  {
    question: "Что, если машина придёт повреждённой?",
    answer:
      "Автомобиль застрахован на полную стоимость. Повреждения фиксируются актом при выдаче. Претензию к перевозчику и страховой ведём мы.",
  },
  {
    question: "Что, если машина не придёт вообще?",
    answer: "[Порядок возврата средств и срок.]",
  },
  {
    question: "Есть ли гарантия?",
    answer:
      "[Честный ответ. Если заводской гарантии нет — сказать прямо и объяснить, что предлагается взамен: сервис-партнёр, своя гарантия или ничего.]",
  },
  {
    question: "Сколько это занимает?",
    answer:
      "[XX] дней от оплаты до выдачи. Сроки могут сдвинуться из-за очереди на границе — предупреждаем заранее. 🇺🇿 [срок для Узбекистана] 🇰🇬 [срок для Кыргызстана]",
  },
  {
    question: "Из чего складывается растаможка?",
    answer:
      "🇺🇿 Таможенная пошлина зависит от возраста авто и включает надбавку за см³ объёма двигателя, плюс НДС 12% и таможенные сборы. 🇰🇬 Пошлина по ставкам ЕАЭС плюс [перечень сборов Кыргызстана: утилизационный сбор, регистрационные сборы — уточнить у брокера, ставки не совпадают с казахстанскими].",
  },
  {
    question: "Почему это дешевле, чем купить здесь?",
    answer:
      "[Конкретный расчёт на примере одной модели для каждой страны: локальная рыночная цена против цены под ключ.]",
  },
  {
    question: "Я живу в Кыргызстане — вы работаете с моей страной?",
    answer:
      "Да. Считаем цену под ключ по кыргызским правилам, оформляем растаможку и доставляем в Бишкек, Ош и другие города. Документы и договор — по законодательству Кыргызстана.",
  },
  {
    question: "Машина новая или б/у?",
    answer: "[Прямой ответ: типичный пробег и возраст.]",
  },
  {
    question: "Я могу выбрать конкретную машину?",
    answer:
      "Да. Мы присылаем варианты, вы выбираете. До согласования VIN вы ничем не связаны.",
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
    body: "[XX] дней. Держим вас в курсе на каждом этапе.",
  },
  {
    title: "Растаможка и выдача",
    body: "Оформляем документы, передаём машину с полным пакетом.",
  },
];
