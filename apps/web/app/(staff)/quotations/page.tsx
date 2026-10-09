"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { quotations as allQuotations } from "@/lib/fixtures/quotations";
import { relativeTime } from "@/lib/formatters/date";
import { statusLabel, statusVariant } from "@/lib/formatters/status";
import { formatCurrency } from "@/lib/formatters/currency";
import { FileText, WarningCircle } from "@phosphor-icons/react";

export default function QuotationsPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
        <FileText className="size-5 text-saffron" />
        Quotations
        <Badge variant="warning">Demo data</Badge>
      </h2>

      {allQuotations.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-12"><FileText className="size-10 text-muted-foreground mb-3" /><p className="text-sm text-muted-foreground">No quotations yet</p></CardContent></Card>
      ) : (
        <div className="space-y-3">
          {allQuotations.map((q) => (
            <a
              key={q.id}
              href={`/quotations/${q.id}`}
              className="flex items-center justify-between rounded-lg border px-4 py-3.5 transition-shadow hover:shadow-md"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-foreground">{q.customerName}</p>
                  <Badge variant={statusVariant(q.status)}>{statusLabel(q.status)}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {q.items.map((i) => `${i.productName} x${i.quantity}`).join(", ")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Price verified: {relativeTime(q.priceVerifiedAt)}
                  {q.discountUsd && (
                    <span className="ml-2 inline-flex items-center gap-1 text-warning"><WarningCircle className="size-3" />{formatCurrency(q.discountUsd)} discount</span>
                  )}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-medium text-foreground">{formatCurrency(q.totalUsd)}</p>
                <p className="text-xs text-muted-foreground">{q.requestedBy}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{relativeTime(q.createdAt)}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}