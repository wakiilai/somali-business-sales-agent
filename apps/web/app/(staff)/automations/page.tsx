"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { automationRuns } from "@/lib/fixtures/automations";
import { relativeTime, fullDate } from "@/lib/formatters/date";
import { statusLabel, statusVariant } from "@/lib/formatters/status";
import { cn } from "@/lib/utils";
import { Gear, Check, X, Circle, Spinner } from "@phosphor-icons/react";

const stepIcon = (status: string) => {
  switch (status) {
    case "completed": return <Check className="size-3.5 text-success" />;
    case "failed": return <X className="size-3.5 text-danger" />;
    case "in_progress": return <Spinner className="size-3.5 animate-spin text-saffron" />;
    case "skipped": return <Circle className="size-3.5 text-muted-foreground" />;
    default: return <Circle className="size-3.5 text-muted-foreground" />;
  }
};

const stepTypeLabel: Record<string, string> = {
  trigger: "Trigger",
  validation: "Validation",
  ai_interpretation: "AI Interpretation",
  business_rule: "Business Rule",
  approval_gate: "Approval Gate",
  action: "Action",
  audit: "Audit",
};

export default function AutomationsPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
        <Gear className="size-5 text-saffron" />
        Automation Runs
        <Badge variant="warning">Demo data</Badge>
      </h2>

      {automationRuns.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-12"><Gear className="size-10 text-muted-foreground mb-3" /><p className="text-sm text-muted-foreground">No automation runs recorded</p></CardContent></Card>
      ) : (
        <div className="space-y-6">
          {automationRuns.map((run) => (
            <Card key={run.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{run.trigger}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{fullDate(run.startedAt)}</p>
                  </div>
                  <Badge variant={statusVariant(run.status)}>{statusLabel(run.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Timeline */}
                <div className="relative pl-6 space-y-0">
                  {run.steps.map((step, i) => (
                    <div key={i} className="relative pb-4 last:pb-0">
                      {/* Vertical line */}
                      {i < run.steps.length - 1 && (
                        <div className="absolute left-[-15px] top-5 bottom-0 w-px" style={{ backgroundColor: "var(--border)" }} />
                      )}
                      {/* Dot */}
                      <div className="absolute left-[-19px] top-1 flex size-[13px] items-center justify-center rounded-full" style={{ backgroundColor: "var(--surface)" }}>
                        {stepIcon(step.status)}
                      </div>
                      <div className="ml-1">
                        <p className={cn("text-sm font-medium", step.status === "failed" ? "text-danger" : "text-foreground")}>
                          {stepTypeLabel[step.type] ?? step.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{step.detail}</p>
                        {step.timestamp && <p className="text-[10px] text-muted-foreground mt-0.5">{relativeTime(step.timestamp)}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}