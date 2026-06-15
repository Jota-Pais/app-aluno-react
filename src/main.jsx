import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TemaProvider } from './context/TemaContext'
import { UsuarioProvider } from './context/UsuarioContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TemaProvider>
      <UsuarioProvider>
        <App />
      </UsuarioProvider>
    </TemaProvider>
  </StrictMode>,
)
