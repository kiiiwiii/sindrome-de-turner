'use strict';

const helmet = require('helmet');
const cors = require('cors');
const env = require('../config/env');

/**
 * Configura y retorna los middleware de seguridad
 * @returns {Array} Array de funciones middleware
 */
const setupSecurity = () => {
  const allowedOrigins = env.CORS_ORIGIN.split(',').map(o => o.trim());

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };

  return [
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", ...allowedOrigins]
        }
      }
    }),
    cors(corsOptions)
  ];
};

module.exports = setupSecurity;
