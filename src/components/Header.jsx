import { NavLink } from 'react-router-dom'
import { useUsuario, nomeDeExibicao } from '../context/UsuarioContext'
import Avatar from './Avatar'
import {
  IconePainel,
  IconeDisciplinas,
  IconeTutor,
  IconePerfil,
} from './Icones'
import './Header.css'

const LINKS = [
  { para: '/dashboard', rotulo: 'Painel', Icone: IconePainel },
  { para: '/disciplinas', rotulo: 'Disciplinas', Icone: IconeDisciplinas },
  { para: '/tutoria', rotulo: 'Tutor IA', Icone: IconeTutor },
  { para: '/perfil', rotulo: 'Perfil', Icone: IconePerfil },
]

export default function Header() {
  const { usuario, logout } = useUsuario()

  // Nome vem do Context (sem prop drilling), assim como no Dashboard e Perfil.
  const primeiroNome = nomeDeExibicao(usuario)

  return (
    <header className="cabecalho">
      <div className="cabecalho__conteudo">
        <h1 className="cabecalho__marca">
          Academia <span>Portal do Aluno</span>
        </h1>

        <nav className="cabecalho__nav">
          {LINKS.map(({ para, rotulo, Icone }) => (
            <NavLink
              key={para}
              to={para}
              className={({ isActive }) =>
                `cabecalho__link ${isActive ? 'active' : ''}`
              }
            >
              <Icone />
              <span className="cabecalho__rotulo">{rotulo}</span>
            </NavLink>
          ))}
        </nav>

        <div className="cabecalho__usuario">
          <Avatar
            nome={usuario.nome}
            foto={usuario.foto}
            className="cabecalho__avatar"
          />
          <span className="cabecalho__nome">{primeiroNome}</span>
          <button className="cabecalho__sair" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
