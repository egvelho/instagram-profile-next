import { z } from "zod";
import { userMessages } from "src/user/userMessages";

const surnameMinLength = 2;
const surnameMaxLength = 48;
const surnameField = "sobrenome";

export const surnameSchema = z
  .string()
  .min(surnameMinLength, {
    message: userMessages.min(surnameField, surnameMinLength),
  })
  .max(surnameMaxLength, {
    message: userMessages.max(surnameField, surnameMaxLength),
  })
  .transform((surname) => surname.trim());
