import { prisma } from '@adapters/db';
import type { NewQuote } from '@interfaces';

export const addNewQuote = async (payload: NewQuote) => {
  return await prisma.quotes.create({ data: payload });
};

export const getListOfQuotes = async () => {
  return await prisma.quotes.findMany({});
};

export const getSingleQuote = async (quoteId: number) => {
  return await prisma.quotes.findUniqueOrThrow({ where: { id: quoteId } });
};

export const updateQuote = async (payload: NewQuote, quoteId: number) => {
  return await prisma.quotes.update({ where: { id: quoteId }, data: payload });
};

export const deleteQuote = async (quoteId: number) => {
  const deletedQuote = await prisma.quotes.delete({ where: { id: quoteId } });
  return deletedQuote.id;
};
