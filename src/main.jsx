import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UsuarioProvider } from './context/UsuarioContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsuarioProvider>
      <App />
    </UsuarioProvider>
  </StrictMode>,
)
