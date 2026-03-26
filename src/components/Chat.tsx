import { useState, useEffect, useRef } from 'react'
import { Socket, io } from 'socket.io-client'

interface Message {
  texto: string
  timestamp?: Date
}

export const Chat = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [mensajes, setMensajes] = useState<Message[]>([])
  const [conectado, setConectado] = useState(false)
  const ulRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:8080', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    })

    newSocket.on('connect', () => {
      setConectado(true)
      console.log('Conectado al servidor')
    })

    newSocket.on('disconnect', () => {
      setConectado(false)
      console.log('Desconectado del servidor')
    })

    newSocket.on('mensaje-from-server', (data: Message) => {
      setMensajes((prev) => [...prev, data])
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [mensajes])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mensaje.trim() && socket && conectado) {
      socket.emit('mensaje-to-server', { texto: mensaje })
      setMensaje('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">💬 Mini Chat</h1>
              <p className="text-gray-600">Comunicación en tiempo real con Socket.io</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${conectado ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {conectado ? 'En línea' : 'Conectando...'}
              </span>
            </div>
          </div>
        </div>

        {/* Chat Box */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Mensajes */}
          <div className="bg-gray-50 p-4 h-96 overflow-y-auto border-b border-gray-200">
            <ul className="space-y-3 flex flex-col" ref={ulRef}>
              {mensajes.length === 0 ? (
                <li className="text-center text-gray-400 py-8 m-auto">
                  <div className="text-4xl mb-3">💭</div>
                  <p>Escribe un mensaje para comenzar...</p>
                </li>
              ) : (
                mensajes.map((msg, idx) => (
                  <li
                    key={idx}
                    className="bg-indigo-500 text-white rounded-lg px-4 py-3 break-words max-w-xs ml-auto shadow-md hover:shadow-lg transition-shadow"
                  >
                    {msg.texto}
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white flex gap-3">
            <input
              type="text"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Escribe tu mensaje..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              disabled={!conectado}
            />
            <button
              type="submit"
              disabled={!conectado}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Total de mensajes: <span className="font-semibold text-indigo-600">{mensajes.length}</span></p>
        </div>
      </div>
    </div>
  )
}
