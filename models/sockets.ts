
//SocketIOServer: El servidor principal de Socket.io
//Socket: Representa la conexión individual de cada cliente
import { Server as SocketIOServer, Socket } from 'socket.io'

//Define la estructura que deben tener los mensajes (texto y timestamp opcional)
interface Message {
  texto: string
  timestamp?: Date
}


//Guarda la referencia al servidor de Socket.io
//Al crear una instancia, automáticamente llama a socketEvents() para configurar todos los eventos
class Sockets {
  // El servidor de Socket.io para manejar conexiones y eventos en tiempo real
  private io: SocketIOServer  

  //Recibe la instancia del servidor de Socket.io y la guarda para usarla en los eventos
  constructor(io: SocketIOServer) 
  {
    this.io = io // Guarda la referencia al servidor de Socket.io para usarla en los eventos
    this.socketEvents() // Configura los eventos de sockets (conexiones, mensajes, etc.)
  }

  //socketEvents() - El cerebro de la comunicación en tiempo real:
  //Escucha cuando un cliente se conecta, maneja mensajes entrantes, responde a los clientes y maneja desconexiones y errores.
  private socketEvents(): void {
    // Escuchar cuando un cliente se conecta
    this.io.on('connection', (socket: Socket) => 
    {
      //// Cada vez que un cliente se conecta, se ejecuta esta función y se muestra un mensaje en la consola con el ID del cliente conectado.

      console.log(`✨ Cliente conectado: ${socket.id}`)
      // Emitir mensaje de bienvenida
      socket.emit('mensaje-from-server', {
        texto: '👋 Bienvenido al chat en tiempo real',
        timestamp: new Date(),
      })

      // Escuchar mensajes del cliente
      socket.on('mensaje-to-server', (data: Message) => {
        console.log(`📨 Mensaje de ${socket.id}:`, data)

        // Responder al mensaje del cliente
        this.io.emit('mensaje-from-server', {
          texto: data.texto,
          timestamp: new Date(),
        })
      })

      // Manejar desconexión
      // Cada vez que un cliente se desconecta, se ejecuta esta función y se muestra un mensaje en la consola con el ID del cliente desconectado.
      socket.on('disconnect', () => {
        console.log(`❌ Cliente desconectado: ${socket.id}`)
      })

      // Manejar errores
      socket.on('error', (error: Error) => {
        console.error(`⚠️ Error en socket ${socket.id}:`, error)
      })
    })
  }
}

export default Sockets
