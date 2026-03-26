# 💬 Mini Chat - React + TypeScript + Tailwind + Socket.io

Proyecto fullstack moderno con comunicación en tiempo real.

## ✨ Características

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express + Socket.io + TypeScript
- **Herramientas**: Vite + Hot Module Reload
- **Estilos**: Tailwind CSS responsivo
- **Comunicación**: Socket.io bidireccional

## 📋 Requisitos previos

- Node.js 16+
- npm o yarn

## 🚀 Instalación y ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en desarrollo

Abre **dos terminales**:

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
npm run dev:client
```

O ejecuta ambos en una sola terminal:
```bash
npm run dev
```

El proyecto estará disponible en:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080

## 📦 Build para producción

```bash
npm run build
```

## 🗂️ Estructura del proyecto

```
.
├── src/                          # Código del frontend
│   ├── components/
│   │   └── Chat.tsx             # Componente principal del chat
│   ├── App.tsx                  # Componente raíz
│   ├── main.tsx                 # Entry point de React
│   └── index.css                # Estilos Tailwind
├── models/                       # Código del backend
│   ├── server.ts                # Servidor Express
│   └── sockets.ts               # Manejador de Socket.io
├── index.ts                      # Entry point del backend
├── vite.config.ts               # Configuración de Vite
├── tailwind.config.ts           # Configuración de Tailwind
├── tsconfig.json                # Configuración de TypeScript
└── package.json                 # Dependencias
```

## 🔧 Configuración

### Variables de entorno (.env)

```env
PORT=8080
CORS_ORIGIN=http://localhost:5173
```

### Para producción (.env.production)

Actualiza con tus dominios reales:
```env
PORT=8080
CORS_ORIGIN=https://tu-dominio.com
```

## 📡 Eventos de Socket.io

### Cliente → Servidor

```typescript
socket.emit('mensaje-to-server', { texto: string })
```

### Servidor → Cliente

```typescript
socket.on('mensaje-from-server', (data: Message) => {
  // data.texto: contenido del mensaje
})
```

## 🛠️ Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Ejecuta ambos (backend + frontend) |
| `npm run dev:server` | Ejecuta solo el backend con hot reload |
| `npm run dev:client` | Ejecuta solo el frontend con Vite |
| `npm run build` | Build para producción |
| `npm run preview` | Preview del build |
| `npm start` | Ejecuta el servidor de producción |

## 📝 Notas importantes

- El backend debe estar corriendo en el puerto 8080
- El frontend (Vite) se ejecuta en el puerto 5173
- El proxy de Socket.io está configurado en `vite.config.ts`
- TypeScript en ambos frontend y backend
- Tailwind CSS pre-instalado y configurado

## 🚀 Deploy

Para deployar en producción (ej: Render, Vercel, etc.):

1. Configura las variables de entorno en tu plataforma
2. Ejecuta `npm run build`
3. Asegúrate de que el backend esté accesible desde el frontend deployed

## 📚 Recursos

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Socket.io](https://socket.io)
- [Vite](https://vitejs.dev)

---

**¡Disfruta construyendo!** 🎉
