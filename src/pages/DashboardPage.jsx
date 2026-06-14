import { useEffect, useState } from 'react'
import { useUsuario } from '../context/UsuarioContext'
import Card from '../components/Card'
import Botao from '../components/Botao'
import ProgressBar from '../components/ProgressBar'
import CardEstatistica from '../components/CardEstatistica'
import {
  IconeSeta,
  IconeRelogio,
  IconeTarefas,
  IconeChat,
} from '../components/Icones'
import './DashboardPage.css'

const cursosEmAndamento = [
  {
    id: 1,
    titulo: 'Front-end',
    descricao: 'Aula 2: Conceitos do desenvolvimento Front-end e GIT + Github.',
    progresso: 65,
  },
  {
    id: 2,
    titulo: 'UX Design',
    descricao: 'Aula 3: Usabilidade.',
    progresso: 25,
  },
]

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
  const primeiroNome = usuario.nome.split(' ')[0]

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
          <Botao className="curso__botao">
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
