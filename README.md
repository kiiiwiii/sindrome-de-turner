# QR Landing Page

Página web liviana y profesional diseñada como destino para códigos QR. Muestra enlaces configurables como tarjetas interactivas, con diseño mobile-first y arquitectura preparada para escalar.

## 🚀 Tecnologías

| Capa | Tecnología | Razón |
|------|-----------|-------|
| **Frontend** | HTML5 + CSS3 + JS ES6+ | Máximo rendimiento, cero dependencias de framework |
| **Backend** | Node.js + Express | API REST liviana, madura y escalable |
| **Seguridad** | Helmet + CORS | Headers HTTP seguros y control de orígenes |
| **Config** | dotenv | Variables de entorno centralizadas |

> **Total dependencias de producción: 4** (express, helmet, cors, dotenv)

## 📁 Estructura del Proyecto

```
Pagina_Javi/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuración (env, enlaces)
│   │   ├── controllers/      # Controladores de rutas
│   │   ├── middleware/        # Seguridad y manejo de errores
│   │   ├── routes/           # Definición de rutas API
│   │   ├── services/         # Lógica de negocio
│   │   ├── validators/       # Validación de datos
│   │   ├── utils/            # Utilidades (logger)
│   │   └── app.js            # Configuración de Express
│   ├── .env                  # Variables de entorno (no versionado)
│   ├── .env.example          # Template de variables
│   ├── package.json
│   └── server.js             # Punto de entrada
├── frontend/
│   ├── public/
│   │   ├── css/styles.css    # Estilos principales
│   │   ├── js/
│   │   │   ├── api.js        # Cliente API
│   │   │   └── app.js        # Lógica principal
│   │   └── index.html        # Página principal
│   └── pages/
│       ├── 404.html          # Página no encontrada
│       └── error.html        # Error genérico
├── .gitignore
└── README.md                 # Este archivo
```

## ⚡ Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior

### Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd Pagina_Javi

# 2. Instalar dependencias del backend
cd backend
npm install

# 3. Configurar variables de entorno
cp .env.example .env
```

### Ejecución en Desarrollo

```bash
# Desde la carpeta backend/
npm run dev
```

Esto arranca el servidor en `http://localhost:3000` con recarga automática.

### Ejecución en Producción

```bash
# Desde la carpeta backend/
npm start
```

## 🔗 Configuración de Enlaces

Los 3 enlaces se configuran en el archivo `backend/.env`:

```env
# Enlace 1
LINK_1_TITLE=Google
LINK_1_URL=https://www.google.com
LINK_1_ICON=search

# Enlace 2
LINK_2_TITLE=GitHub
LINK_2_URL=https://www.github.com
LINK_2_ICON=code

# Enlace 3
LINK_3_TITLE=LinkedIn
LINK_3_URL=https://www.linkedin.com
LINK_3_ICON=briefcase
```

### Cómo modificar los enlaces

1. Abrir `backend/.env`
2. Cambiar los valores de `LINK_X_TITLE`, `LINK_X_URL` y `LINK_X_ICON`
3. Reiniciar el servidor

### Cómo agregar más enlaces (futuro)

La arquitectura soporta agregar más enlaces fácilmente:

1. En `backend/.env`, agregar nuevas variables:
   ```env
   LINK_4_TITLE=Nuevo Enlace
   LINK_4_URL=https://ejemplo.com
   LINK_4_ICON=link
   ```

2. En `backend/src/config/links.js`, agregar el nuevo enlace al array (seguir el patrón existente).

3. Reiniciar el servidor.

> **Nota**: En la segunda etapa, los enlaces se gestionarán desde un panel de administración y base de datos, eliminando la necesidad de editar archivos.

## 🔧 Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno (development/production) | `development` |
| `CORS_ORIGIN` | Orígenes permitidos (separados por coma) | `http://localhost:3000` |
| `SITE_TITLE` | Título de la página | `Mi Página` |
| `SITE_DESCRIPTION` | Descripción de la página | `Selecciona una opción` |
| `LINK_X_TITLE` | Título del enlace X | `Opción X` |
| `LINK_X_URL` | URL del enlace X | `https://example.com/X` |
| `LINK_X_ICON` | Icono del enlace X | `link` |

## 🌐 API REST

### Endpoints Disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/links` | Retorna los enlaces configurados |
| `GET` | `/api/health` | Health check del servidor |

### Ejemplo de Respuesta: `GET /api/links`

```json
{
  "success": true,
  "data": {
    "links": [
      {
        "id": 1,
        "title": "Opción 1",
        "url": "https://example.com/1",
        "icon": "link",
        "active": true
      }
    ],
    "site": {
      "title": "Mi Página",
      "description": "Selecciona una opción"
    }
  }
}
```

## 🏗️ Build de Producción

El frontend no requiere build (vanilla HTML/CSS/JS). Para producción:

```bash
# Configurar variables de entorno
cd backend
cp .env.example .env
# Editar .env con valores de producción:
#   NODE_ENV=production
#   PORT=80  (o el puerto deseado)
#   CORS_ORIGIN=https://tudominio.cl

# Iniciar
npm start
```

## 🚀 Despliegue

### Opción 1: VPS / Servidor tradicional

```bash
# En el servidor
git clone <repo>
cd Pagina_Javi/backend
npm install --production
cp .env.example .env
# Editar .env con configuración de producción
npm start
```

Para mantener el proceso activo, usar PM2:

```bash
npm install -g pm2
pm2 start server.js --name qr-landing
pm2 save
pm2 startup
```

### Opción 2: Docker (futuro)

La estructura del proyecto es compatible con Docker. En la segunda etapa se puede agregar un `Dockerfile` y `docker-compose.yml`.

### Opción 3: Plataformas PaaS

Compatible con Railway, Render, Fly.io, Heroku. Solo configurar las variables de entorno en la plataforma.

## 🔒 Seguridad

- ✅ Headers HTTP seguros (Helmet)
- ✅ CORS configurado
- ✅ Variables sensibles en `.env` (no versionado)
- ✅ Validación y sanitización de URLs
- ✅ No se exponen errores técnicos al usuario
- ✅ Enlaces con `rel="noopener noreferrer"`
- ✅ Escape de HTML para prevenir XSS

## 📋 Futuras Funcionalidades (Segunda Etapa)

La arquitectura está preparada para:

- [ ] Panel de administración
- [ ] Base de datos (SQLite → PostgreSQL)
- [ ] Generador/gestor de códigos QR
- [ ] Múltiples páginas con diferentes conjuntos de enlaces
- [ ] Estadísticas de accesos y clics
- [ ] Activar/desactivar enlaces
- [ ] Iconos y estilos personalizables
- [ ] Autenticación para administradores

## 📄 Licencia

Proyecto privado. Todos los derechos reservados.
