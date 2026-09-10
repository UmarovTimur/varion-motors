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
