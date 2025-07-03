import { type NewQuote } from '@interfaces';
import { type PrismaClient } from '@prisma/client';

export const addNewQuote = async (db: PrismaClient, payload: NewQuote) => {
  return await db.quotes.create({ data: payload });
};
