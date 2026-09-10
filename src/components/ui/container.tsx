import { cn } from "@/lib/utils";

/**
 * The content frame every section sits in, matching Framer's "Content" node:
 * 600px / 20px padding on phone, 1200 / 24 on tablet, 1480 / 32 on desktop.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[600px] px-5 tablet:max-w-[1200px] tablet:px-6 desktop:max-w-[1480px] desktop:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
