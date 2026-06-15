import { useState } from 'react'
import Interruptor from './Interruptor'
import Botao from './Botao'
import { useTema } from '../context/TemaContext'

// Opções do seletor de tema (rótulo exibido × valor aplicado no <html>).
const OPCOES_TEMA = [
  { valor: 'claro', rotulo: 'Claro' },
  { valor: 'escuro', rotulo: 'Escuro' },
  { valor: 'automatico', rotulo: 'Automático (sistema)' },
]

// Aba "Configurações" do Perfil: notificações e preferências da conta.
// Todos os campos são controlados; "Salvar" confirma com uma mensagem.
// O tema é aplicado na hora (vem do TemaContext, não do estado local).
export default function PerfilConfiguracoes() {
  const { tema, setTema } = useTema()
  const [config, setConfig] = useState({
    emailNotif: true,
    pushNotif: false,
    resumoSemanal: true,
    idioma: 'Português (Brasil)',
  })
  const [salvo, setSalvo] = useState(false)

  function atualizar(campo, valor) {
    setConfig((anterior) => ({ ...anterior, [campo]: valor }))
    setSalvo(false)
  }

  function salvar(evento) {
    evento.preventDefault()
    setSalvo(true)
  }

  return (
    <form className="perfil__painel" onSubmit={salvar}>
      <section className="perfil__grupo">
        <h3 className="perfil__grupo-titulo">Notificações</h3>
        <Interruptor
          label="Notificações por e-mail"
          descricao="Receba avisos de notas e prazos no seu e-mail."
          ativo={config.emailNotif}
          onChange={(valor) => atualizar('emailNotif', valor)}
        />
        <Interruptor
          label="Notificações push"
          descricao="Alertas em tempo real no navegador."
          ativo={config.pushNotif}
          onChange={(valor) => atualizar('pushNotif', valor)}
        />
        <Interruptor
          label="Resumo semanal"
          descricao="Um panorama dos seus estudos toda segunda-feira."
          ativo={config.resumoSemanal}
          onChange={(valor) => atualizar('resumoSemanal', valor)}
        />
      </section>

      <section className="perfil__grupo">
        <h3 className="perfil__grupo-titulo">Preferências</h3>
        <div className="perfil__campo">
          <label htmlFor="tema">Tema</label>
          <select
            id="tema"
            className="perfil__select"
            value={tema}
            onChange={(evento) => setTema(evento.target.value)}
          >
            {OPCOES_TEMA.map((opcao) => (
              <option key={opcao.valor} value={opcao.valor}>
                {opcao.rotulo}
              </option>
            ))}
          </select>
        </div>
        <div className="perfil__campo">
          <label htmlFor="idioma">Idioma</label>
          <select
            id="idioma"
            className="perfil__select"
            value={config.idioma}
            onChange={(evento) => atualizar('idioma', evento.target.value)}
          >
            <option>Português (Brasil)</option>
            <option>English</option>
            <option>Español</option>
          </select>
        </div>
      </section>

      <div className="perfil__acoes">
        <Botao type="submit">Salvar preferências</Botao>
        {salvo && <span className="perfil__sucesso">Preferências salvas!</span>}
      </div>
    </form>
  )
}
