import type { User, Prisma } from "@prisma/client";
import type { SafeParseReturnType } from "zod";
import { allowedProviders } from "src/auth/allowedProviders";
import { p } from "src/prismaClient";
import {
  credentialsUserSchema,
  CredentialsUserSchema,
} from "./schemas/credentialsUserSchema";
import { googleUserSchema, GoogleUserSchema } from "./schemas/googleUserSchema";

export type { User } from "@prisma/client";

export function findById(
  id: number,
  args: Omit<Prisma.UserFindFirstArgs, "where"> = { select: { id: true } }
) {
  return p.user.findFirst({
    ...args,
    where: {
      id,
    },
  });
}

export function findByEmail(
  email: string,
  args: Omit<Prisma.UserFindUniqueArgs, "where"> = { select: { id: true } }
) {
  return p.user.findUnique({
    ...args,
    where: {
      email,
    },
  });
}

export function findMany(args: Omit<Prisma.UserFindManyArgs, "data"> = {}) {
  return p.user.findMany(args);
}

export async function create(
  user?: Partial<User>,
  args: Omit<Prisma.UserCreateArgs, "data"> = { select: { id: true } }
) {
  let userValidation: SafeParseReturnType<
    User,
    CredentialsUserSchema | GoogleUserSchema
  >;

  switch (user?.provider) {
    case allowedProviders.credentials:
      userValidation = await credentialsUserSchema.safeParseAsync(user);
      break;
    case allowedProviders.google:
      userValidation = await googleUserSchema.safeParseAsync(user);
      break;
    default:
      return {
        errors: [],
      };
  }

  if (userValidation.success === true) {
    const user = await p.user.create({
      ...args,
      data: userValidation.data,
    });
    return { user };
  } else {
    return {
      errors: userValidation.error.errors,
    };
  }
}
