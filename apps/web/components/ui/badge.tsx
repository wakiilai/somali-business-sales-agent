import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-surface-muted text-foreground",
        brand:
          "bg-saffron/20 text-obsidian dark:text-ivory",
        success:
          "bg-success/15 text-success",
        warning:
          "bg-warning/15 text-warning",
        danger:
          "bg-danger/15 text-danger",
        info:
          "bg-info/15 text-info",
        outline:
          "border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };