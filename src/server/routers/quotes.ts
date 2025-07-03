import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { newQuotePayload, type NewQuote } from '@interfaces';
import { addNewQuote } from '@services';

const quoteRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/new/quote', { schema: { body: newQuotePayload } }, async (req: FastifyRequest<{ Body: NewQuote }>, reply: FastifyReply) => {
    const payload = req.body;
    const newQuote = await addNewQuote(fastify.prisma, payload);

    reply.status(201);
    return newQuote;
  });
};

export default quoteRoutes;
