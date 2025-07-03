import { URL_PREFIX } from '@config';
import type { FastifyInstance } from 'fastify';

import monitoringRoutes from './monitoring';
import quoteRoutes from './quotes';

const registerRoutes = async (fastify: FastifyInstance) => {
  // Register all routes with /api prefix
  await fastify.register(monitoringRoutes);
  await fastify.register(quoteRoutes, { prefix: `/${URL_PREFIX}` });
};

export default registerRoutes;
