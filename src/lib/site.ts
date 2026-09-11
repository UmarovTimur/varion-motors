export const site = {
  name: "VARION MOTORS",
  tagline:
    "Подбираем, проверяем и привозим автомобили из Китая и Кореи в Узбекистан и Кыргызстан — с документами и итоговой ценой, известной заранее.",
  mapsUrl: "https://maps.google.com/?q=[адрес офиса]",
  credit: "Made By Akem in Framer",
  /** Contacts are per country: the landing must never merge the two. */
  contacts: {
    uz: { label: "Узбекистан", phone: "[+998 XX XXX XX XX]", city: "Ташкент" },
    kg: { label: "Кыргызстан", phone: "[+996 XXX XXX XXX]", city: "Бишкек" },
  },
  telegram: "https://t.me/[ник]",
  whatsapp: "https://wa.me/[номер]",
  legalName: "[ИП/ООО «Varion Motors»], ИНН [XXXXXXXXX]",
  address: "[Город, улица, дом, офис]",
  email: "[mail@example.com]",
} as const;
