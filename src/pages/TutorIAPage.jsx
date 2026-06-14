import { useEffect, useRef, useState } from 'react'
import { useUsuario } from '../context/UsuarioContext'
import ChatMessage from '../components/ChatMessage'
import { buscarRespostaTutor } from '../services/tutorIaService'
import { IconeClipe, IconeEnviar } from '../components/Icones'
import './TutorIAPage.css'

export default function TutorIAPage() {
  const { usuario } = useUsuario()
  const [pergunta, setPergunta] = useState('')
  const [mensagens, setMensagens] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const proximoId = useRef(1)

  function adicionarMensagem(autor, texto) {
    setMensagens((anteriores) => [
      ...anteriores,
      { id: proximoId.current++, autor, texto },
    ])
  }

  // Carrega uma mensagem de boas-vindas do Tutor ao montar a tela.
  // Padrão canônico: fetch em useEffect com loading/erro/dados e limpeza.
  useEffect(() => {
    let ativo = true

    async function carregarBoasVindas() {
      setCarregando(true)
      try {
        const resposta = await buscarRespostaTutor('boas-vindas')
        if (ativo) {
          setMensagens([{ id: 0, autor: 'tutor', texto: resposta }])
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

  async function enviar(evento) {
    evento.preventDefault()
    const texto = pergunta.trim()
    if (!texto || carregando) return

    adicionarMensagem('usuario', texto)
    setPergunta('')
    setErro('')
    setCarregando(true)

    // Consumo de API: padrão loading / erro / dados com try/catch/finally.
    try {
      const resposta = await buscarRespostaTutor(texto)
      adicionarMensagem('tutor', resposta)
    } catch {
      setErro('Não foi possível obter a resposta do Tutor IA. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

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
            nome={usuario.nome}
          >
            {mensagem.texto}
          </ChatMessage>
        ))}

        {carregando && (
          <p className="tutoria__carregando">O Tutor IA está digitando…</p>
        )}

        {erro && <p className="tutoria__erro">{erro}</p>}
      </div>

      <form className="tutoria__form" onSubmit={enviar}>
        <span className="tutoria__clipe">
          <IconeClipe />
        </span>
        <input
          className="tutoria__input"
          type="text"
          placeholder="Pergunte alguma coisa"
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
