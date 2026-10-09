"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { leads as allLeads } from "@/lib/fixtures/leads";
import { fullDate } from "@/lib/formatters/date";
import { statusLabel, statusVariant } from "@/lib/formatters/status";
import { Phone, CalendarCheck, ChatCircle, Note, Users } from "@phosphor-icons/react";

export default function LeadDetailPage() {
  const params = useParams();
  const lead = allLeads.find((l) => l.id === params.leadId);

  if (!lead) {
    return (
      <div className="flex flex-col items-center py-16">
        <Users className="size-10 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">Lead not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">{lead.customerName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={statusVariant(lead.status)}>{statusLabel(lead.status)}</Badge>
            <Badge variant="warning">Demo data</Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Completeness</p>
          <div className="mt-1 h-2 w-24 rounded-full bg-surface-muted overflow-hidden">
            <div className="h-full rounded-full bg-saffron" style={{ width: `${lead.completeness}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{lead.completeness}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Contact</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><Phone className="size-4 text-muted-foreground" />{lead.phone}</p>
            <p className="flex items-center gap-2"><ChatCircle className="size-4 text-muted-foreground" />Source: {lead.source}</p>
            <p className="flex items-center gap-2"><CalendarCheck className="size-4 text-muted-foreground" />Created: {fullDate(lead.createdAt)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Interest</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-medium">{lead.productInterest}</p>
            <p className="text-muted-foreground">Owner: {lead.owner}</p>
            {lead.nextFollowUp && <p className="text-muted-foreground">Follow-up: {fullDate(lead.nextFollowUp)}</p>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm font-medium flex items-center gap-2"><Note className="size-4" />Notes</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground">{lead.notes}</p></CardContent>
      </Card>
    </div>
  );
}