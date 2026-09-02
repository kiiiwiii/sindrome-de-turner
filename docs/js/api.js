'use strict';

/**
 * Cliente API con soporte para Backend Express y Servidores Estáticos (GitHub Pages)
 */
const ApiClient = (() => {
  const TIMEOUT_MS = 5000;

  // Respaldo estático pre-cargado para asegurar funcionamiento 100% garantizado en GitHub Pages
  const STATIC_FALLBACK = {
    success: true,
    data: {
      site: {
        title: "Síndrome de Turner",
        description: "Línea de tiempo de artículos y recursos académicos"
      },
      links: [
        {
          id: 1,
          title: "Cognitive Profile of Turner Syndrome (PMC)",
          year: "2009",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3114458/",
          icon: "brain",
          active: true
        },
        {
          id: 2,
          title: "Hearing Loss in Turner Syndrome (PMC Review)",
          year: "2014",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9535484/",
          icon: "article",
          active: true
        },
        {
          id: 3,
          title: "Cohorte Pediátrica de Síndrome de Turner - SciELO Chile",
          year: "2023",
          url: "https://www.scielo.cl/scielo.php?script=sci_arttext&pid=S2452-60532023000500606&lng=es&nrm=iso",
          icon: "journal",
          active: true
        },
        {
          id: 4,
          title: "Genetics & Clinical Management of Turner Syndrome",
          year: "2023",
          url: "https://pm.amegroups.org/article/view/7267/html",
          icon: "research",
          active: true
        },
        {
          id: 5,
          title: "Mecanismos Moleculares en Embriones 45,X0 - SciELO México",
          year: "2024",
          url: "https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S0187-53372024000100026",
          icon: "journal",
          active: true
        },
        {
          id: 6,
          title: "Turner Syndrome - StatPearls (NCBI Bookshelf)",
          year: "2024",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK554621/",
          icon: "book",
          active: true
        }
      ]
    }
  };

  async function fetchWithTimeout(url, timeoutMs = TIMEOUT_MS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  }

  return {
    getLinks: async () => {
      // 1. Intentar API del backend si está corriendo
      try {
        const res = await fetchWithTimeout('/api/links', 3000);
        if (res && res.success) return res;
      } catch (_) {
        // En entorno estático (como GitHub Pages), /api/links dará 404
      }

      // 2. Intentar archivo JSON estático relativo
      try {
        const res = await fetchWithTimeout('./data/links.json', 3000);
        if (res && res.success) return res;
      } catch (_) {}

      // 3. Fallback inmediato garantizado
      return STATIC_FALLBACK;
    },
    healthCheck: () => fetchWithTimeout('/api/health')
  };
})();
