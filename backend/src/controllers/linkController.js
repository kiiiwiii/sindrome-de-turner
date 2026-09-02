'use strict';

const linkService = require('../services/linkService');
const env = require('../config/env');

/**
 * Controlador para obtener enlaces
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @param {Function} next - Función Next de Express
 */
const getLinks = (req, res, next) => {
  try {
    const links = linkService.getAllLinks();
    
    res.json({
      success: true,
      data: {
        links,
        site: {
          title: env.SITE_TITLE,
          description: env.SITE_DESCRIPTION
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLinks };
