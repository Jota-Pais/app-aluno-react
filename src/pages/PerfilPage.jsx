import { useState } from 'react'
import { useUsuario } from '../context/UsuarioContext'
import Avatar from '../components/Avatar'
import PerfilIdentidade from '../components/PerfilIdentidade'
import PerfilDados from '../components/PerfilDados'
import PerfilConfiguracoes from '../components/PerfilConfiguracoes'
import PerfilSeguranca from '../components/PerfilSeguranca'
import './PerfilPage.css'

const ABAS = ['Dados Pessoais', 'Configurações', 'Segurança']

export default function PerfilPage() {
  const { usuario } = useUsuario()
  const [abaAtiva, setAbaAtiva] = useState('Dados Pessoais')

  return (
    <section>
      <div className="perfil__cabecalho">
        <Avatar
          nome={usuario.nome}
          foto={usuario.foto}
          className="perfil__avatar"
        />
        <div>
          <h2 className="perfil__nome">{usuario.nome}</h2>
          <p className="perfil__sub">
            {usuario.curso} • {usuario.ano}
          </p>
        </div>
      </div>

      <div className="perfil__abas">
        {ABAS.map((aba) => (
          <button
            key={aba}
            className={`perfil__aba ${
              abaAtiva === aba ? 'perfil__aba--ativa' : ''
            }`}
            onClick={() => setAbaAtiva(aba)}
          >
            {aba}
          </button>
        ))}
      </div>

      {abaAtiva === 'Dados Pessoais' && (
        <>
          <PerfilIdentidade />
          <PerfilDados />
        </>
      )}

      {abaAtiva === 'Configurações' && <PerfilConfiguracoes />}

      {abaAtiva === 'Segurança' && <PerfilSeguranca />}
    </section>
  )
}
