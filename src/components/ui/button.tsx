import Link from "next/link";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Sweep } from "@/components/ui/sweep";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary";

/**
 * Button (§2 of the Button spec).
 * Body: 54px tall, padding 4/4/4/20, gap 16, radius 16, overflow hidden.
 * Primary sits on light backgrounds, Secondary on dark ones.
 */
const base =
  "group relative isolate inline-flex h-[54px] shrink-0 items-center gap-4 overflow-hidden rounded-btn py-1 pr-1 pl-5 font-display text-body font-medium tracking-normal whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-surface text-text-black",
  secondary:
    "bg-ink text-paper shadow-[inset_-10px_-10px_20px_0_rgb(255_255_255/0.25)]",
};

const arrowTone: Record<ButtonVariant, "dark" | "light"> = {
  primary: "dark",
  secondary: "light",
};

/** A full-strength white bar would be too harsh on the black body. */
const sweepOpacity: Record<ButtonVariant, string> = {
  primary: "opacity-100",
  secondary: "opacity-10",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  /** `false` reproduces the Hoverless variants — same geometry, no arrow move. */
  animateOnHover?: boolean;
  className?: string;
};

type AnchorProps = CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;

type NativeProps = CommonProps & { href?: undefined } & Omit<
    React.ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export function Button(props: AnchorProps | NativeProps) {
  const {
    children,
    variant = "primary",
    animateOnHover = true,
    className,
    ...rest
  } = props;

  const content = (
    <>
      <Sweep
        className={cn("top-[-21px] h-[97px]", sweepOpacity[variant])}
        animate={animateOnHover}
      />
      <span className="relative z-(--z-content) text-body leading-6 font-medium">
        {children}
      </span>
      <ArrowIcon
        tone={arrowTone[variant]}
        animate={animateOnHover}
        className="relative z-(--z-content)"
      />
    </>
  );

  const classes = cn(base, variants[variant], className);

  if (rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorProps;
    // External destinations (Telegram, maps) skip next/link: it parses the href
    // as a route, so anything with brackets in it is read as a dynamic segment.
    if (/^[a-z]+:/i.test(href)) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noreferrer noopener"
          {...(anchorRest as React.ComponentPropsWithoutRef<"a">)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as NativeProps)}>
      {content}
    </button>
  );
}
