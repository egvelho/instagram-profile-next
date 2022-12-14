import { z } from "zod";
import { allowedProviders } from "src/auth/allowedProviders";

const messages = {
  invalidProvider:
    "Te peguei seu hacker safado! Aguarde a visita dos meus advogados!",
};

export const providerSchema = z
  .string()
  .refine((provider) => allowedProviders.includes(provider), {
    message: messages.invalidProvider,
  });
