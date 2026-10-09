"use client";

import { Button } from "@/components/ui/button";
import { ArrowCounterClockwise } from "@phosphor-icons/react";

export default function ConversationDetailError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="py-16 text-center">
      <h2 className="font-heading text-lg font-semibold">Conversation could not load</h2>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset} variant="secondary" className="mt-4"><ArrowCounterClockwise className="size-4" /> Try again</Button>
    </div>
  );
}