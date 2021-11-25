import config from './config';
import startServer from './server';
import logger from './utils/logger';

async function main() {
  try {
    const server = await startServer();
    server.listen(config.port);
    logger.info(`Running on port ${config.port}`);
  } catch (error: any) {
    logger.error(JSON.stringify(error));
    console.error(error.stack || error);
    console.trace(JSON.stringify(error));
    process.exit(1);
  }
}

process.on('unhandledRejection', (err) => {
  if (err) {
    logger.error(err);
  }
  process.exit(1);
});

void main();
