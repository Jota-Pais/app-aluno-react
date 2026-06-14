import { Navigate } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext'

// Protege as telas internas: sem usuário autenticado, redireciona ao Login.
export default function RotaProtegida({ children }) {
  const { usuario } = useUsuario()

  if (!usuario) {
    return <Navigate to="/" replace />
  }

  return children
}
