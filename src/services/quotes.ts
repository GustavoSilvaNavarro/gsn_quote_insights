import type { NewQuote } from '@interfaces';
import type { PrismaClient } from '@prisma/client';

export const addNewQuote = async (db: PrismaClient, payload: NewQuote) => {
  return await db.quotes.create({ data: payload });
};

export const getListOfQuotes = async (db: PrismaClient) => {
  return await db.quotes.findMany({});
};

export const getSingleQuote = async (db: PrismaClient, quoteId: number) => {
  return await db.quotes.findUniqueOrThrow({ where: { id: quoteId } });
};

export const updateQuote = async (db: PrismaClient, payload: NewQuote, quoteId: number) => {
  return await db.quotes.update({ where: { id: quoteId }, data: payload });
};

export const deleteQuote = async (db: PrismaClient, quoteId: number) => {
  const deletedQuote = await db.quotes.delete({ where: { id: quoteId } });
  return deletedQuote.id;
};
