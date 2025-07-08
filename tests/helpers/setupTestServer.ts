import { logger } from '@adapters';
import { customHeadersPlugin } from '@middlewares';
import registerRoutes from '@server/routers';
import Fastify, { type FastifyBaseLogger } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';

export const testServerSetup = async () => {
  const fastify = Fastify({
    loggerInstance: logger as FastifyBaseLogger,
    disableRequestLogging: true,
  }).withTypeProvider<ZodTypeProvider>();

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  // Register plugins
  fastify.register(customHeadersPlugin);

  await registerRoutes(fastify);

  return fastify;
};
