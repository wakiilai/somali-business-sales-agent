export interface AutomationRun {
  id: string;
  trigger: string;
  steps: AutomationStep[];
  status: "running" | "completed" | "failed" | "retrying" | "handed_off";
  startedAt: string;
  completedAt: string | null;
}

export interface AutomationStep {
  name: string;
  type: "trigger" | "validation" | "ai_interpretation" | "business_rule" | "approval_gate" | "action" | "audit";
  status: "completed" | "failed" | "pending" | "in_progress" | "skipped";
  detail: string;
  timestamp: string | null;
}

export const automationRuns: AutomationRun[] = [
  {
    id: "auto-001",
    trigger: "New web chat message from Faarax Cali",
    status: "completed",
    startedAt: "2026-10-09T09:28:00Z",
    completedAt: "2026-10-09T09:29:00Z",
    steps: [
      { name: "Message received", type: "trigger", status: "completed", detail: "Somali language detected. Intent: product_inquiry.", timestamp: "2026-10-09T09:28:00Z" },
      { name: "Validate input", type: "validation", status: "completed", detail: "Message validated. No prompt injection detected.", timestamp: "2026-10-09T09:28:01Z" },
      { name: "AI interpretation", type: "ai_interpretation", status: "completed", detail: "Identified product: Samsung Galaxy A54. Suggested price lookup.", timestamp: "2026-10-09T09:28:02Z" },
      { name: "Business rule check", type: "business_rule", status: "completed", detail: "Catalog lookup authorized. Tenant scope verified.", timestamp: "2026-10-09T09:28:03Z" },
      { name: "Approval gate", type: "approval_gate", status: "completed", detail: "No approval required for standard inquiry.", timestamp: "2026-10-09T09:28:04Z" },
      { name: "Send response", type: "action", status: "completed", detail: "Response sent with verified product data (prod-001).", timestamp: "2026-10-09T09:29:00Z" },
      { name: "Audit recorded", type: "audit", status: "completed", detail: "Event audited with correlation key auto-001-20261009.", timestamp: "2026-10-09T09:29:01Z" },
    ],
  },
  {
    id: "auto-002",
    trigger: "MacBook Air inquiry from Cumar Xasan",
    status: "handed_off",
    startedAt: "2026-10-09T08:12:00Z",
    completedAt: "2026-10-09T08:15:00Z",
    steps: [
      { name: "Message received", type: "trigger", status: "completed", detail: "Mixed language detected. Intent: availability_check.", timestamp: "2026-10-09T08:12:00Z" },
      { name: "Validate input", type: "validation", status: "completed", detail: "Message validated.", timestamp: "2026-10-09T08:12:01Z" },
      { name: "AI interpretation", type: "ai_interpretation", status: "completed", detail: "Identified product: MacBook Air M3. Suggested catalog lookup.", timestamp: "2026-10-09T08:12:02Z" },
      { name: "Business rule check", type: "business_rule", status: "completed", detail: "Catalog lookup for prod-007: product unavailable.", timestamp: "2026-10-09T08:12:03Z" },
      { name: "Approval gate", type: "approval_gate", status: "completed", detail: "Abstention policy triggered. Cannot confirm product data.", timestamp: "2026-10-09T08:13:00Z" },
      { name: "Handoff", type: "action", status: "completed", detail: "Conversation handed off to Support Agent.", timestamp: "2026-10-09T08:15:00Z" },
      { name: "Audit recorded", type: "audit", status: "completed", detail: "Event audited. Abstention logged.", timestamp: "2026-10-09T08:15:01Z" },
    ],
  },
  {
    id: "auto-003",
    trigger: "Scheduled lead follow-up for Maryan Yuusuf",
    status: "failed",
    startedAt: "2026-10-09T08:00:00Z",
    completedAt: null,
    steps: [
      { name: "Scheduled trigger", type: "trigger", status: "completed", detail: "Follow-up due for lead-002.", timestamp: "2026-10-09T08:00:00Z" },
      { name: "Validate lead data", type: "validation", status: "completed", detail: "Lead data valid.", timestamp: "2026-10-09T08:00:01Z" },
      { name: "Generate reminder", type: "action", status: "failed", detail: "Reminder generation failed. Retry scheduled.", timestamp: "2026-10-09T08:00:02Z" },
      { name: "Retry", type: "action", status: "in_progress", detail: "Retrying at next scheduled interval.", timestamp: null },
      { name: "Audit recorded", type: "audit", status: "pending", detail: "Pending until retry completes.", timestamp: null },
    ],
  },
];