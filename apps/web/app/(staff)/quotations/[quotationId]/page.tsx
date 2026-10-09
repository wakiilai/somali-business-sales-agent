"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { quotations as allQuotations } from "@/lib/fixtures/quotations";
import { fullDate } from "@/lib/formatters/date";
import { statusLabel, statusVariant } from "@/lib/formatters/status";
import { formatCurrency } from "@/lib/formatters/currency";
import { FileText, WarningCircle, Eye, PaperPlaneTilt } from "@phosphor-icons/react";

export default function QuotationDetailPage() {
  const params = useParams();
  const quotation = allQuotations.find((q) => q.id === params.quotationId);

  if (!quotation) {
    return (
      <div className="flex flex-col items-center py-16">
        <FileText className="size-10 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">Quotation not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">{quotation.customerName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={statusVariant(quotation.status)}>{statusLabel(quotation.status)}</Badge>
            {quotation.discountUsd && <Badge variant="warning"><WarningCircle className="size-3 mr-1" />Discount: {formatCurrency(quotation.discountUsd)}</Badge>}
            <Badge variant="warning">Demo data</Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="font-heading text-2xl font-bold text-foreground">{formatCurrency(quotation.totalUsd)}</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm font-medium">Items</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {quotation.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-md px-3 py-2 text-sm" style={{ backgroundColor: "var(--surface-subtle)" }}>
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity} × {formatCurrency(item.unitPriceUsd)}</p>
                </div>
                <p className="font-medium">{formatCurrency(item.totalUsd)}</p>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-sm px-3">
              <span>Subtotal</span>
              <span>{formatCurrency(quotation.subtotalUsd)}</span>
            </div>
            {quotation.discountUsd && (
              <div className="flex justify-between text-sm px-3 text-warning">
                <span>Discount ({quotation.discountPercent}%)</span>
                <span>-{formatCurrency(quotation.discountUsd)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-semibold px-3 pt-1">
              <span>Total</span>
              <span>{formatCurrency(quotation.totalUsd)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Pricing</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">Price verified: {fullDate(quotation.priceVerifiedAt)}</p>
            <p className="text-muted-foreground">Requested by: {quotation.requestedBy}</p>
            {quotation.approvedBy && <p className="text-muted-foreground">Approved by: {quotation.approvedBy}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Validity</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">Created: {fullDate(quotation.createdAt)}</p>
            <p className="text-muted-foreground">Expires: {fullDate(quotation.expiresAt)}</p>
          </CardContent>
        </Card>
      </div>

      {quotation.status === "pending_approval" && (
        <div className="rounded-md border border-warning/30 px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "var(--surface-subtle)" }}>
          <WarningCircle className="size-5 text-warning shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Approval required</p>
            <p className="text-xs text-muted-foreground">This quotation requires manager approval before it can be sent to the customer. Finalization is disabled until approved.</p>
          </div>
        </div>
      )}

      {/* Customer-facing preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Eye className="size-4" />
            Customer Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border px-5 py-4 text-sm space-y-3" style={{ borderColor: "var(--border)", backgroundColor: "var(--ivory, #FFF8EA)" }}>
            <div className="text-center">
              <p className="font-heading text-base font-bold text-foreground">Hilaac Electronics</p>
              <p className="text-xs text-muted-foreground mt-0.5">Official Quotation</p>
            </div>
            <Separator />
            <div className="space-y-1">
              <p className="text-muted-foreground">Prepared for: <span className="font-medium text-foreground">{quotation.customerName}</span></p>
              <p className="text-muted-foreground">Date: <span className="font-medium text-foreground">{fullDate(quotation.createdAt)}</span></p>
              <p className="text-muted-foreground">Valid until: <span className="font-medium text-foreground">{fullDate(quotation.expiresAt)}</span></p>
            </div>
            <Separator />
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-muted-foreground border-b" style={{ borderColor: "var(--border)" }}>
                  <th className="pb-1 font-medium">Item</th>
                  <th className="pb-1 font-medium text-center">Qty</th>
                  <th className="pb-1 font-medium text-right">Price</th>
                  <th className="pb-1 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {quotation.items.map((item, i) => (
                  <tr key={i} className="text-xs">
                    <td className="py-1.5">{item.productName}</td>
                    <td className="py-1.5 text-center">{item.quantity}</td>
                    <td className="py-1.5 text-right">{formatCurrency(item.unitPriceUsd)}</td>
                    <td className="py-1.5 text-right font-medium">{formatCurrency(item.totalUsd)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Separator />
            {quotation.discountUsd && (
              <div className="flex justify-between text-xs text-warning">
                <span>Discount ({quotation.discountPercent}%)</span>
                <span>-{formatCurrency(quotation.discountUsd)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-foreground pt-1">
              <span>Total</span>
              <span>{formatCurrency(quotation.totalUsd)}</span>
            </div>
            <p className="text-[10px] text-muted-foreground text-center pt-2">
              Prices verified as of {fullDate(quotation.priceVerifiedAt)}. Subject to change. This is a demo quotation.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Send to customer — disabled */}
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="lg"
          disabled
          title={quotation.status !== "approved" ? "Quotation must be approved before sending" : "Send to customer"}
          className="gap-2"
        >
          <PaperPlaneTilt className="size-4" />
          Send to Customer
          {quotation.status !== "approved" && (
            <span className="text-[10px] opacity-70">(approval required)</span>
          )}
        </Button>
      </div>
    </div>
  );
}