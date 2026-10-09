"use client";

import { Button } from "@/components/ui/button";
import { ArrowCounterClockwise } from "@phosphor-icons/react";

export default function ChatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h2 className="font-heading text-lg font-semibold text-foreground">
        Chat could not load
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {error.message || "An unexpected error occurred."}
      </p>
      <Button onClick={reset} variant="secondary" className="mt-4">
        <ArrowCounterClockwise className="size-4" />
        Try again
      </Button>
    </div>
  );
}