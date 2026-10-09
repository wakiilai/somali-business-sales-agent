"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { leads as allLeads } from "@/lib/fixtures/leads";
import { relativeTime } from "@/lib/formatters/date";
import { statusLabel, statusVariant } from "@/lib/formatters/status";
import { Users, MagnifyingGlass, Phone } from "@phosphor-icons/react";

export default function LeadsPage() {
  const [search, setSearch] = useState("");

  const filtered = allLeads.filter(
    (l) =>
      l.customerName.toLowerCase().includes(search.toLowerCase()) ||
      l.productInterest.toLowerCase().includes(search.toLowerCase()) ||
      l.status.includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="size-5 text-saffron" />
          Leads
          <Badge variant="warning">Demo data</Badge>
        </h2>
      </div>

      <div className="relative">
        <MagnifyingGlass className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search by name, product, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card><CardContent className="flex flex-col items-center py-12"><Users className="size-10 text-muted-foreground mb-3" /><p className="text-sm text-muted-foreground">No leads found</p></CardContent></Card>
        ) : (
          filtered.map((lead) => (
            <a
              key={lead.id}
              href={`/leads/${lead.id}`}
              className="flex items-center justify-between rounded-lg border px-4 py-3 transition-shadow hover:shadow-md"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
              <div>
                <p className="font-medium text-foreground">{lead.customerName}</p>
                <p className="text-sm text-muted-foreground">{lead.productInterest}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant={statusVariant(lead.status)}>{statusLabel(lead.status)}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="size-3" />{lead.phone}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">{lead.owner}</p>
                {lead.nextFollowUp && <p className="text-[11px] text-muted-foreground mt-1">Next: {relativeTime(lead.nextFollowUp)}</p>}
                <div className="mt-1.5 h-1.5 w-16 rounded-full bg-surface-muted overflow-hidden">
                  <div className="h-full rounded-full bg-saffron" style={{ width: `${lead.completeness}%` }} />
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}