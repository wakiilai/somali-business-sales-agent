"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { conversations as allConversations } from "@/lib/fixtures/conversations";
import { relativeTime } from "@/lib/formatters/date";
import { statusLabel } from "@/lib/formatters/status";
import { cn } from "@/lib/utils";
import { Sparkle, User, HandCoins, ChatsCircle } from "@phosphor-icons/react";

export default function ConversationDetailPage() {
  const params = useParams();
  const conversation = allConversations.find((c) => c.id === params.conversationId);

  if (!conversation) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <ChatsCircle className="size-10 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">Conversation not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">{conversation.customerName}</h2>
          <p className="text-sm text-muted-foreground">{conversation.intent.replace(/_/g, " ")} — {statusLabel(conversation.status)}</p>
        </div>
        <Badge variant="warning">Demo data</Badge>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          {conversation.messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-3", msg.role === "customer" && "justify-end")}>
              {msg.role !== "customer" && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-muted">
                  {msg.role === "assistant" ? <Sparkle className="size-4 text-saffron" /> : <User className="size-4 text-muted-foreground" />}
                </div>
              )}
              <div className={cn("max-w-[75%] rounded-lg px-4 py-2.5 text-sm", msg.role === "customer" ? "bg-saffron text-obsidian" : "")}
                style={msg.role !== "customer" ? { backgroundColor: "var(--surface-subtle)" } : undefined}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.verified !== undefined && (
                  <span className={cn("mt-1 inline-flex items-center gap-1 text-[11px]", msg.verified ? "text-success" : "text-muted-foreground")}>
                    {msg.verified ? "Verified catalog data" : "Unverified"}
                  </span>
                )}
                <p className="text-[10px] text-muted-foreground mt-1">{relativeTime(msg.timestamp)}</p>
              </div>
              {msg.role === "customer" && <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-saffron/20"><User className="size-4 text-saffron" /></div>}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm"><HandCoins className="size-4" /> Hand off to staff</Button>
        <span className="ml-auto text-xs text-muted-foreground">Owner: {conversation.owner}</span>
      </div>
    </div>
  );
}