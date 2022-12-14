import * as userRepository from "src/user/userRepository";
import { emailSchema } from "./emailSchema";

const messages = {
  emailExists: "Esse email já está cadastrado",
};

export const uniqueEmailSchema = emailSchema.refine(
  async (email) => {
    const user = await userRepository.findByEmail(email);
    return user === null;
  },
  {
    message: messages.emailExists,
  }
);
