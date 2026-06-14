import { useState } from 'react'
import { useUsuario } from '../context/UsuarioContext'
import './PerfilPage.css'

const ABAS = ['Dados Pessoais', 'Configurações', 'Segurança']

export default function PerfilPage() {
  const { usuario } = useUsuario()
  const [abaAtiva, setAbaAtiva] = useState('Dados Pessoais')

  const iniciais = usuario.nome
    .split(' ')
    .map((parte) => parte[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const dados = [
    { rotulo: 'Nome Completo', valor: usuario.nome },
    { rotulo: 'Nome de Preferência', valor: usuario.nomePreferencia },
    { rotulo: 'Endereço de E-mail', valor: usuario.email },
    { rotulo: 'Matrícula / CPF', valor: usuario.cpf },
    {
      rotulo: 'Número de Telefone',
      valor: usuario.telefone || 'Não fornecido',
      vazio: !usuario.telefone,
    },
  ]

  return (
    <section>
      <div className="perfil__cabecalho">
        <span className="perfil__avatar">{iniciais}</span>
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

      {abaAtiva === 'Dados Pessoais' ? (
        <div className="perfil__lista">
          {dados.map((item) => (
            <div key={item.rotulo} className="perfil__linha">
              <span className="perfil__rotulo">{item.rotulo}</span>
              <span
                className={`perfil__valor ${
                  item.vazio ? 'perfil__valor--vazio' : ''
                }`}
              >
                {item.valor}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="perfil__placeholder">
          A seção "{abaAtiva}" estará disponível em breve.
        </p>
      )}
    </section>
  )
}
