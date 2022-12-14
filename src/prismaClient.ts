import { PrismaClient } from "@prisma/client";

declare module globalThis {
  var prismaClient: PrismaClient | undefined;
}

export const prismaClient = globalThis.prismaClient ?? new PrismaClient();

globalThis.prismaClient = globalThis.prismaClient ?? prismaClient;

export const p = prismaClient;
