const mongoose = require('mongoose');
const app = require('./app');
const config = require('./src/config/config');
const logger = require('./src/config/logger');

let server;
// mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
//   logger.info('Connected to MongoDB');
//   server = app.listen(config.port, () => {
//     logger.info({ apiModule: "server", apiHandler: "server.js" },`Listening to port ${config.port}`);
//   });
// });

server = app.listen(config.port, () => {
  logger.info({ apiModule: "server", apiHandler: "server.js" }, `Listening to port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info({ apiModule: "server", apiHandler: "server.js" }, 'Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error({ apiModule: "server", apiHandler: "server.js" }, error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info({ apiModule: "server", apiHandler: "server.js" }, 'SIGTERM received');
  if (server) {
    server.close();
  }
});