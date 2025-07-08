import { logger } from '@adapters';
import { PORT } from '@config';
import helmet from '@fastify/helmet';
import { customHeadersPlugin } from '@middlewares';
import { prismaPlugin } from '@plugins';
import Fastify, { type FastifyBaseLogger } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';

import registerRoutes from './routers';

const fastify = Fastify({
  loggerInstance: logger as FastifyBaseLogger,
  disableRequestLogging: true,
}).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

export const serverSetup = async () => {
  // Register plugins
  fastify.register(prismaPlugin);

  fastify.register(helmet);
  fastify.register(customHeadersPlugin);

  // Register all routes
  await registerRoutes(fastify);

  return fastify;
};

export const startServer = async () => {
  try {
    const fastify = await serverSetup();

    await fastify.listen({ port: PORT });
    fastify.log.info(`🚀 Quote Insight API is running, listening on ${PORT}`);
  } catch (err) {
    fastify.log.error('Error starting fastify server', err);
    process.exit(1);
  }
};
