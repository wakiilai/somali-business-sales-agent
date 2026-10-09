import { z } from "zod";

export const conversationSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  language: z.enum(["so", "en", "mixed"]),
  intent: z.string(),
  status: z.enum(["active", "waiting", "handed_off", "resolved"]),
  owner: z.string(),
  lastMessageAt: z.string(),
  messages: z.array(
    z.object({
      id: z.string(),
      role: z.enum(["customer", "assistant", "staff", "system"]),
      content: z.string(),
      timestamp: z.string(),
      verified: z.boolean().optional(),
      sourceRef: z.string().optional(),
    })
  ),
  unread: z.boolean(),
});

export type Conversation = z.infer<typeof conversationSchema>;