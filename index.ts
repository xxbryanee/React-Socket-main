// Importar el servidor de Express
import Server from './models/server'
import dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config()

// Crear una instancia del servidor
const server = new Server()

// Ejecutar el servidor
 // ¡Arranca todo!
server.execute()
