// import { prisma } from '@adapters/db';
import type { NewQuote } from '@interfaces';
import type { PrismaClient } from '@prisma/client';

export const addNewQuote = async (prisma: PrismaClient, payload: NewQuote) => {
  return await prisma.quotes.create({ data: payload });
};

export const getListOfQuotes = async (prisma: PrismaClient) => {
  return await prisma.quotes.findMany({});
};

export const getSingleQuote = async (prisma: PrismaClient, quoteId: number) => {
  return await prisma.quotes.findUniqueOrThrow({ where: { id: quoteId } });
};

export const updateQuote = async (prisma: PrismaClient, payload: NewQuote, quoteId: number) => {
  return await prisma.quotes.update({ where: { id: quoteId }, data: payload });
};

export const deleteQuote = async (prisma: PrismaClient, quoteId: number) => {
  const deletedQuote = await prisma.quotes.delete({ where: { id: quoteId } });
  return deletedQuote.id;
};
