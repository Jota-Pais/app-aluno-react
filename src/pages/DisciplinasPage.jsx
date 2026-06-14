import DisciplinaCard from '../components/DisciplinaCard'
import { disciplinas } from '../services/disciplinas'
import './DisciplinasPage.css'

export default function DisciplinasPage() {
  return (
    <section>
      <header className="disciplinas__cabecalho">
        <h2 className="pagina__titulo">Minhas Disciplinas</h2>
        <p className="disciplinas__sub">
          Você está matriculado em {disciplinas.length} disciplinas neste período.
        </p>
      </header>

      <div className="disciplinas__grade">
        {disciplinas.map((disciplina) => (
          <DisciplinaCard key={disciplina.id} disciplina={disciplina} />
        ))}
      </div>
    </section>
  )
}
