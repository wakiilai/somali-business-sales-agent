"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { conversations as allConversations } from "@/lib/fixtures/conversations";
import { relativeTime } from "@/lib/formatters/date";
import { statusLabel, statusVariant } from "@/lib/formatters/status";
import { ChatsCircle, Globe } from "@phosphor-icons/react";

const langLabels: Record<string, string> = { so: "Somali", en: "English", mixed: "SO/EN" };

export default function ConversationsPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
        <ChatsCircle className="size-5 text-saffron" />
        Conversations
        <Badge variant="warning">Demo data</Badge>
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {allConversations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-12">
              <ChatsCircle className="size-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">No conversations yet</p>
            </CardContent>
          </Card>
        ) : (
          allConversations.map((conv) => (
            <a
              key={conv.id}
              href={`/conversations/${conv.id}`}
              className="block rounded-lg border p-4 transition-shadow hover:shadow-md"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">{conv.customerName}</p>
                    {conv.unread && (
                      <span className="size-2 rounded-full bg-saffron shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conv.messages[conv.messages.length - 1]?.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={statusVariant(conv.status)}>{statusLabel(conv.status)}</Badge>
                    <Badge variant="info" className="gap-1">
                      <Globe className="size-2.5" />
                      {langLabels[conv.language]}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">{conv.intent.replace(/_/g, " ")}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">{conv.owner}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{relativeTime(conv.lastMessageAt)}</p>
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}