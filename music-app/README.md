# 🎵 MusicApp - Tu Plataforma Musical Completa

<div align="center">

![MusicApp Logo](https://via.placeholder.com/150x150/1DB954/000000?text=🎵)

**Una aplicación de música moderna con todas las funcionalidades que necesitas**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.5.0-47A248?logo=mongodb)](https://mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6?logo=typescript)](https://typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-0.72-61DAFB?logo=react)](https://reactnative.dev/)

[Características](#-características) • [Instalación](#-instalación) • [Uso](#-uso) • [Estructura](#-estructura-del-proyecto) • [API](#-documentación-de-la-api) • [Despliegue](#-despliegue)

</div>

## ✨ Características

### 🎵 **Reproducción de Música**
- ✅ Reproducción en tiempo real
- ✅ Control de volumen y progreso
- ✅ Modos Repeat y Shuffle
- ✅ Cola de reproducción inteligente
- ✅ Mini-player flotante
- ✅ Sincronización entre dispositivos

### 📚 **Biblioteca Musical**
- 🎼 Gestión de canciones, álbumes y artistas
- 🏷️ Organización por géneros y etiquetas
- 📱 Soporte para música local
- 🔍 Búsqueda avanzada en tiempo real
- ⭐ Sistema de favoritos

### 👥 **Funciones Sociales**
- 👤 Perfiles de usuario personalizables
- 📊 Estadísticas de escucha
- 🤝 Seguir a otros usuarios
- 💬 Chat integrado
- 📤 Compartir playlists

### 🎨 **Personalización**
- 🎨 Temas claro/oscuro
- 🖼️ Fondos personalizables
- ⚙️ Ecualizador integrado
- 🎚️ Controles de audio avanzados
- 📲 Widgets para móvil

### 🌐 **Funciones Avanzadas**
- 📶 Modo offline
- 🎤 Panel para artistas
- 🤖 Recomendaciones con IA
- 🎮 Sesiones grupales
- 🔐 Seguridad robusta

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- MongoDB 5.0+
- Redis (opcional para cache)
- Git

### 📥 Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/music-app.git
cd music-app

# Instalar dependencias
npm run install:all

# Configurar variables de entorno
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Iniciar en desarrollo
npm run dev
```

### 🔧 Instalación Detallada

#### Backend
```bash
cd backend
npm install

# Configurar .env
echo "MONGODB_URI=mongodb://localhost:27017/musicapp" >> .env
echo "JWT_SECRET=tu_jwt_secret_super_seguro" >> .env
echo "PORT=5000" >> .env

# Iniciar servidor
npm run dev
```

#### Frontend Web
```bash
cd frontend
npm install

# Configurar .env
echo "VITE_API_URL=http://localhost:5000/api" >> .env

# Iniciar aplicación
npm run dev
```

#### Mobile (React Native)
```bash
cd mobile
npm install

# iOS
npx pod-install
npm run ios

# Android
npm run android
```

## 🎯 Uso

### Primeros Pasos

1. **Registro**: Crea una nueva cuenta o inicia sesión
2. **Explorar**: Navega por la biblioteca musical
3. **Reproducir**: Haz clic en cualquier canción para empezar
4. **Crear**: Genera tus propias playlists
5. **Compartir**: Comparte tu música con amigos

### 📱 Características Principales

| Función | Descripción | Comando |
|---------|-------------|---------|
| Reproducción | Control completo de música | Click en canción |
| Búsqueda | Encuentra música rápidamente | Ctrl+K / Cmd+K |
| Playlists | Crea y gestiona listas | Botón "Nueva Playlist" |
| Social | Sigue amigos y artistas | Perfil → Seguir |
| Descargas | Contenido offline | Botón descargar |

### ⌨️ Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Space` | Play/Pausa |
| `→` | Siguiente canción |
| `←` | Canción anterior |
| `↑` | Subir volumen |
| `↓` | Bajar volumen |
| `M` | Silenciar |
| `L` | Like/Dislike |

## 🏗️ Estructura del Proyecto

```
music-app/
├── 📁 backend/                 # API Server (Node.js + Express)
│   ├── src/
│   │   ├── controllers/        # Lógica de negocio
│   │   ├── models/            # Modelos de base de datos
│   │   ├── routes/            # Rutas de la API
│   │   ├── middleware/        # Middlewares personalizados
│   │   └── utils/             # Utilidades
│   ├── package.json
│   └── dockerfile
├── 📁 frontend/               # Web App (React + Vite)
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API clients
│   │   ├── stores/            # State management
│   │   └── styles/            # Estilos CSS
│   ├── package.json
│   └── vite.config.ts
├── 📁 mobile/                 # Mobile App (React Native)
│   ├── src/
│   │   ├── screens/           # Pantallas de la app
│   │   ├── components/        # Componentes reutilizables
│   │   ├── navigation/        # Configuración de navegación
│   │   └── services/          # Lógica de negocio móvil
│   └── package.json
└── 📁 docs/                   # Documentación
    ├── api/                   # Documentación de la API
    └── deployment/            # Guías de despliegue
```

## 🔌 Documentación de la API

### Endpoints Principales

#### Autenticación
```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

#### Canciones
```http
GET  /api/songs           # Listar canciones
GET  /api/songs/:id       # Obtener canción
POST /api/songs           # Subir canción (artistas)
GET  /api/songs/search    # Buscar canciones
```

#### Playlists
```http
GET    /api/playlists              # Listar playlists
POST   /api/playlists              # Crear playlist
PUT    /api/playlists/:id          # Actualizar playlist
DELETE /api/playlists/:id          # Eliminar playlist
POST   /api/playlists/:id/songs    # Agregar canción
```

#### Usuarios
```http
GET    /api/users/:id              # Perfil de usuario
PUT    /api/users/:id              # Actualizar perfil
POST   /api/users/:id/follow       # Seguir usuario
DELETE /api/users/:id/follow       # Dejar de seguir
```

### Ejemplos de Uso

#### Obtener canciones populares
```javascript
const response = await fetch('/api/songs?sortBy=statistics.plays&limit=10');
const data = await response.json();
```

#### Crear una playlist
```javascript
const playlist = await fetch('/api/playlists', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Mi Playlist',
    description: 'Descripción de la playlist',
    isPublic: true
  })
});
```

## 🚀 Despliegue

### Opción 1: Docker (Recomendado)

```bash
# Usar docker-compose
docker-compose up -d

# O construir manualmente
docker build -t music-app-backend ./backend
docker run -p 5000:5000 music-app-backend
```

### Opción 2: Despliegue Manual

#### Producción Backend
```bash
cd backend
npm run build
npm start
```

#### Producción Frontend
```bash
cd frontend
npm run build
npm run preview
```

### 🌐 Variables de Entorno de Producción

```env
# Backend
NODE_ENV=production
MONGODB_URI=mongodb://usuario:password@host:27017/musicapp
JWT_SECRET=secret_muy_largo_y_seguro
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY=tu_access_key
AWS_SECRET_KEY=tu_secret_key

# Frontend
VITE_API_URL=https://tudominio.com/api
VITE_APP_NAME=MusicApp
```

### 📊 Monitoreo y Logs

```bash
# Ver logs en tiempo real
docker-compose logs -f backend

# Métricas de performance
npm run metrics

# Health check
curl https://tudominio.com/api/health
```

## 🤝 Contribución

¡Nos encantan las contribuciones! Por favor lee nuestras guías:

1. **Fork** el proyecto
2. **Crea una rama** (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### 📋 Guía de Desarrollo

```bash
# Configurar entorno de desarrollo
git clone https://github.com/tuusuario/music-app.git
cd music-app
npm run setup:dev

# Ejecutar tests
npm test

# Formatear código
npm run format

# Verificar tipos TypeScript
npm run type-check
```

## 🐛 Solución de Problemas

### Problemas Comunes

**Error: Cannot connect to MongoDB**
```bash
# Verificar que MongoDB esté ejecutándose
sudo systemctl status mongod
# o
brew services list | grep mongo
```

**Error: Puerto en uso**
```bash
# Encontrar proceso usando el puerto
lsof -i :5000
# Matar proceso
kill -9 <PID>
```

**Error: Module not found**
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### 🔍 Debugging

```bash
# Modo debug backend
DEBUG=music-app:* npm run dev

# Logs detallados
NODE_ENV=development LOG_LEVEL=debug npm start
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- [React](https://reactjs.org/) - Biblioteca para interfaces de usuario
- [Node.js](https://nodejs.org/) - Entorno de ejecución JavaScript
- [MongoDB](https://mongodb.com/) - Base de datos NoSQL
- [React Native](https://reactnative.dev/) - Framework para apps móviles
- [Vite](https://vitejs.dev/) - Herramienta de build frontend

## 📞 Soporte

- 📧 **Email**: soporte@musicapp.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/tuusuario/music-app/issues)
- 💬 **Discord**: [Únete a nuestra comunidad](https://discord.gg/musicapp)
- 📚 **Documentación**: [docs.musicapp.com](https://docs.musicapp.com)

---

<div align="center">

**¿Te gusta el proyecto? ¡Dale una ⭐ en GitHub!**

[![Star History Chart](https://api.star-history.com/svg?repos=tuusuario/music-app&type=Date)](https://star-history.com/#tuusuario/music-app&Date)

*Hecho con ❤️ para la comunidad musical*

</div>
