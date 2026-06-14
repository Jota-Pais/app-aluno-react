import { useNavigate } from 'react-router-dom'
import Card from './Card'
import Botao from './Botao'
import ProgressBar from './ProgressBar'
import { IconeDisciplinas } from './Icones'
import './DisciplinaCard.css'

// Card de uma disciplina, usado na lista renderizada com .map().
// Clicar no card (ou no botão) abre a tela de detalhe /disciplinas/:id.
export default function DisciplinaCard({ disciplina }) {
  const { id, nome, professor, status, emDestaque, rotuloProgresso, progresso } =
    disciplina
  const navigate = useNavigate()

  return (
    <Card className="disciplina" onClick={() => navigate(`/disciplinas/${id}`)}>
      <div className="disciplina__topo">
        <span className="disciplina__icone">
          <IconeDisciplinas />
        </span>
        <span className={`badge ${emDestaque ? 'badge--verde' : 'badge--cinza'}`}>
          {status}
        </span>
      </div>

      <div>
        <h3 className="disciplina__nome">{nome}</h3>
        <p className="disciplina__professor">{professor}</p>
      </div>

      <ProgressBar rotulo={rotuloProgresso} valor={progresso} />

      <Botao className="botao--bloco">Acessar Disciplina</Botao>
    </Card>
  )
}
