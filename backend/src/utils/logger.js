'use strict';

/**
 * Logger simple que envuelve la consola
 * Preparado para ser reemplazado por Winston o Pino en el futuro
 */
const formatMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
};

const logger = {
  info: (message) => console.log(formatMessage('info', message)),
  warn: (message) => console.warn(formatMessage('warn', message)),
  error: (message) => console.error(formatMessage('error', message)),
  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatMessage('debug', message));
    }
  }
};

module.exports = logger;
