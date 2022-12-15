import { z } from "zod";

const messageSchema = z
  .string()
  .min(1)
  .max(800)
  .transform((message) =>
    message
      .trim()
      .replace(/\s\s+/g, " ")
      .replace(/[^a-zA-Z0-9áàãéèôóç\.,!?:;()[]{}@%#=*&+-\/\\]/g, "")
  );

export const createMessageSchema = z.object({
  message: messageSchema,
  senderId: z.number(),
  receiverId: z.number(),
});
