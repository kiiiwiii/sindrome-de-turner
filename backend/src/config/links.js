'use strict';

/**
 * Lee la configuración de enlaces desde las variables de entorno
 * @returns {Array} Array de objetos de enlaces
 */
const getLinks = () => {
  const links = [];
  
  // Soporta hasta 10 enlaces por ahora (podría leer de DB en el futuro)
  for (let i = 1; i <= 10; i++) {
    const title = process.env[`LINK_${i}_TITLE`];
    const url = process.env[`LINK_${i}_URL`];
    const icon = process.env[`LINK_${i}_ICON`];
    const year = process.env[`LINK_${i}_YEAR`];
    
    if (title && url) {
      links.push({
        id: i,
        title,
        url,
        year: year || '',
        icon: icon || 'link',
        active: true
      });
    }
  }
  
  return links;
};

module.exports = { getLinks };
