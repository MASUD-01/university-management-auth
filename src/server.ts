/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorlogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('database connected succesfully');
    server = app.listen(config.port, () => {
      logger.info(`application app listening on port ${config.port}`);
    });
  } catch (error) {
    errorlogger.error('failed to connect---', error);
  }

  process.on('unhandleRejection', error => {
    console.log('unhanlde reJECION IS DETCTED--WE ARE CLOSING OUR SERVER');
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();
process.on('SIGTERM', () => {
  logger.info('sigterm is detected');
  if (server) {
    server.close();
  }
});
