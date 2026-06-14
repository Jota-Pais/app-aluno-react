import { Link, useParams } from 'react-router-dom'
import Card from '../components/Card'
import Botao from '../components/Botao'
import ProgressBar from '../components/ProgressBar'
import { IconeDisciplinas, IconeCheck } from '../components/Icones'
import { disciplinas } from '../services/disciplinas'
import './DisciplinaDetalhePage.css'

export default function DisciplinaDetalhePage() {
  // Pega o id da URL e encontra a disciplina correspondente.
  const { id } = useParams()
  const disciplina = disciplinas.find((item) => item.id === id)

  if (!disciplina) {
    return (
      <section>
        <Link className="detalhe__voltar" to="/disciplinas">
          ← Disciplinas
        </Link>
        <p className="detalhe__vazio">Disciplina não encontrada.</p>
      </section>
    )
  }

  const {
    nome,
    professor,
    status,
    emDestaque,
    codigo,
    cargaHoraria,
    semestre,
    descricao,
    rotuloProgresso,
    progresso,
    aulas,
  } = disciplina

  const concluidas = aulas.filter((aula) => aula.concluida).length

  return (
    <section className="detalhe">
      <Link className="detalhe__voltar" to="/disciplinas">
        ← Disciplinas
      </Link>

      <Card className="detalhe__cabecalho">
        <span className="detalhe__icone">
          <IconeDisciplinas />
        </span>
        <div className="detalhe__info">
          <div className="detalhe__topo">
            <div>
              <h2 className="detalhe__nome">{nome}</h2>
              <p className="detalhe__professor">{professor}</p>
            </div>
            <span
              className={`badge ${emDestaque ? 'badge--verde' : 'badge--cinza'}`}
            >
              {status}
            </span>
          </div>
          <p className="detalhe__meta">
            {codigo} · {cargaHoraria} · {semestre}
          </p>
          <ProgressBar rotulo={rotuloProgresso} valor={progresso} />
        </div>
      </Card>

      <div className="detalhe__grade">
        <Card className="detalhe__bloco">
          <h3>Sobre a disciplina</h3>
          <p className="detalhe__descricao">{descricao}</p>
          <Botao className="botao--bloco">Continuar estudando</Botao>
        </Card>

        <Card className="detalhe__bloco">
          <h3>
            Conteúdo ({concluidas}/{aulas.length})
          </h3>
          <ul className="detalhe__aulas">
            {aulas.map((aula) => (
              <li
                key={aula.id}
                className={`aula ${aula.concluida ? 'aula--ok' : ''}`}
              >
                <span className="aula__status">
                  {aula.concluida && <IconeCheck />}
                </span>
                <span className="aula__titulo">{aula.titulo}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
