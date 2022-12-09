import { PrismaClient } from "@prisma/client";

export const prismaClient =
  (globalThis as any).prismaClient ?? new PrismaClient();

(globalThis as any).prismaClient =
  (globalThis as any).prismaClient ?? prismaClient;

export const p = prismaClient;
