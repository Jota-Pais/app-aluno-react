import {
  IconeTutor,
  IconeSom,
  IconeCopiar,
  IconeRefazer,
  IconeNegativo,
} from './Icones'
import './ChatMessage.css'

// Uma mensagem do chat do Tutor IA. O texto entra via children.
export default function ChatMessage({ autor, nome, children }) {
  const ehTutor = autor === 'tutor'

  return (
    <div className={`mensagem ${ehTutor ? 'mensagem--tutor' : 'mensagem--usuario'}`}>
      <div className="mensagem__avatar">
        {ehTutor ? <IconeTutor /> : nome[0]}
      </div>
      <div className="mensagem__corpo">
        <strong className="mensagem__autor">{ehTutor ? 'Tutor IA' : nome}</strong>
        <div className="mensagem__texto">{children}</div>
        {ehTutor && (
          <div className="mensagem__acoes" aria-hidden="true">
            <IconeSom />
            <IconeCopiar />
            <IconeRefazer />
            <IconeNegativo />
          </div>
        )}
      </div>
    </div>
  )
}
