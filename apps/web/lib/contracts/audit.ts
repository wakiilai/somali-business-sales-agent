import { z } from "zod";

export const auditEventSchema = z.object({
  id: z.string(),
  actorType: z.enum(["customer", "staff", "ai", "system", "automation"]),
  actorId: z.string(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string(),
  result: z.enum(["success", "failure", "pending", "denied"]),
  approvalRef: z.string().nullable(),
  correlationKey: z.string(),
  timestamp: z.string(),
  tenantScope: z.string(),
});

export type AuditEvent = z.infer<typeof auditEventSchema>;