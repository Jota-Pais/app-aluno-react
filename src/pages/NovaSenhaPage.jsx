import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import './AuthPages.css'

export default function NovaSenhaPage() {
  const [senha, setSenha] = useState('')
  const [repitaSenha, setRepitaSenha] = useState('')
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  function validar() {
    const novos = {}
    if (!senha) {
      novos.senha = 'Informe a nova senha.'
    } else if (senha.length < 6) {
      novos.senha = 'A senha deve ter ao menos 6 caracteres.'
    }
    if (repitaSenha !== senha) {
      novos.repitaSenha = 'As senhas não conferem.'
    }
    return novos
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    const novosErros = validar()
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) {
      setSalvo(false)
      return
    }
    setSalvo(true)
  }

  return (
    <AuthLayout>
      <h1>Nova senha</h1>
      <p className="auth__intro">Informe abaixo sua nova senha.</p>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Senha"
          name="senha"
          type="password"
          value={senha}
          onChange={(evento) => setSenha(evento.target.value)}
          error={erros.senha}
        />
        <InputField
          label="Repita a senha"
          name="repitaSenha"
          type="password"
          value={repitaSenha}
          onChange={(evento) => setRepitaSenha(evento.target.value)}
          error={erros.repitaSenha}
        />
        <Botao type="submit">Salvar</Botao>
      </form>

      {salvo && (
        <p className="auth__sucesso">
          Senha redefinida com sucesso! Você já pode acessar sua conta.
        </p>
      )}

      <Link className="auth__voltar" to="/">
        ← Voltar para o login
      </Link>
    </AuthLayout>
  )
}
