import Card from './Card'
import Botao from './Botao'
import ProgressBar from './ProgressBar'
import './DisciplinaCard.css'

// Card de uma disciplina, usado na lista renderizada com .map().
export default function DisciplinaCard({ disciplina }) {
  const { nome, professor, status, emDestaque, rotuloProgresso, progresso } =
    disciplina

  return (
    <Card className="disciplina">
      <div className="disciplina__cabecalho">
        <div>
          <h3 className="disciplina__nome">{nome}</h3>
          <p className="disciplina__professor">{professor}</p>
        </div>
        <span className={`badge ${emDestaque ? 'badge--verde' : 'badge--cinza'}`}>
          {status}
        </span>
      </div>

      <ProgressBar rotulo={rotuloProgresso} valor={progresso} />

      <Botao className="botao--bloco">Acessar Disciplina</Botao>
    </Card>
  )
}
