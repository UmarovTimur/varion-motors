import Link from "next/link";
import { Sweep } from "@/components/ui/sweep";
import { cn } from "@/lib/utils";

/**
 * Link Item (§3) — a pill, not a plain text link.
 * 54px tall, padding 12/24, radius 16, background #FAFAFA.
 *
 * The label carries `mix-blend-darken` so the white sweep passes underneath it
 * without washing the text out.
 */
export function NavLink({
  href,
  children,
  animateOnHover = true,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  animateOnHover?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative isolate flex h-[54px] items-center justify-center gap-2.5 overflow-hidden rounded-btn bg-background-mid px-6 py-3",
        className,
      )}
    >
      <Sweep className="top-[-35px] h-[127px]" animate={animateOnHover} />
      <p className="relative z-(--z-content) font-display text-body-xs font-medium tracking-normal whitespace-nowrap text-text-black mix-blend-darken dark:mix-blend-lighten">
        {children}
      </p>
    </Link>
  );
}
