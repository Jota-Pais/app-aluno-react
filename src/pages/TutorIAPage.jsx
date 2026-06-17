import { useEffect, useRef, useState } from 'react'
import { useUsuario, nomeDeExibicao } from '../context/UsuarioContext'
import ChatMessage from '../components/ChatMessage'
import { pedirParaIA, buscarMaterial, montarBoasVindas } from '../services/tutorIaService';
import { disciplinas } from '../services/disciplinas'
import { IconeClipe, IconeEnviar, IconeDisciplinas } from '../components/Icones'
import './TutorIAPage.css'

// Perguntas prontas para o aluno começar sem precisar pensar no que digitar.
const SUGESTOES = [
  'Como me organizar para as provas?',
  'Explique o conceito de integral.',
  'Resuma os principais pontos de Estatística.',
  'Dicas para estudar Front-end.',
]

export default function TutorIAPage() {
  const { usuario } = useUsuario()
  const [pergunta, setPergunta] = useState('')
  const [mensagens, setMensagens] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [disciplinaAnexada, setDisciplinaAnexada] = useState(null)
  const [menuAberto, setMenuAberto] = useState(false)
  const proximoId = useRef(1)

  function adicionarMensagem(campos) {
    setMensagens((anteriores) => [
      ...anteriores,
      { id: proximoId.current++, ...campos },
    ])
  }

  // Carrega a mensagem de boas-vindas do Tutor ao montar a tela.
  // Padrão canônico: fetch em useEffect com loading/erro/dados e limpeza.
  useEffect(() => {
    let ativo = true

    async function carregarBoasVindas() {
      setCarregando(true)
      try {
        const material = await buscarMaterial()
        if (ativo) {
          setMensagens([
            { id: 0, autor: 'tutor', texto: montarBoasVindas(material) },
          ])
        }
      } catch {
        if (ativo) {
          setErro('Não foi possível iniciar o Tutor IA. Recarregue a página.')
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    carregarBoasVindas()
    return () => {
      ativo = false
    }
  }, [])

  // Envia uma pergunta (do campo ou de uma sugestão) e busca a resposta.
  // Consumo de API: padrão loading / erro / dados com try/catch/finally.
  async function enviarPergunta(textoBruto) {
    const texto = textoBruto.trim()
    if (!texto || carregando) return

    const disciplina = disciplinaAnexada
    adicionarMensagem({ autor: 'usuario', texto })
    setPergunta('')
    setErro('')
    setMenuAberto(false)
    setCarregando(true)

    try {
      // 1. Pede a resposta real para a IA (Gemini)
      const respostaIA = await pedirParaIA(texto, disciplina ? disciplina.nome : '');
      // 2. Busca o material extra
      const material = await buscarMaterial();
      // 3. Junta a IA com o material
      const textoFinal = `${respostaIA}\n\n---\n📚 Material de referência — "${material.titulo}":\n${material.corpo}`;
      adicionarMensagem({
        autor: 'tutor',
        texto: textoFinal,
        pergunta: texto,
        disciplina,
      })
    } catch {
      setErro('Não foi possível obter a resposta do Tutor IA. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  // Gera uma nova resposta para a mesma pergunta (botão "Refazer" da mensagem).
  async function refazer(id, perguntaOriginal, disciplina) {
    if (carregando) return
    setErro('')
    setCarregando(true)
    try {
      // Faz a mesma junção da IA com o material de referência
      const respostaIA = await pedirParaIA(perguntaOriginal, disciplina ? disciplina.nome : '');
      const material = await buscarMaterial();
      const novoTexto = `${respostaIA}\n\n---\n📚 Material de referência — "${material.titulo}":\n${material.corpo}`;
      setMensagens((anteriores) =>
        anteriores.map((m) => (m.id === id ? { ...m, texto: novoTexto } : m)),
      )
    } catch {
      setErro('Não foi possível gerar outra resposta. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  function enviar(evento) {
    evento.preventDefault()
    enviarPergunta(pergunta)
  }

  // Sugestões só aparecem no início (apenas a mensagem de boas-vindas na tela).
  const mostrarSugestoes = mensagens.length <= 1 && !carregando && !erro

  return (
    <section className="tutoria">
      <div className="tutoria__mensagens">
        {mensagens.length === 0 && !carregando && !erro && (
          <p className="tutoria__vazio">
            Faça uma pergunta para começar a conversar com o Tutor IA.
          </p>
        )}

        {mensagens.map((mensagem) => (
          <ChatMessage
            key={mensagem.id}
            autor={mensagem.autor}
            nome={nomeDeExibicao(usuario)}
            texto={mensagem.texto}
            onRefazer={
              mensagem.pergunta
                ? () =>
                    refazer(mensagem.id, mensagem.pergunta, mensagem.disciplina)
                : undefined
            }
          />
        ))}

        {carregando && (
          <p className="tutoria__carregando">O Tutor IA está digitando…</p>
        )}

        {erro && <p className="tutoria__erro">{erro}</p>}
      </div>

      {mostrarSugestoes && (
        <div className="tutoria__sugestoes">
          {SUGESTOES.map((sugestao) => (
            <button
              key={sugestao}
              type="button"
              className="tutoria__sugestao"
              onClick={() => enviarPergunta(sugestao)}
            >
              {sugestao}
            </button>
          ))}
        </div>
      )}

      {disciplinaAnexada && (
        <div className="tutoria__anexo">
          <IconeDisciplinas />
          <span>
            Foco: <strong>{disciplinaAnexada.nome}</strong>
          </span>
          <button
            type="button"
            className="tutoria__anexo-remover"
            onClick={() => setDisciplinaAnexada(null)}
            aria-label="Remover foco da disciplina"
          >
            ×
          </button>
        </div>
      )}

      <form className="tutoria__form" onSubmit={enviar}>
        <div className="tutoria__clipe-wrap">
          <button
            type="button"
            className={`tutoria__clipe ${
              menuAberto || disciplinaAnexada ? 'tutoria__clipe--ativo' : ''
            }`}
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-label="Focar numa disciplina"
            title="Focar numa disciplina"
          >
            <IconeClipe />
          </button>

          {menuAberto && (
            <ul className="tutoria__menu">
              <li className="tutoria__menu-titulo">Focar numa disciplina</li>
              {disciplinas.map((disciplina) => (
                <li key={disciplina.id}>
                  <button
                    type="button"
                    className="tutoria__menu-item"
                    onClick={() => {
                      setDisciplinaAnexada(disciplina)
                      setMenuAberto(false)
                    }}
                  >
                    {disciplina.nome}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          className="tutoria__input"
          type="text"
          placeholder={
            disciplinaAnexada
              ? `Pergunte sobre ${disciplinaAnexada.nome}…`
              : 'Pergunte alguma coisa'
          }
          value={pergunta}
          onChange={(evento) => setPergunta(evento.target.value)}
        />
        <button
          className="tutoria__enviar"
          type="submit"
          disabled={carregando}
          aria-label="Enviar pergunta"
        >
          <IconeEnviar />
        </button>
      </form>

      <p className="tutoria__nota">
        O Tutor pode cometer erros. Considere verificar informações importantes.
      </p>
    </section>
  )
}
