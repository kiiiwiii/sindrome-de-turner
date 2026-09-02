'use strict';

/**
 * Aplicación principal - QR Landing Page con Línea de Tiempo
 */
const App = (() => {
  // Caché de elementos del DOM
  const elements = {};

  function cacheElements() {
    elements.siteTitle = document.getElementById('site-title');
    elements.siteDescription = document.getElementById('site-description');
    elements.linksContainer = document.getElementById('links-container');
    elements.errorState = document.getElementById('error-state');
    elements.retryButton = document.getElementById('retry-button');
  }

  function createLinkCard(link, index) {
    const a = document.createElement('a');
    a.href = link.url;
    a.className = 'link-card';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', `Ir a ${link.title}${link.year ? ' (' + link.year + ')' : ''}`);
    
    // Año para la línea de tiempo
    const yearHtml = link.year 
      ? `<span class="link-year-tag"><svg class="clock-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>${escapeHtml(link.year)}</span>`
      : '';

    // Contenedor con ícono, año, título y flecha
    a.innerHTML = `
      <span class="timeline-indicator" aria-hidden="true">
        <span class="timeline-dot"></span>
      </span>
      <span class="link-card-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      </span>
      <span class="link-card-content">
        ${yearHtml ? `<div class="link-card-meta">${yearHtml}</div>` : ''}
        <span class="link-card-title">${escapeHtml(link.title)}</span>
      </span>
      <span class="link-card-arrow" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/>
          <path d="M12 5l7 7-7 7"/>
        </svg>
      </span>
    `;
    return a;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function showLinks(links) {
    elements.linksContainer.innerHTML = '';
    links.forEach((link, index) => {
      elements.linksContainer.appendChild(createLinkCard(link, index));
    });
  }

  function showError() {
    elements.linksContainer.hidden = true;
    elements.errorState.hidden = false;
  }

  function showLoading() {
    elements.errorState.hidden = true;
    elements.linksContainer.hidden = false;
    elements.linksContainer.innerHTML = `
      <div class="skeleton-card" aria-hidden="true"></div>
      <div class="skeleton-card" aria-hidden="true"></div>
      <div class="skeleton-card" aria-hidden="true"></div>
    `;
  }

  async function loadData() {
    showLoading();
    try {
      const response = await ApiClient.getLinks();
      if (response.success && response.data) {
        elements.siteTitle.textContent = response.data.site?.title || 'Síndrome de Turner';
        elements.siteDescription.textContent = response.data.site?.description || 'Artículos y recursos académicos';
        document.title = response.data.site?.title || 'Síndrome de Turner';
        showLinks(response.data.links);
      } else {
        showError();
      }
    } catch (error) {
      console.error('Error cargando enlaces:', error.message);
      showError();
    }
  }

  function init() {
    cacheElements();
    if (elements.retryButton) {
      elements.retryButton.addEventListener('click', loadData);
    }
    loadData();
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { reload: loadData };
})();
