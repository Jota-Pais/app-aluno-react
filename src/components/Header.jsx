import { NavLink } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext'
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
  const iniciais = usuario.nome
    .split(' ')
    .map((parte) => parte[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const primeiroNome = usuario.nome.split(' ')[0]

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
          <span className="cabecalho__avatar">{iniciais}</span>
          <span className="cabecalho__nome">{primeiroNome}</span>
          <button className="cabecalho__sair" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
