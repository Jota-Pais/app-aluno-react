import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import { useUsuario } from '../context/UsuarioContext'
import './AuthPages.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState({})
  const { login } = useUsuario()
  const navigate = useNavigate()

  function validar() {
    const novos = {}
    if (!email.trim()) {
      novos.email = 'Informe seu e-mail.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      novos.email = 'E-mail inválido.'
    }
    if (!senha) {
      novos.senha = 'Informe sua senha.'
    }
    return novos
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    const novosErros = validar()
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    // Login simulado: guarda o usuário no Context e vai para o Dashboard.
    login({ email })
    navigate('/dashboard')
  }

  return (
    <AuthLayout>
      <h1>Bem-vindo de volta</h1>
      <p className="auth__intro">
        Por favor, insira suas credenciais para acessar seu painel acadêmico.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Endereço de e-mail"
          name="email"
          type="email"
          placeholder="user@email.com"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          error={erros.email}
        />
        <InputField
          label={
            <>
              Senha <Link to="/esqueci-senha">Esqueceu?</Link>
            </>
          }
          name="senha"
          type="password"
          value={senha}
          onChange={(evento) => setSenha(evento.target.value)}
          error={erros.senha}
        />
        <Botao type="submit">Entrar</Botao>
      </form>

      <p className="auth__rodape">
        Não tem uma conta? <Link to="/cadastro">Registre-se agora.</Link>
      </p>
    </AuthLayout>
  )
}
