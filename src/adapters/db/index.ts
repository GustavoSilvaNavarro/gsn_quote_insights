import { PrismaClient } from '@prisma/client';

import logger from '../logger';

export const prisma = new PrismaClient();

export const connectDb = async () => {
  await prisma.$connect();
  logger.info('🔥 Database connection has been setup');
};

export const closeDbConnection = async () => {
  await prisma.$disconnect();
};
