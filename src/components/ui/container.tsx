import { cn } from "@/lib/utils";

/** 1200px content frame. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-6", className)}>
      {children}
    </div>
  );
}
