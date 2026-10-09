import { z } from "zod";

export const approvalSchema = z.object({
  id: z.string(),
  type: z.enum(["quotation", "discount", "refund", "stock_adjustment", "handoff"]),
  risk: z.enum(["low", "medium", "high", "critical"]),
  title: z.string(),
  description: z.string(),
  requestedBy: z.string(),
  tenantScope: z.string(),
  evidence: z.string(),
  status: z.enum(["pending", "approved", "rejected"]),
  decidedBy: z.string().nullable(),
  decidedAt: z.string().nullable(),
  createdAt: z.string(),
});

export type Approval = z.infer<typeof approvalSchema>;