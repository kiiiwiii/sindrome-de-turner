'use strict';

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  SITE_TITLE: process.env.SITE_TITLE || 'Mi Página',
  SITE_DESCRIPTION: process.env.SITE_DESCRIPTION || 'Selecciona una opción'
};
