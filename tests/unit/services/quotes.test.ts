import type { PrismaClient } from '@prisma/client';

const mockCreate = jest.fn();
const mockFindMany = jest.fn();

const mockPrismaClient = {
  quotes: {
    create: mockCreate,
    findMany: mockFindMany,
  },
} as unknown as PrismaClient;

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrismaClient),
}));

import { addNewQuote, getListOfQuotes } from '@services/quotes';

describe('Quotes service tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addNewQuote', () => {
    test('Should create a new quote record in the db.', async () => {
      const mockNewQuote = { quote: 'Quote for testing' };
      const now = new Date();
      const expectedNewQuote = { id: 1, ...mockNewQuote, created_at: now, updated_at: now };
      mockCreate.mockResolvedValueOnce(expectedNewQuote);

      const newQuote = await addNewQuote(mockPrismaClient, mockNewQuote);

      expect(newQuote).toEqual(expectedNewQuote);
    });
  });

  describe('getListOfQuotes', () => {
    test('Should list all the quotes in the db', async () => {
      const mockNewQuote = { quote: 'Quote for testing' };
      const now = new Date();
      const expectedNewQuote = { id: 1, ...mockNewQuote, created_at: now, updated_at: now };
      mockFindMany.mockResolvedValueOnce([expectedNewQuote]);

      const listOfQuotes = await getListOfQuotes(mockPrismaClient);

      expect(listOfQuotes).toHaveLength(1);
      expect(listOfQuotes).toEqual([expectedNewQuote]);
    });
  });
});
