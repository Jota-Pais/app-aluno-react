import { useState, useEffect } from 'react'
import { useUsuario } from '../context/UsuarioContext'
import { useNavigate } from 'react-router-dom'
import './PerfilPage.css'

const ABAS = ['Dados Pessoais', 'Configurações', 'Segurança']

export default function PerfilPage() {
  const { usuario } = useUsuario()
  const [abaAtiva, setAbaAtiva] = useState('Dados Pessoais')
  const { logout, atualizarUsuario } = useUsuario()
  const navigate = useNavigate()

  // Nome de preferência edit
  const [editandoPref, setEditandoPref] = useState(false)
  const [nomePrefValor, setNomePrefValor] = useState(usuario.nomePreferencia)

  useEffect(() => {
    setNomePrefValor(usuario.nomePreferencia)
  }, [usuario.nomePreferencia])

  function salvarNomePreferencia() {
    atualizarUsuario({ nomePreferencia: nomePrefValor })
    setEditandoPref(false)
  }

  // Tema (claro / escuro)
  const [temaEscuro, setTemaEscuro] = useState(
    localStorage.getItem('tema') === 'escuro'
  )

  useEffect(() => {
    if (temaEscuro) {
      document.documentElement.setAttribute('data-tema', 'escuro')
      localStorage.setItem('tema', 'escuro')
    } else {
      document.documentElement.removeAttribute('data-tema')
      localStorage.setItem('tema', 'claro')
    }
  }, [temaEscuro])

  // Popouts / modais
  const [showTrocarConta, setShowTrocarConta] = useState(false)
  const [showConfirmExcluir, setShowConfirmExcluir] = useState(false)
  const [showTrocarSenha, setShowTrocarSenha] = useState(false)
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confSenha, setConfSenha] = useState('')
  const [senhaErro, setSenhaErro] = useState('')

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
                {item.rotulo === 'Nome de Preferência' && editandoPref ? (
                  <div className="perfil__edit-row">
                    <input
                      className="perfil__input"
                      value={nomePrefValor}
                      onChange={(e) => setNomePrefValor(e.target.value)}
                    />
                    <button
                      className="botao botao--primario"
                      onClick={salvarNomePreferencia}
                    >
                      Salvar
                    </button>
                    <button
                      className="botao"
                      onClick={() => {
                        setEditandoPref(false)
                        setNomePrefValor(usuario.nomePreferencia)
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <>
                    {item.valor}
                    {item.rotulo === 'Nome de Preferência' && (
                      <button
                        className="perfil__editar"
                        onClick={() => setEditandoPref(true)}
                      >
                        Alterar
                      </button>
                    )}
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {abaAtiva === 'Configurações' ? (
        <div className="perfil__lista perfil__config">
          <div className="perfil__linha">
            <span className="perfil__rotulo">Tema</span>
            <div className="perfil__valor">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={temaEscuro}
                  onChange={() => setTemaEscuro((s) => !s)}
                />
                <span className="slider" />
              </label>
              <span style={{ marginLeft: 12 }}>
                {temaEscuro ? 'Escuro' : 'Claro'}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {abaAtiva === 'Segurança' ? (
        <div className="perfil__perigo-grupo">
          <div className="perfil__acao-item">
            <button
              className="perfil__opcao perfil__opcao--bloco"
              onClick={() => {
                setShowTrocarSenha((s) => !s)
                setSenhaErro('')
              }}
            >
              Trocar a senha
            </button>
          </div>

          {showTrocarSenha && (
            <div className="trocar-senha-form">
              <input
                type="password"
                placeholder="Digite a senha Atual"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                className="perfil__input"
              />
              <input
                type="password"
                placeholder="Digite a nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="perfil__input"
              />
              <input
                type="password"
                placeholder="confirme a senha"
                value={confSenha}
                onChange={(e) => setConfSenha(e.target.value)}
                className="perfil__input"
              />
              {senhaErro && (
                <div className="senha-erro">{senhaErro}</div>
              )}
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <button
                  className="botao botao--primario"
                  onClick={() => {
                    if (!novaSenha || novaSenha !== confSenha) {
                      setSenhaErro('As senhas não coincidem')
                      return
                    }
                    setShowTrocarSenha(false)
                    setSenhaAtual('')
                    setNovaSenha('')
                    setConfSenha('')
                    setSenhaErro('')
                  }}
                >
                  Salvar
                </button>
                <button
                  className="botao"
                  onClick={() => {
                    setShowTrocarSenha(false)
                    setSenhaAtual('')
                    setNovaSenha('')
                    setConfSenha('')
                    setSenhaErro('')
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="perfil__acao-item">
            <button
              className="perfil__opcao perfil__opcao--perigo"
              onClick={() => {
                logout()
                navigate('/')
              }}
            >
              Sair da Conta
            </button>
          </div>

          <div className="perfil__acao-item">
            <button
              className="perfil__opcao perfil__opcao--perigo"
              onClick={() => setShowTrocarConta(true)}
            >
              Trocar de conta
            </button>
          </div>

          <div className="perfil__acao-item">
            <button
              className="perfil__opcao perfil__opcao--perigo"
              onClick={() => setShowConfirmExcluir(true)}
            >
              Excluir conta
            </button>
          </div>
        </div>
      ) : null}

      {showTrocarConta && (
        <div className="overlay" onClick={() => setShowTrocarConta(false)}>
          <div
            className="popout"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <h3>Contas</h3>
            <div className="conta-item">
              <div className="conta-avatar">{usuario.nome[0]}</div>
              <div>
                <div className="conta-nome">{usuario.nome}</div>
                <div className="conta-email">{usuario.email}</div>
              </div>
            </div>

            <button
              className="botao botao--link"
              onClick={() => {
                setShowTrocarConta(false)
                navigate('/')
              }}
            >
              Adicionar conta
            </button>
          </div>
        </div>
      )}

      {showConfirmExcluir && (
        <div className="overlay" onClick={() => setShowConfirmExcluir(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog">
            <h3>Confirmação</h3>
            <p>Você deseja excluir permanentemente a conta?</p>
            <div className="modal__acoes">
              <button
                className="botao"
                onClick={() => setShowConfirmExcluir(false)}
              >
                Não
              </button>
              <button
                className="botao botao--perigo"
                onClick={() => {
                  setShowConfirmExcluir(false)
                  logout()
                  navigate('/')
                }}
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
