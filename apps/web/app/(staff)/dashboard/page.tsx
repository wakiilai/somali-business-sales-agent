"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ChatsCircle,
  CheckSquare,
  CalendarCheck,
  Scroll,
  TrendUp,
  Package,
  Warning,
} from "@phosphor-icons/react";
import { conversations } from "@/lib/fixtures/conversations";
import { approvals } from "@/lib/fixtures/approvals";
import { leads } from "@/lib/fixtures/leads";
import { auditEvents } from "@/lib/fixtures/audit";
import { products } from "@/lib/fixtures/products";
import { relativeTime } from "@/lib/formatters/date";

export default function DashboardPage() {
  const newInquiries = conversations.filter((c) => c.status === "active" && c.unread).length;
  const pendingApprovals = approvals.filter((a) => a.status === "pending").length;
  const followUpsToday = leads.filter((l) => l.nextFollowUp && l.nextFollowUp.startsWith("2026-10-09")).length;
  const catalogWarnings = products.filter((p) => p.availability === "out_of_stock" || p.availability === "unavailable");
  const recentAudit = auditEvents.slice(0, 3);

  const metrics = [
    { label: "New Inquiries", value: newInquiries, icon: ChatsCircle, color: "text-saffron", bg: "bg-saffron/10" },
    { label: "Pending Approvals", value: pendingApprovals, icon: CheckSquare, color: "text-warning", bg: "bg-warning/10" },
    { label: "Follow-ups Today", value: followUpsToday, icon: CalendarCheck, color: "text-info", bg: "bg-info/10" },
    { label: "Catalog Warnings", value: catalogWarnings.length, icon: Package, color: "text-danger", bg: "bg-danger/10" },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="mt-1 font-heading text-3xl font-bold text-foreground">
                    {value}
                  </p>
                </div>
                <div className={cn("flex size-10 items-center justify-center rounded-lg", bg)}>
                  <Icon className={cn("size-5", color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trend sparkline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendUp className="size-5 text-saffron" />
            Inquiry Trend
            <Badge variant="warning" className="ml-2">Demo data</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-20">
            {[2, 3, 1, 4, 3, 5, 4].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-saffron/40"
                style={{ height: `${(v / 5) * 100}%`, minHeight: 4 }}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Last 7 days — synthetic demo data
          </p>
        </CardContent>
      </Card>

      {/* Catalog warnings */}
      {catalogWarnings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Warning className="size-5 text-danger" />
              Catalog Warnings
              <Badge variant="danger" className="ml-2">{catalogWarnings.length}</Badge>
              <Badge variant="warning">Demo data</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {catalogWarnings.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm"
                  style={{ backgroundColor: "var(--surface-subtle)" }}
                >
                  <div>
                    <p className="font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.brand} · {p.category}</p>
                  </div>
                  <Badge variant={p.availability === "out_of_stock" ? "warning" : "danger"}>
                    {p.availability === "out_of_stock" ? "Out of Stock" : "Unavailable"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent audit activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Scroll className="size-5 text-saffron" />
            Recent Audit Activity
            <Badge variant="warning" className="ml-2">Demo data</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAudit.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm"
                style={{ backgroundColor: "var(--surface-subtle)" }}
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant={event.result === "success" ? "success" : event.result === "denied" ? "danger" : "warning"}
                  >
                    {event.action.replace(/_/g, " ")}
                  </Badge>
                  <span className="text-muted-foreground">{event.resource}/{event.resourceId}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {relativeTime(event.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}