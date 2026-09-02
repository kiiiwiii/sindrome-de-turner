'use strict';

const { getLinks } = require('../config/links');
const { validateLink, sanitizeText } = require('../validators/linkValidator');

/**
 * Obtiene todos los enlaces validados y sanitizados
 * @returns {Array} Enlaces listos para usar
 */
const getAllLinks = () => {
  const rawLinks = getLinks();
  
  return rawLinks
    .filter(link => {
      const validation = validateLink(link);
      return validation.valid;
    })
    .map(link => ({
      id: link.id,
      title: sanitizeText(link.title),
      url: link.url,
      year: sanitizeText(link.year || ''),
      icon: sanitizeText(link.icon),
      active: link.active
    }));
};

/**
 * Obtiene un enlace específico por ID
 * @param {number|string} id - ID del enlace
 * @returns {Object|null} Enlace o null si no se encuentra
 */
const getLinkById = (id) => {
  const links = getAllLinks();
  const linkId = parseInt(id, 10);
  return links.find(l => l.id === linkId) || null;
};

module.exports = { getAllLinks, getLinkById };
