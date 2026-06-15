import { useEffect, useState } from 'react'
import {
  IconeTutor,
  IconeSom,
  IconeCopiar,
  IconeRefazer,
  IconeNegativo,
  IconeCheck,
} from './Icones'
import './ChatMessage.css'

// Uma mensagem do chat do Tutor IA. O texto entra via prop `texto` (com
// parágrafos separados por linha em branco). Nas respostas do tutor, a barra
// de ações é funcional: ouvir em voz alta, copiar, gerar outra resposta
// (quando `onRefazer` é passado) e marcar como não útil.
export default function ChatMessage({ autor, nome, texto, onRefazer }) {
  const ehTutor = autor === 'tutor'
  const [copiado, setCopiado] = useState(false)
  const [lendo, setLendo] = useState(false)
  const [naoUtil, setNaoUtil] = useState(false)

  const paragrafos = String(texto).split('\n\n')

  // Some com o aviso "Copiado!" depois de um instante.
  useEffect(() => {
    if (!copiado) return
    const t = setTimeout(() => setCopiado(false), 1600)
    return () => clearTimeout(t)
  }, [copiado])

  // Garante que a leitura em voz pare se a mensagem sair da tela.
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [])

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
    } catch {
      setCopiado(false)
    }
  }

  function lerEmVoz() {
    if (!('speechSynthesis' in window)) return
    if (lendo) {
      window.speechSynthesis.cancel()
      setLendo(false)
      return
    }
    const fala = new SpeechSynthesisUtterance(texto)
    fala.lang = 'pt-BR'
    fala.onend = () => setLendo(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(fala)
    setLendo(true)
  }

  return (
    <div className={`mensagem ${ehTutor ? 'mensagem--tutor' : 'mensagem--usuario'}`}>
      <div className="mensagem__avatar">
        {ehTutor ? <IconeTutor /> : nome[0]}
      </div>
      <div className="mensagem__corpo">
        <strong className="mensagem__autor">{ehTutor ? 'Tutor IA' : nome}</strong>
        <div className="mensagem__texto">
          {paragrafos.map((paragrafo, indice) => (
            <p key={indice}>{paragrafo}</p>
          ))}
        </div>

        {ehTutor && (
          <div className="mensagem__acoes">
            <button
              type="button"
              className={`mensagem__acao ${lendo ? 'mensagem__acao--ativo' : ''}`}
              onClick={lerEmVoz}
              aria-label={lendo ? 'Parar leitura' : 'Ouvir resposta'}
              title={lendo ? 'Parar leitura' : 'Ouvir resposta'}
            >
              <IconeSom />
            </button>
            <button
              type="button"
              className="mensagem__acao"
              onClick={copiar}
              aria-label="Copiar resposta"
              title="Copiar resposta"
            >
              {copiado ? <IconeCheck /> : <IconeCopiar />}
            </button>
            {onRefazer && (
              <button
                type="button"
                className="mensagem__acao"
                onClick={onRefazer}
                aria-label="Gerar outra resposta"
                title="Gerar outra resposta"
              >
                <IconeRefazer />
              </button>
            )}
            <button
              type="button"
              className={`mensagem__acao ${naoUtil ? 'mensagem__acao--ativo' : ''}`}
              onClick={() => setNaoUtil((valor) => !valor)}
              aria-label="Não foi útil"
              title="Não foi útil"
            >
              <IconeNegativo />
            </button>

            {copiado && <span className="mensagem__nota">Copiado!</span>}
            {naoUtil && <span className="mensagem__nota">Obrigado pelo feedback!</span>}
          </div>
        )}
      </div>
    </div>
  )
}
