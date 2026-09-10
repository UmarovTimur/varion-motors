/**
 * Stand-in for the Framer CMS collections and static section copy.
 * Swap these for real CMS/database reads once the backend lands — the shape is
 * what the components consume, so only this file needs to change.
 */

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Inventory", href: "/inventory" },
  { label: "Trade-In", href: "/trade-in" },
  { label: "Financing", href: "/financing" },
  { label: "About-us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export const footerLinksLeft: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "Trade-In", href: "/trade-in" },
  { label: "Financing", href: "/financing" },
];

export const footerLinksRight: NavLink[] = [
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export const legalLinks: NavLink[] = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

/* --- Inventories collection → /inventory/:slug (§4) --- */
export type Car = {
  slug: string;
  name: string;
  price: number;
  year: number;
  badge?: string;
  image: string;
};

export const cars: Car[] = [
  {
    slug: "dreznak-karov",
    name: "Dreznak Karov",
    price: 145000,
    year: 2024,
    image: "/media/cars/dreznak-karov.png",
  },
  {
    slug: "zethrux-infernum",
    name: "Zethrux Infernum",
    price: 241350,
    year: 2023,
    badge: "Performance Icon",
    image: "/media/cars/zethrux-infernum.webp",
  },
  {
    slug: "emblora-wyndcroft",
    name: "Emblora Wyndcroft",
    price: 239950,
    year: 2024,
    badge: "New Arrival",
    image: "/media/cars/emblora-wyndcroft.webp",
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

/* --- Services (§5) --- */
export type Service = { title: string; image: string };

export const services: Service[] = [
  { title: "Full Technical Inspection", image: "/media/services/inspection.webp" },
  { title: "Verified History & Trusted Brand", image: "/media/services/history.jpg" },
  { title: "Warranty Support", image: "/media/services/detailing.webp" },
  { title: "Professional Detailing", image: "/media/services/detailing.webp" },
  { title: "Leasing & Financing", image: "/media/services/financing.webp" },
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
    name: "Michael Richardson",
    role: "Sales Director",
    image: "/media/team/michael-richardson.webp",
  },
  {
    name: "Sarah Thompson",
    role: "Founder & CEO",
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
    title:
      "Leasing vs Buying a Luxury Car: Which Is Right for You in 2024?",
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
    question: "What financing options do you offer?",
    answer:
      "We work with a panel of prime and specialist lenders to arrange hire purchase, PCP and balloon structures, with terms from 24 to 84 months. Pre-approval takes under an hour and does not affect your credit score.",
  },
  {
    question: "Can I trade in my current vehicle?",
    answer:
      "Yes. Send us the registration and mileage and we will return a firm valuation within one business day, held for seven days. The balance is settled against your new vehicle or paid out directly.",
  },
  {
    question: "Do your used vehicles come with a warranty?",
    answer:
      "Every vehicle leaves us with a minimum twelve-month comprehensive warranty covering the engine, transmission and electronics, extendable to thirty-six months.",
  },
  {
    question: "How do I schedule a test drive?",
    answer:
      "Book online or call the showroom. Private appointments run seven days a week, and we can bring the vehicle to your home or office anywhere in the state.",
  },
  {
    question: "Do you offer vehicle delivery?",
    answer:
      "We deliver nationwide on fully enclosed transport, fully insured. Delivery inside Washington is complimentary; anywhere else is quoted at cost before you commit.",
  },
];
