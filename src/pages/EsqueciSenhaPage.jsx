import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import './AuthPages.css'

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState('')
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(evento) {
    evento.preventDefault()

    if (!email.trim()) {
      setErro('Informe seu e-mail.')
      setEnviado(false)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErro('E-mail inválido.')
      setEnviado(false)
      return
    }

    setErro('')
    setEnviado(true)
  }

  return (
    <AuthLayout>
      <h1>Esqueci minha senha</h1>
      <p className="auth__intro">
        Informe seu e-mail para enviarmos o link para redefinir sua senha.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Endereço de e-mail"
          name="email"
          type="email"
          placeholder="user@email.com"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          error={erro}
        />
        <Botao type="submit">Enviar</Botao>
      </form>

      {enviado && (
        <p className="auth__sucesso">
          Enviamos um link de recuperação para <strong>{email}</strong>.
        </p>
      )}

      <Link className="auth__voltar" to="/">
        ← Voltar para o login
      </Link>
    </AuthLayout>
  )
}
