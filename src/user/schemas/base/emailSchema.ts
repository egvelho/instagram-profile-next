import { z } from "zod";

const messages = {
  emailInvalid: "O email digitado é inválido.",
};

export const emailSchema = z.string().email({
  message: messages.emailInvalid,
});
