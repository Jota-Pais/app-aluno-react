import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext'
import InputField from './InputField'
import Botao from './Botao'
import Interruptor from './Interruptor'

// Sessões abertas de exemplo (dispositivos conectados à conta).
const SESSOES_INICIAIS = [
  { id: 1, dispositivo: 'Chrome · Windows', local: 'Criciúma, SC', atual: true },
  { id: 2, dispositivo: 'App Aluno · Android', local: 'Criciúma, SC', atual: false },
  { id: 3, dispositivo: 'Safari · iPhone', local: 'Florianópolis, SC', atual: false },
]

// Aba "Segurança" do Perfil: troca de senha (com validação),
// autenticação em duas etapas e gerenciamento das sessões ativas.
export default function PerfilSeguranca() {
  const { logout } = useUsuario()
  const navigate = useNavigate()
  const [form, setForm] = useState({ atual: '', nova: '', confirmar: '' })
  const [erros, setErros] = useState({})
  const [sucesso, setSucesso] = useState(false)
  const [doisFatores, setDoisFatores] = useState(false)
  const [sessoes, setSessoes] = useState(SESSOES_INICIAIS)
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false)

  // Sair e trocar de conta derrubam a sessão e voltam ao login. (A autenticação
  // é simulada, então "excluir" também apenas encerra a sessão.)
  function sairDaConta() {
    logout()
    navigate('/')
  }

  function atualizar(campo) {
    return (evento) => {
      setForm((anterior) => ({ ...anterior, [campo]: evento.target.value }))
      setSucesso(false)
    }
  }

  function validar() {
    const novos = {}
    if (!form.atual) {
      novos.atual = 'Informe sua senha atual.'
    }
    if (!form.nova) {
      novos.nova = 'Crie uma nova senha.'
    } else if (form.nova.length < 6) {
      novos.nova = 'A nova senha deve ter ao menos 6 caracteres.'
    }
    if (form.confirmar !== form.nova) {
      novos.confirmar = 'As senhas não coincidem.'
    }
    return novos
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    const novosErros = validar()
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    // Troca simulada: limpa o formulário e confirma na tela.
    setForm({ atual: '', nova: '', confirmar: '' })
    setSucesso(true)
  }

  function encerrarSessao(id) {
    setSessoes((anteriores) => anteriores.filter((sessao) => sessao.id !== id))
  }

  return (
    <div className="perfil__painel">
      <section className="perfil__grupo">
        <h3 className="perfil__grupo-titulo">Alterar senha</h3>
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Senha atual"
            type="password"
            name="atual"
            value={form.atual}
            onChange={atualizar('atual')}
            error={erros.atual}
          />
          <InputField
            label="Nova senha"
            type="password"
            name="nova"
            value={form.nova}
            onChange={atualizar('nova')}
            error={erros.nova}
          />
          <InputField
            label="Confirmar nova senha"
            type="password"
            name="confirmar"
            value={form.confirmar}
            onChange={atualizar('confirmar')}
            error={erros.confirmar}
          />
          <div className="perfil__acoes">
            <Botao type="submit">Atualizar senha</Botao>
            {sucesso && (
              <span className="perfil__sucesso">Senha atualizada com sucesso!</span>
            )}
          </div>
        </form>
      </section>

      <section className="perfil__grupo">
        <h3 className="perfil__grupo-titulo">Autenticação em duas etapas</h3>
        <Interruptor
          label="Ativar verificação em duas etapas"
          descricao="Pediremos um código extra ao entrar em um novo dispositivo."
          ativo={doisFatores}
          onChange={setDoisFatores}
        />
        {doisFatores && (
          <p className="perfil__aviso">
            Verificação em duas etapas ativada. Você receberá um código por
            e-mail a cada novo acesso.
          </p>
        )}
      </section>

      <section className="perfil__grupo">
        <h3 className="perfil__grupo-titulo">Sessões ativas</h3>
        {sessoes.length === 0 ? (
          <p className="perfil__sessoes-vazio">Nenhuma outra sessão ativa.</p>
        ) : (
          <ul className="perfil__sessoes">
            {sessoes.map((sessao) => (
              <li key={sessao.id} className="perfil__sessao">
                <div className="perfil__sessao-info">
                  <span className="perfil__sessao-dispositivo">
                    {sessao.dispositivo}
                  </span>
                  <span className="perfil__sessao-local">{sessao.local}</span>
                </div>
                {sessao.atual ? (
                  <span className="badge badge--verde">Sessão atual</span>
                ) : (
                  <button
                    type="button"
                    className="perfil__sessao-sair"
                    onClick={() => encerrarSessao(sessao.id)}
                  >
                    Encerrar
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="perfil__grupo">
        <h3 className="perfil__grupo-titulo">Conta</h3>
        <div className="perfil__conta-acoes">
          <button
            type="button"
            className="perfil__botao-secundario"
            onClick={sairDaConta}
          >
            Sair da conta
          </button>
          <button
            type="button"
            className="perfil__botao-secundario"
            onClick={sairDaConta}
          >
            Trocar de conta
          </button>
        </div>

        <div className="perfil__zona-perigo">
          {confirmandoExclusao ? (
            <div className="perfil__confirmar">
              <p className="perfil__confirmar-texto">
                Tem certeza? Esta ação é permanente e não pode ser desfeita.
              </p>
              <div className="perfil__confirmar-acoes">
                <button
                  type="button"
                  className="perfil__botao-perigo"
                  onClick={sairDaConta}
                >
                  Sim, excluir minha conta
                </button>
                <button
                  type="button"
                  className="perfil__botao-secundario"
                  onClick={() => setConfirmandoExclusao(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="perfil__botao-perigo"
              onClick={() => setConfirmandoExclusao(true)}
            >
              Excluir conta
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
