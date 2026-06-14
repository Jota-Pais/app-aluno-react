import DisciplinaCard from '../components/DisciplinaCard'
import { disciplinas } from '../services/disciplinas'
import './DisciplinasPage.css'

export default function DisciplinasPage() {
  return (
    <section>
      <h2 className="pagina__titulo">Minhas Disciplinas</h2>

      <div className="disciplinas__grade">
        {disciplinas.map((disciplina) => (
          <DisciplinaCard key={disciplina.id} disciplina={disciplina} />
        ))}
      </div>
    </section>
  )
}
