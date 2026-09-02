'use strict';

const logger = require('../utils/logger');
const path = require('path');

/**
 * Manejador para rutas no encontradas (404)
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @param {Function} next - Función Next de Express
 */
const notFoundHandler = (req, res, next) => {
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, '../../../frontend/pages/404.html'));
  } else {
    res.status(404).json({
      success: false,
      error: { message: 'Ruta no encontrada', code: 404 }
    });
  }
};

/**
 * Manejador global de errores
 * @param {Error} err - Objeto Error
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @param {Function} next - Función Next de Express
 */
const errorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message);

  const statusCode = err.status || 500;
  const message = statusCode === 500 ? 'Error interno del servidor' : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: statusCode
    }
  });
};

module.exports = { notFoundHandler, errorHandler };
