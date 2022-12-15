import { z } from "zod";
import bcrypt from "bcrypt";
import { allowedProviders } from "src/auth/allowedProviders";
import { baseUserSchema } from "./baseUserSchema";
import { passwordSchema } from "./base/passwordSchema";
import { providerSchema } from "./base/providerSchema";
import { uniqueEmailSchema } from "./base/uniqueEmailSchema";

const messages = {
  invalidProvider: "É necessário utilizar a autenticação por credenciais.",
};

const hashedPasswordSchema = passwordSchema.transform(
  async (password) => await bcrypt.hash(password, await bcrypt.genSalt(10))
);

const credentialsProviderSchema = providerSchema.refine(
  (provider) => provider === allowedProviders.credentials,
  {
    message: messages.invalidProvider,
  }
);

export const credentialsUserSchema = baseUserSchema.extend({
  password: hashedPasswordSchema,
  email: uniqueEmailSchema,
  provider: credentialsProviderSchema,
});

export type CredentialsUserSchema = z.infer<typeof credentialsUserSchema>;
