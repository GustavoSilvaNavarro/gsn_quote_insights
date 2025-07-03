import { type PrismaClient } from '@prisma/client';
import { type NewQuote } from '@interfaces';

export const addNewQuote = async (db: PrismaClient, payload: NewQuote) => {
  return await db.quotes.create({ data: payload });
};
