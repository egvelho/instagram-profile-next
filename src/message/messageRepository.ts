import type { Prisma, Message } from "@prisma/client";
export type { Message } from "@prisma/client";
import { p } from "src/prismaClient";
import { createMessageSchema } from "./schemas/createMessageSchema";

export function findById(
  id: number,
  args: Omit<Prisma.MessageFindFirstArgs, "where"> = {}
) {
  return p.message.findFirst({
    ...args,
    where: {
      id,
    },
  });
}

export function findByReceiverId(
  receiverId: number,
  args: Omit<Prisma.MessageFindFirstArgs, "where"> = {}
) {
  return p.message.findFirst({
    ...args,
    where: {
      receiverId,
    },
  });
}

export function findMany(args: Prisma.MessageFindManyArgs = {}) {
  return p.message.findMany({
    ...args,
  });
}

export async function create(
  message?: Partial<Message>,
  args: Omit<Prisma.MessageCreateArgs, "data"> = {}
) {
  const messageValidation = await createMessageSchema.safeParseAsync(message);
  if (messageValidation.success) {
    const { id } = await p.message.create({
      data: messageValidation.data,
      select: {
        id: true,
      },
    });

    return {
      success: true as true,
    };
  }

  return {
    success: false as false,
    errors: messageValidation.error.errors,
  };
}
