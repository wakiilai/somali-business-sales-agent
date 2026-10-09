"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auditEvents } from "@/lib/fixtures/audit";
import { relativeTime, fullDate } from "@/lib/formatters/date";
import { Scroll, Fingerprint, Link as LinkIcon } from "@phosphor-icons/react";

const actorLabel: Record<string, string> = {
  ai: "AI",
  staff: "Staff",
  customer: "Customer",
  system: "System",
  automation: "Automation",
};

export default function AuditPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
        <Scroll className="size-5 text-saffron" />
        Audit Log
        <Badge variant="warning">Demo data</Badge>
      </h2>

      <p className="text-sm text-muted-foreground">
        Evidence records. Every entry is a verified event, not chat history.
      </p>

      {auditEvents.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-12"><Scroll className="size-10 text-muted-foreground mb-3" /><p className="text-sm text-muted-foreground">No audit events recorded</p></CardContent></Card>
      ) : (
        <div className="space-y-2">
          {auditEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Badge variant={event.result === "success" ? "success" : event.result === "denied" ? "danger" : "warning"}>
                  {event.action.replace(/_/g, " ")}
                </Badge>
                <div className="min-w-0">
                  <p className="text-foreground truncate">
                    <span className="font-medium">{actorLabel[event.actorType] ?? event.actorType}</span>{" "}
                    <span className="text-muted-foreground">→ {event.resource}/{event.resourceId}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-muted-foreground">{event.tenantScope}</span>
                    {event.approvalRef && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-info">
                        <LinkIcon className="size-2.5" />
                        {event.approvalRef}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Fingerprint className="size-3" />
                  {event.correlationKey}
                </span>
                <span className="text-[11px] text-muted-foreground whitespace-nowrap" title={fullDate(event.timestamp)}>
                  {relativeTime(event.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}