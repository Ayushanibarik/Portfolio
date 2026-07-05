import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
};

export function ButtonLink({
  children,
  className,
  variant = "secondary",
  showArrow,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "focus-ring inline-flex min-h-[50px] items-center justify-center gap-2 rounded-ios-md px-6 py-3 text-[17px] font-semibold transition-all duration-200",
        "active:scale-[0.97] active:opacity-80",
        variant === "primary" &&
          "bg-accent text-white shadow-ios-sm hover:brightness-110",
        variant === "secondary" &&
          "bg-fill-tertiary text-accent hover:bg-fill-secondary",
        variant === "ghost" && "text-accent hover:opacity-70",
        className
      )}
      {...props}
    >
      {children}
      {showArrow ? <ArrowUpRight aria-hidden="true" size={16} /> : null}
    </a>
  );
}
