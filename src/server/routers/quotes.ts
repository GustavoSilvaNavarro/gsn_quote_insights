import { type NewQuote, newQuotePayload, type QuoteIdParam, quoteIdParam } from '@interfaces';
import { addNewQuote, deleteQuote, getListOfQuotes, getSingleQuote, updateQuote } from '@services';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const quoteRoutes = (fastify: FastifyInstance) => {
  fastify.get(
    '/quote/:quoteId',
    { schema: { params: quoteIdParam } },
    async (req: FastifyRequest<{ Params: QuoteIdParam }>, reply: FastifyReply) => {
      const { quoteId } = req.params;
      const quote = await getSingleQuote(fastify.prisma, quoteId);

      reply.status(200);
      return quote;
    },
  );

  fastify.get('/quotes', async (req: FastifyRequest, reply: FastifyReply) => {
    const quotes = await getListOfQuotes(fastify.prisma);

    reply.status(200);
    return quotes;
  });

  fastify.post(
    '/new/quote',
    { schema: { body: newQuotePayload } },
    async (req: FastifyRequest<{ Body: NewQuote }>, reply: FastifyReply) => {
      const payload = req.body;
      const newQuote = await addNewQuote(fastify.prisma, payload);

      reply.status(201);
      return newQuote;
    },
  );

  fastify.put(
    '/quote/:quoteId',
    { schema: { params: quoteIdParam, body: newQuotePayload } },
    async (req: FastifyRequest<{ Params: QuoteIdParam; Body: NewQuote }>, reply: FastifyReply) => {
      const updatedQuote = await updateQuote(fastify.prisma, req.body, req.params.quoteId);

      reply.status(200);
      return updatedQuote;
    },
  );

  fastify.delete(
    '/quote/:quoteId',
    { schema: { params: quoteIdParam } },
    async (req: FastifyRequest<{ Params: QuoteIdParam }>, reply: FastifyReply) => {
      const deletedQuoteId = await deleteQuote(fastify.prisma, req.params.quoteId);

      reply.status(200);
      return { msg: `Quote with ID: ${deletedQuoteId}, has been successfully removed` };
    },
  );
};

export default quoteRoutes;
