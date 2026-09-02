'use strict';

require('dotenv').config();
const app = require('./src/app');
const env = require('./src/config/env');
const logger = require('./src/utils/logger');

const server = app.listen(env.PORT, () => {
  logger.info(`Servidor iniciado en puerto ${env.PORT} en modo ${env.NODE_ENV}`);
});

// Manejo de cierre seguro
const gracefulShutdown = () => {
  logger.info('Recibida señal de cierre, apagando servidor...');
  server.close(() => {
    logger.info('Servidor HTTP cerrado');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
