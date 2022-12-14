import { z } from "zod";
import { nameSchema } from "./base/nameSchema";
import { surnameSchema } from "./base/surnameSchema";
import { emailSchema } from "./base/emailSchema";

export const baseUserSchema = z.object({
  name: nameSchema,
  surname: surnameSchema,
  email: emailSchema,
});

export type BaseUserSchema = z.infer<typeof baseUserSchema>;
