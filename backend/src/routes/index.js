'use strict';

const express = require('express');
const router = express.Router();
const linkRoutes = require('./linkRoutes');

// Endpoint de estado
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Montar rutas de enlaces
router.use('/links', linkRoutes);

module.exports = router;
