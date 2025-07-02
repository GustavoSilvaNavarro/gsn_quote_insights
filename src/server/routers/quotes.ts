import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const quoteRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/new/quote', (req: FastifyRequest, reply: FastifyReply) => {
    const payload = req.body;
    console.log(payload);

    reply.status(201);
    return { msg: 'Success' };
  });
};

export default quoteRoutes;
