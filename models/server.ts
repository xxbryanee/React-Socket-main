//Este código crea un servidor web completo que:

//1.-Sirve páginas web (desde la carpeta public)

//2.-Acepta peticiones JSON (para APIs REST)

//3.-Maneja conexiones WebSocket (para tiempo real como chats, notificaciones)

//4.-Todo en un solo puerto (8080 por defecto)

//Es una estructura muy común para aplicaciones que necesitan tanto API REST
//  como comunicación en tiempo real (chats, juegos, dashboards en vivo, etc.).





//Framework para crear el servidor web
import express, { Express } from 'express'
//Módulo nativo de Node.js para crear servidores HTTP
import http from 'http'
//Para comunicación en tiempo real (WebSockets)
import { Server as SocketIOServer } from 'socket.io'
//Para manejar rutas de archivos
import path from 'path'
//Convierte URLs de archivos a rutas de sistema
import { fileURLToPath } from 'url'
//Clase personalizada que manejará la lógica de sockets
import Sockets from './sockets'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

class Server {
  private app: Express 
  private port: string | number 
  private server: http.Server
  private io: SocketIOServer

  constructor() {
    this.app = express()  //// Crea la aplicación Express
    this.port = process.env.PORT || 8080 // Puerto (default: 8080)
    this.server = http.createServer(this.app)  // Crea servidor HTTP
    this.io = new SocketIOServer(this.server,  // Integra Socket.io
    {
      cors:  // Configuración CORS para permitir conexiones desde cualquier origen
      {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    })
  }

  //Los middlewares son funciones que se ejecutan antes de llegar a las rutas:
  private middlewares(): void 
  {
    // Desplegar el directorio público
    //// Servir archivos estáticos (HTML, CSS, JS) desde la carpeta 'public'
    //Hace pública la carpeta public para que los clientes puedan acceder a archivos como index.html, style.css, etc.
   this.app.use(express.static(path.resolve(__dirname, '../public')))
    // Middleware para parsear JSON
    //Convierte automáticamente los JSON que llegan en las peticiones a objetos JavaScript
    this.app.use(express.json())
  }

//Crea una instancia de la clase Sockets y le pasa el servidor de Socket.io para que configure todos los eventos (conexiones, mensajes, etc.)
  private configurarSockets(): void
  {
    // Configurar sockets
    // Instancia la clase que maneja los eventos de sockets y le pasa la instancia de Socket.io para que pueda usarla
    new Sockets(this.io)
  }

  //Es el método que arranca todo:
//1.-Configura los middlewares

//2.-Configura los sockets

//3.-Pone a escuchar el servidor en el puerto definido
  public execute(): void 
  {
    // Inicializar middlewares
    //// 1. Configura middlewares para servir archivos estáticos y parsear JSON
    this.middlewares()

    // Inicializar sockets
    // 2. Configura sockets para manejar conexiones y eventos en tiempo real
    this.configurarSockets()

    // Inicializar server
     // 3. Inicia el servidor HTTP y Socket.io en el puerto especificado
    this.server.listen(this.port, () => {
      console.log(`✅ Servidor corriendo en puerto ${this.port}`)
      console.log(`🔗 Abierto en http://localhost:${this.port}`)
    })
  }
}

export default Server
