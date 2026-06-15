import { useState } from 'react'
import { useUsuario } from '../context/UsuarioContext'
import Botao from './Botao'

// Esconde o CPF/matrícula trocando os dígitos por bullets.
function censurarCpf(cpf) {
  return cpf.replace(/\d/g, '•')
}

// Aba "Dados Pessoais" do Perfil. O nome de preferência é editável: ao salvar,
// o novo valor vai para o Context e reflete em qualquer tela que o use.
export default function PerfilDados() {
  const { usuario, atualizarUsuario } = useUsuario()
  const [editando, setEditando] = useState(false)
  const [rascunho, setRascunho] = useState(usuario.nomePreferencia)
  const [mostrarCpf, setMostrarCpf] = useState(false)

  function abrirEdicao() {
    setRascunho(usuario.nomePreferencia)
    setEditando(true)
  }

  function salvar(evento) {
    evento.preventDefault()
    const novo = rascunho.trim()
    if (novo) atualizarUsuario({ nomePreferencia: novo })
    setEditando(false)
  }

  const linhas = [
    { rotulo: 'Nome Completo', valor: usuario.nome },
    { rotulo: 'Nome de Preferência', editavel: true },
    { rotulo: 'Endereço de E-mail', valor: usuario.email },
    { rotulo: 'Matrícula / CPF', cpf: true },
    {
      rotulo: 'Número de Telefone',
      valor: usuario.telefone || 'Não fornecido',
      vazio: !usuario.telefone,
    },
  ]

  return (
    <div className="perfil__lista">
      {linhas.map((linha) => (
        <div key={linha.rotulo} className="perfil__linha">
          <span className="perfil__rotulo">{linha.rotulo}</span>

          {linha.editavel ? (
            editando ? (
              <form className="perfil__editar" onSubmit={salvar}>
                <input
                  className="perfil__editar-input"
                  value={rascunho}
                  onChange={(evento) => setRascunho(evento.target.value)}
                  placeholder="Aluno"
                  autoFocus
                />
                <Botao type="submit">Salvar</Botao>
                <button
                  type="button"
                  className="perfil__editar-cancelar"
                  onClick={() => setEditando(false)}
                >
                  Cancelar
                </button>
              </form>
            ) : (
              <span className="perfil__valor perfil__valor--editavel">
                {usuario.nomePreferencia || 'Aluno'}
                <button
                  type="button"
                  className="perfil__editar-abrir"
                  onClick={abrirEdicao}
                >
                  Editar
                </button>
              </span>
            )
          ) : linha.cpf ? (
            <span className="perfil__valor perfil__valor--acao">
              <span>{mostrarCpf ? usuario.cpf : censurarCpf(usuario.cpf)}</span>
              <button
                type="button"
                className="perfil__revelar"
                onClick={() => setMostrarCpf((valor) => !valor)}
              >
                {mostrarCpf ? 'Ocultar' : 'Mostrar'}
              </button>
            </span>
          ) : (
            <span
              className={`perfil__valor ${
                linha.vazio ? 'perfil__valor--vazio' : ''
              }`}
            >
              {linha.valor}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
