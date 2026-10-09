"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement> & {
    orientation?: "horizontal" | "vertical";
  }
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <hr
    ref={ref}
    className={cn(
      "shrink-0 border-0",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className
    )}
    style={{ backgroundColor: "var(--border)" }}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };