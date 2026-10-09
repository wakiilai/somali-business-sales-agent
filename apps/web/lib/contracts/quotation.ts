import { z } from "zod";

export const quotationSchema = z.object({
  id: z.string(),
  leadId: z.string(),
  customerName: z.string(),
  status: z.enum(["draft", "pending_approval", "approved", "rejected", "expired"]),
  items: z.array(
    z.object({
      productId: z.string(),
      productName: z.string(),
      quantity: z.number(),
      unitPriceUsd: z.number(),
      totalUsd: z.number(),
    })
  ),
  subtotalUsd: z.number(),
  discountPercent: z.number().optional(),
  discountUsd: z.number().optional(),
  totalUsd: z.number(),
  priceVerifiedAt: z.string(),
  requestedBy: z.string(),
  approvedBy: z.string().nullable(),
  createdAt: z.string(),
  expiresAt: z.string(),
});

export type Quotation = z.infer<typeof quotationSchema>;