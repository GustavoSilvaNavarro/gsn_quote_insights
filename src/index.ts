import { onExit } from 'signal-exit';
import { NAME } from '@config';
import { logger } from '@adapters';
import { startServer } from '@server';

// Handle process errors
process.on('uncaughtException', (err) => {
  logger.error(err, 'uncaughtException');
  throw err;
});
process.on('unhandledRejection', (err) => logger.error(err, 'unhandledRejection'));

(async () => {
  await startServer();

  logger.info(`${NAME} Service started and running`);

  onExit(() => {
    logger.error(`${NAME} Service is shutting down, closing connections...`);
  });
})();
