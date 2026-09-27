/** The catalog (/inventory, the home-page block and every link to it) is off
 * until there are enough cars to show — see TODO.md ("Каталог"). */
export const SHOW_CATALOG = false;

export const site = {
  name: "VARION MOTORS",
  tagline:
    "Подбираем, проверяем и привозим автомобили из Китая и Кореи по всему СНГ — с документами и итоговой ценой, известной заранее.",
  /** Empty until the client sends it; the footer hides every empty field. */
  mapsUrl: "",
  credit: "Made By Akem in Framer",
  /** Working numbers, in display order. They used to be split per country;
   * now that the offer is CIS-wide they are just the lines you can call. */
  phones: ["+998 90 345 38 43", "+7 991 139 3253"],
  telegram: "https://t.me/aim_team1",
  /** Public channel with news and new arrivals — not the chat above. */
  telegramChannel: "https://t.me/name_qili",
  whatsapp: "https://wa.me/998903453843",
  legalName: "",
  address: "",
  email: "",
};
