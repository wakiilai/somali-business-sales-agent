import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  brand: z.string(),
  priceUsd: z.number(),
  availability: z.enum(["in_stock", "low_stock", "out_of_stock", "unavailable"]),
  description: z.string(),
  specifications: z.record(z.string(), z.string()).optional(),
  lastVerified: z.string(),
});

export type Product = z.infer<typeof productSchema>;