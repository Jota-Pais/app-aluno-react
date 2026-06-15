import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsuario, nomeDeExibicao } from '../context/UsuarioContext'
import Card from '../components/Card'
import Botao from '../components/Botao'
import ProgressBar from '../components/ProgressBar'
import CardEstatistica from '../components/CardEstatistica'
import { disciplinas } from '../services/disciplinas'
import {
  IconeSeta,
  IconeRelogio,
  IconeTarefas,
  IconeChat,
} from '../components/Icones'
import './DashboardPage.css'

// Os cursos "em andamento" derivam das disciplinas reais (mesma fonte da tela
// de Disciplinas), então o painel nunca mostra uma matéria que não existe lá.
// Pega as 2 disciplinas em curso com maior progresso e usa a próxima aula
// pendente de cada uma como a "tarefa" atual.
const cursosEmAndamento = disciplinas
  .filter((d) => d.status === 'Em curso' && d.progresso > 0 && d.progresso < 100)
  .sort((a, b) => b.progresso - a.progresso)
  .slice(0, 2)
  .map((d) => {
    const proximaAula = d.aulas.find((aula) => !aula.concluida)
    return {
      id: d.id,
      titulo: d.nome,
      descricao: proximaAula
        ? `Aula ${proximaAula.id}: ${proximaAula.titulo}.`
        : 'Todas as aulas concluídas. Hora de revisar o conteúdo.',
      progresso: d.progresso,
    }
  })

const estatisticas = [
  {
    id: 'tempo',
    titulo: 'Tempo de Estudo',
    valor: '12h 45m',
    descricao: 'Esta semana',
    icone: <IconeRelogio />,
  },
  {
    id: 'tarefas',
    titulo: 'Tarefas Pendentes',
    valor: '2',
    descricao: 'Próximo vencimento em 2 dias',
    icone: <IconeTarefas />,
  },
  {
    id: 'chats',
    titulo: 'Discussões com IA',
    valor: '8',
    descricao: 'Tópicos ativos',
    icone: <IconeChat />,
  },
]

function calcularSaudacao(data) {
  const hora = data.getHours()
  if (hora < 12) return 'Bom dia'
  if (hora < 18) return 'Boa tarde'
  return 'Boa noite'
}

export default function DashboardPage() {
  const { usuario } = useUsuario()
  const navigate = useNavigate()
  const [agora, setAgora] = useState(() => new Date())

  // Efeito colateral: relógio que atualiza a cada segundo, com limpeza
  // do intervalo ao desmontar (como a data/hora do scripts.js original).
  useEffect(() => {
    const intervalo = setInterval(() => setAgora(new Date()), 1000)
    return () => clearInterval(intervalo)
  }, [])

  const saudacao = calcularSaudacao(agora)
  const dataHoje = agora.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const horario = agora.toLocaleTimeString('pt-BR')
  const primeiroNome = nomeDeExibicao(usuario)

  return (
    <section>
      <div className="boas-vindas">
        <h2 className="boas-vindas__titulo">
          {saudacao}, {primeiroNome}.
        </h2>
        <p className="boas-vindas__data">
          {dataHoje} · {horario}
        </p>
        <p className="boas-vindas__texto">
          Bem-vindo de volta à sua sessão de estudo focado. Você tem 2 tarefas
          para esta semana e está atualmente adiantado em seu cronograma de
          leitura.
        </p>
      </div>

      {cursosEmAndamento.map((curso) => (
        <Card key={curso.id} className="curso">
          <div className="curso__info">
            <span className="badge badge--verde">Em progresso</span>
            <h3 className="curso__titulo">{curso.titulo}</h3>
            <p className="curso__desc">{curso.descricao}</p>
            <ProgressBar valor={curso.progresso} />
          </div>
          <Botao
            className="curso__botao"
            onClick={() => navigate(`/disciplinas/${curso.id}`)}
          >
            Retomar Estudo <IconeSeta />
          </Botao>
        </Card>
      ))}

      <div className="estatisticas">
        {estatisticas.map((item) => (
          <CardEstatistica
            key={item.id}
            icone={item.icone}
            titulo={item.titulo}
            valor={item.valor}
            descricao={item.descricao}
          />
        ))}
      </div>
    </section>
  )
}
