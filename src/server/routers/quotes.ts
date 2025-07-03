import { type NewQuote, newQuotePayload } from '@interfaces';
import { addNewQuote } from '@services';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const quoteRoutes = (fastify: FastifyInstance) => {
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
};

export default quoteRoutes;
