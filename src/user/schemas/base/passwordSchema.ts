import { z } from "zod";
import { userMessages } from "src/user/userMessages";

const passwordMinLength = 8;
const passwordMaxLength = 64;
export const passwordSchema = z
  .string()
  .min(passwordMinLength, {
    message: userMessages.min("senha", passwordMinLength),
  })
  .max(passwordMaxLength, {
    message: userMessages.max("senha", passwordMaxLength),
  });
