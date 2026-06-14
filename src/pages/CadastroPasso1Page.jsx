import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import './AuthPages.css'

export default function CadastroPasso1Page() {
  const [cpf, setCpf] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  function handleSubmit(evento) {
    evento.preventDefault()

    const apenasDigitos = cpf.replace(/\D/g, '')
    if (!cpf.trim()) {
      setErro('Informe seu CPF.')
      return
    }
    if (apenasDigitos.length !== 11) {
      setErro('O CPF deve ter 11 dígitos.')
      return
    }

    setErro('')
    // Leva o CPF para o passo 2 via state da navegação.
    navigate('/cadastro/dados', { state: { cpf } })
  }

  return (
    <AuthLayout>
      <h1>Cadastre-se</h1>
      <p className="auth__intro">
        Passo 1 de 2. Por favor, insira seu CPF para prosseguir.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="CPF"
          name="cpf"
          type="text"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(evento) => setCpf(evento.target.value)}
          error={erro}
        />
        <Botao type="submit">Prosseguir</Botao>
      </form>

      <p className="auth__rodape">
        Já tem uma conta? <Link to="/">Entrar.</Link>
      </p>
    </AuthLayout>
  )
}
