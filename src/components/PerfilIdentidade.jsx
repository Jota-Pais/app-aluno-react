import { useState } from 'react'
import { useUsuario } from '../context/UsuarioContext'
import { buscarUsuarioGithub } from '../services/githubService'
import Avatar from './Avatar'
import Botao from './Botao'

// Painel de identidade (aba Dados Pessoais): foto de perfil (upload manual)
// e conexão com o GitHub para puxar foto + dados da conta.
export default function PerfilIdentidade() {
  const { usuario, atualizarUsuario } = useUsuario()
  const [consulta, setConsulta] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  function escolherFoto(evento) {
    const arquivo = evento.target.files[0]
    if (!arquivo) return
    const leitor = new FileReader()
    leitor.onload = () => atualizarUsuario({ foto: leitor.result })
    leitor.readAsDataURL(arquivo)
  }

  function removerFoto() {
    atualizarUsuario({ foto: '' })
  }

  // Consumo de API: padrão loading / erro / dados com try/catch/finally.
  async function conectarGithub(evento) {
    evento.preventDefault()
    if (!consulta.trim() || carregando) return
    setErro('')
    setCarregando(true)
    try {
      const dados = await buscarUsuarioGithub(consulta)
      // Usa o nome do GitHub como o nome exibido no site. Se a conta não tem
      // nome preenchido, cai para o próprio login (usuário) do GitHub.
      const nomeGithub = dados.name || dados.login
      atualizarUsuario({
        foto: dados.avatar_url,
        nome: dados.name || usuario.nome,
        nomePreferencia: nomeGithub,
        github: {
          login: dados.login,
          url: dados.html_url,
          bio: dados.bio,
          local: dados.location,
          empresa: dados.company,
          repos: dados.public_repos,
          seguidores: dados.followers,
        },
      })
      setConsulta('')
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  const github = usuario.github

  return (
    <div className="perfil__painel perfil__painel--identidade">
      <section className="perfil__grupo">
        <h3 className="perfil__grupo-titulo">Foto de perfil</h3>
        <div className="identidade__foto">
          <Avatar
            nome={usuario.nome}
            foto={usuario.foto}
            className="identidade__avatar"
          />
          <div className="identidade__foto-acoes">
            <input
              type="file"
              id="foto-perfil"
              accept="image/*"
              className="identidade__file"
              onChange={escolherFoto}
            />
            <label htmlFor="foto-perfil" className="perfil__botao-secundario">
              Escolher foto
            </label>
            {usuario.foto && (
              <button
                type="button"
                className="perfil__botao-secundario"
                onClick={removerFoto}
              >
                Remover
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="perfil__grupo">
        <h3 className="perfil__grupo-titulo">Conectar com o GitHub</h3>
        <p className="identidade__ajuda">
          Informe seu <strong>usuário</strong> do GitHub para usar sua foto, seu
          nome e os dados da conta no site.
        </p>
        <form className="identidade__github-form" onSubmit={conectarGithub}>
          <input
            className="identidade__github-input"
            type="text"
            placeholder="usuário do GitHub"
            value={consulta}
            onChange={(evento) => setConsulta(evento.target.value)}
          />
          <Botao type="submit" disabled={carregando}>
            {carregando ? 'Buscando…' : 'Conectar'}
          </Botao>
        </form>

        {erro && <p className="identidade__erro">{erro}</p>}

        {github && (
          <div className="identidade__github">
            <p>
              Conectado como{' '}
              <a href={github.url} target="_blank" rel="noreferrer">
                @{github.login}
              </a>
              .
            </p>
            {github.bio && <p className="identidade__bio">{github.bio}</p>}
            <ul className="identidade__github-dados">
              {github.local && <li>📍 {github.local}</li>}
              {github.empresa && <li>🏢 {github.empresa}</li>}
              <li>📦 {github.repos} repositórios públicos</li>
              <li>👥 {github.seguidores} seguidores</li>
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}
