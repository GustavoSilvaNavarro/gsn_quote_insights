import { type FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import logger from '@adapters/logger';

export const prismaPlugin = fp(async (fastify: FastifyInstance, _opts: unknown) => {
  try {
    const prisma = new PrismaClient();

    await prisma.$connect();


    fastify.decorate('prisma', prisma);
    fastify.log.info('🔥 Prisma - Connection to db has been established successfully.');

    fastify.addHook('onClose', async (instance) => {
      fastify.log.error('Disconnecting Prisma client...');
      await instance.prisma.$disconnect();
      fastify.log.error('Prisma Client is disconnected');
    });
  } catch (err) {
    logger.error(err, 'Connection to DB has failed 😭');
    throw err;
  }
});
