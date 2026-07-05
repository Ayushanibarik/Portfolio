import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function SpatialCard({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-ios-lg border border-separator-opaque bg-canvas-elevated shadow-ios-sm",
        "transition-shadow duration-300 hover:shadow-ios-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
