import { z } from "zod";

export const receiverIdSchema = z
  .string()
  .max(5)
  .regex(/^[0-9]+$/g)
  .transform((receiverId) => Number(receiverId));
