import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  children,
  icon: Icon,
  className,
  centered = true,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  centered?: boolean;
}) {
  if (centered) {
    return (
      <div className={cn("mb-14 text-center w-full max-w-4xl mx-auto", className)}>
        {eyebrow ? (
          <div className="mb-5 flex justify-center">
            <span className="section-pill flex items-center gap-2">
              {Icon ? <Icon aria-hidden="true" size={12} className="text-accent" /> : null}
              {eyebrow}
            </span>
          </div>
        ) : null}
        <h2 className="text-balance text-[32px] font-bold tracking-tight text-ink sm:text-[40px] md:text-[48px]">
          {title}
        </h2>
        {children ? (
          <div className="mx-auto mt-4 max-w-xl text-[17px] text-label-secondary text-balance">
            {children}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("max-w-3xl", className)}>
      <div className="mb-3 flex items-center gap-3">
        {Icon ? (
          <span className="grid size-9 place-items-center rounded-ios-sm bg-fill-tertiary text-accent">
            <Icon aria-hidden="true" size={16} />
          </span>
        ) : null}
        {eyebrow ? (
          <span className="ios-caption1 font-semibold uppercase tracking-[0.06em] text-label-secondary">
            {eyebrow}
          </span>
        ) : null}
      </div>
      <h2 className="text-balance ios-title1 text-ink">{title}</h2>
      {children ? (
        <div className="mt-4 ios-body text-label-secondary">{children}</div>
      ) : null}
    </div>
  );
}
