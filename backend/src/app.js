'use strict';

const express = require('express');
const path = require('path');
const setupSecurity = require('./middleware/security');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

// Middlewares de seguridad
app.use(setupSecurity());

// Parseo del cuerpo de la petición JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Montar API routes
app.use('/api', routes);

// Manejadores de errores y 404
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
