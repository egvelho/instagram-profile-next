import { z } from "zod";
import { userMessages } from "src/user/userMessages";

const nameMinLength = 2;
const nameMaxLength = 24;
const nameField = "nome";
export const nameSchema = z
  .string()
  .min(nameMinLength, {
    message: userMessages.min(nameField, nameMinLength),
  })
  .max(nameMaxLength, {
    message: userMessages.max(nameField, nameMaxLength),
  })
  .transform((name) => name.trim());
