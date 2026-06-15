/* Provider e hook do tema ficam juntos (mesmo padrão do UsuarioContext).
   A regra desabilitada abaixo é só sobre HMR/fast-refresh. */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const TemaContext = createContext(null)

const PREFERE_ESCURO = '(prefers-color-scheme: dark)'

// 'automatico' segue a preferência do sistema operacional.
function resolver(tema) {
  if (tema === 'automatico') {
    return window.matchMedia(PREFERE_ESCURO).matches ? 'escuro' : 'claro'
  }
  return tema
}

export function TemaProvider({ children }) {
  const [tema, setTema] = useState('claro')

  // Aplica o tema no <html> via atributo data-tema, que o CSS observa.
  // No modo automático, reage também à mudança de tema do sistema.
  useEffect(() => {
    function aplicar() {
      document.documentElement.dataset.tema = resolver(tema)
    }
    aplicar()

    if (tema !== 'automatico') return
    const media = window.matchMedia(PREFERE_ESCURO)
    media.addEventListener('change', aplicar)
    return () => media.removeEventListener('change', aplicar)
  }, [tema])

  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  )
}

export function useTema() {
  const contexto = useContext(TemaContext)
  if (!contexto) {
    throw new Error('useTema precisa ser usado dentro de um TemaProvider')
  }
  return contexto
}
