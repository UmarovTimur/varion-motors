import { fallbackRates, type Rates } from "./pricing";

/**
 * Official Bank of Russia rates for today (XML_daily.asp): roubles per unit of
 * each currency, in windows-1251 with decimal commas. RUB per USD is the USD
 * rate itself; KRW per USD goes through the rouble (the Bank does not quote
 * cross rates).
 */
const CBR_URL = "https://www.cbr.ru/scripts/XML_daily.asp";

/** The Bank publishes once a day; re-check twice a day. */
export const RATES_REVALIDATE = 43200;

/** Roubles for one unit of `code` — `VunitRate` is already per single unit. */
function rubPer(xml: string, code: string): number {
  const valute = xml.match(
    new RegExp(`<CharCode>${code}</CharCode>[\\s\\S]*?<VunitRate>([\\d,]+)</VunitRate>`),
  );
  const value = valute ? Number(valute[1].replace(",", ".")) : NaN;
  if (!(value > 0)) throw new Error(`no ${code} rate in the CBR response`);
  return value;
}

/** Live rates, cached for RATES_REVALIDATE seconds; the fallback on any error,
 * so a Bank outage never takes the car pages down. */
export async function getRates(): Promise<Rates> {
  try {
    const res = await fetch(CBR_URL, {
      next: { revalidate: RATES_REVALIDATE },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`CBR responded ${res.status}`);
    const xml = new TextDecoder("windows-1251").decode(await res.arrayBuffer());

    const date = xml.match(/<ValCurs Date="(\d{2})\.(\d{2})\.(\d{4})"/);
    if (!date) throw new Error("no date in the CBR response");

    const usd = rubPer(xml, "USD");
    return {
      asOf: `${date[3]}-${date[2]}-${date[1]}`,
      RUB: Math.round(usd * 100) / 100,
      KRW: Math.round(usd / rubPer(xml, "KRW")),
      source: "cbr",
    };
  } catch (error) {
    console.error("[rates] falling back to fixed rates:", error);
    return fallbackRates;
  }
}
