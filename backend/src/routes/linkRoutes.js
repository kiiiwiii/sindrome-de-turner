'use strict';

const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

// GET /api/links - Obtiene todos los enlaces
router.get('/', linkController.getLinks);

// Rutas futuras para administración de enlaces
// router.post('/', linkController.createLink);
// router.put('/:id', linkController.updateLink);
// router.delete('/:id', linkController.deleteLink);

module.exports = router;
