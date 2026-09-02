'use strict';

/**
 * Valida si una cadena es una URL HTTP/HTTPS válida
 * @param {string} url - URL a validar
 * @returns {boolean} True si es válida
 */
const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (err) {
    return false;
  }
};

/**
 * Limpia texto básico para prevenir XSS
 * @param {string} text - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
const sanitizeText = (text) => {
  if (!text) return '';
  return text.replace(/<[^>]*>?/gm, '');
};

/**
 * Valida un objeto de enlace completo
 * @param {Object} link - Objeto de enlace
 * @returns {Object} Objeto con resultado de validación
 */
const validateLink = (link) => {
  if (!link.title || link.title.trim().length === 0) {
    return { valid: false, error: 'El título es requerido' };
  }
  if (!link.url || !isValidUrl(link.url)) {
    return { valid: false, error: 'URL inválida o requerida (solo http/https)' };
  }
  return { valid: true };
};

module.exports = { isValidUrl, sanitizeText, validateLink };
