import type { User, Prisma } from "@prisma/client";
import type { SafeParseReturnType } from "zod";
import { p } from "src/prismaClient";
import {
  credentialsUserSchema,
  CredentialsUserSchema,
} from "./schemas/credentialsUserSchema";
import { googleUserSchema, GoogleUserSchema } from "./schemas/googleUserSchema";

export type { User } from "@prisma/client";

export function findById(
  id: number,
  args: Omit<Prisma.UserFindFirstArgs, "where"> = {}
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
  args: Omit<Prisma.UserFindUniqueArgs, "where"> = {}
) {
  return p.user.findUnique({
    ...args,
    where: {
      email,
    },
  });
}

export async function create(
  user?: Partial<User>,
  args: Omit<Prisma.UserCreateArgs, "data"> = {}
) {
  let userValidation: SafeParseReturnType<
    User,
    CredentialsUserSchema | GoogleUserSchema
  >;

  switch (user?.provider) {
    case "credentials":
      userValidation = await credentialsUserSchema.safeParseAsync(user);
      break;
    case "google":
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
