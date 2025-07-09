import { logger } from '@adapters';
// import { closeDbConnection, connectDb } from '@adapters/db';
import { NAME } from '@config';
import { startServer } from '@server';
import { onExit } from 'signal-exit';

// Handle process errors
process.on('uncaughtException', (err) => {
  logger.error(err, 'uncaughtException');
  throw err;
});
process.on('unhandledRejection', (err) => logger.error(err, 'unhandledRejection'));

void (async () => {
  // await connectDb();
  await startServer();

  logger.info(`${NAME} Service started and running`);

  onExit(() => {
    logger.error(`${NAME} Service is shutting down, closing connections...`);
    // closeDbConnection()
    //   .then(() => process.exit(1))
    //   .catch(() => logger.error('DB connection closed'));
  });
})();
