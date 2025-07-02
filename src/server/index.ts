import Fastify, { type FastifyBaseLogger } from 'fastify';
import { PORT } from '@config';
import registerRoutes from './routers';
import { logger } from '@adapters';
import helmet from '@fastify/helmet';
import { prismaPlugin } from '@plugins';

const fastify = Fastify({
  loggerInstance: logger as FastifyBaseLogger,
  disableRequestLogging: true,
});

export const startServer = async () => {
  try {
    // Register plugins
    fastify.register(prismaPlugin);
    fastify.register(helmet);

    // Register all routes
    await registerRoutes(fastify);

    await fastify.listen({ port: PORT });
    fastify.log.info(`🚀 Quote Insight API is running, listening on ${PORT}`);
  } catch (err) {
    fastify.log.error('Error starting fastify server', err);
    process.exit(1);
  }
}
