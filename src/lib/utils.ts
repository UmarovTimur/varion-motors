import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has no knowledge of the custom scales defined in globals.css.
 * Left unconfigured it classifies `text-h2` as a text COLOUR and drops it as
 * soon as a real colour such as `text-ink` appears in the same cn() call —
 * which silently collapsed every section heading to the default 16px.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "quote",
            "body-xxl",
            "body-xl",
            "body-l",
            "body",
            "body-xs",
            "tag",
            "metric",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "ink",
            "ink-muted",
            "ink-subtle",
            "paper",
            "paper-muted",
            "grey",
            "dark-grey",
            "text-black",
            "text-white",
          ],
        },
      ],
      "font-family": [{ font: ["sans", "display"] }],
      "rounded": [{ rounded: ["card", "btn", "icon"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Russian typography for headings: a one- or two-letter word (и, с, в, на, по…)
 * must not be left dangling at the end of a line, and an em dash must not start
 * one. Both are fixed by gluing them with a non-breaking space — `text-balance`
 * cannot do it, since it only balances where a break is already allowed.
 *
 * The pass runs twice so a run of short words ("Кореи — с проверкой") is caught
 * as a chain, and whitespace is collapsed first because JSX literals arrive
 * wrapped across source lines.
 */
const SHORT_WORD = /(^|[\s(«„"' —–-])([A-Za-zА-Яа-яЁё]{1,2})[ \t\n]+/g;

export function typo(text: string) {
  let out = text.replace(/\s+/g, " ").trim();
  for (let pass = 0; pass < 2; pass++) out = out.replace(SHORT_WORD, "$1$2\u00a0");
  return out.replace(/ ([—–]) /g, "\u00a0$1 ");
}
