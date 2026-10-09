import { z } from "zod";

export const leadSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  phone: z.string(),
  source: z.string(),
  status: z.enum(["new", "contacted", "qualified", "proposal_sent", "won", "lost"]),
  owner: z.string(),
  productInterest: z.string(),
  nextFollowUp: z.string().nullable(),
  completeness: z.number().min(0).max(100),
  conversationId: z.string(),
  notes: z.string(),
  createdAt: z.string(),
});

export type Lead = z.infer<typeof leadSchema>;