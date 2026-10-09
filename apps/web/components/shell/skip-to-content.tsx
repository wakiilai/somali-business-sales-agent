"use client";

import { cn } from "@/lib/utils";

export function SkipToContent({ className }: { className?: string }) {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50",
        "focus:inline-flex focus:items-center focus:rounded-md focus:px-4 focus:py-2",
        "focus:text-sm focus:font-medium focus:no-underline",
        "focus:bg-saffron focus:text-obsidian focus:shadow-lg",
        className
      )}
    >
      Skip to content
    </a>
  );
}