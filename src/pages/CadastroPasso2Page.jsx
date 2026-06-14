import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import { useUsuario } from '../context/UsuarioContext'
import './AuthPages.css'

export default function CadastroPasso2Page() {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    senha: '',
  })
  const [erros, setErros] = useState({})
  const { login } = useUsuario()
  const navigate = useNavigate()
  const location = useLocation()

  // CPF informado no passo 1 (pode ser indefinido se o usuário pulou a etapa).
  const cpf = location.state?.cpf

  function atualizar(campo) {
    return (evento) => setForm({ ...form, [campo]: evento.target.value })
  }

  function validar() {
    const novos = {}
    if (!form.nome.trim()) novos.nome = 'Informe seu nome.'
    if (!form.email.trim()) {
      novos.email = 'Informe seu e-mail.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      novos.email = 'E-mail inválido.'
    }
    if (!form.senha) {
      novos.senha = 'Crie uma senha.'
    } else if (form.senha.length < 6) {
      novos.senha = 'A senha deve ter ao menos 6 caracteres.'
    }
    return novos
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    const novosErros = validar()
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    // Cadastro simulado: cria o usuário no Context e entra no Dashboard.
    login({
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      cpf,
    })
    navigate('/dashboard')
  }

  return (
    <AuthLayout>
      <h1>Cadastre-se</h1>
      <p className="auth__intro">
        Passo 2 de 2. Por favor, insira seus dados para finalizar.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Nome"
          name="nome"
          type="text"
          placeholder="Nome completo"
          value={form.nome}
          onChange={atualizar('nome')}
          error={erros.nome}
        />
        <InputField
          label="Telefone"
          name="telefone"
          type="tel"
          placeholder="(99) 99999-9999"
          value={form.telefone}
          onChange={atualizar('telefone')}
        />
        <InputField
          label="E-mail"
          name="email"
          type="email"
          placeholder="user@email.com"
          value={form.email}
          onChange={atualizar('email')}
          error={erros.email}
        />
        <InputField
          label="Senha"
          name="senha"
          type="password"
          value={form.senha}
          onChange={atualizar('senha')}
          error={erros.senha}
        />
        <Botao type="submit">Cadastrar</Botao>
      </form>

      <p className="auth__rodape">
        Quer voltar? <Link to="/cadastro">Passo anterior.</Link>
      </p>
    </AuthLayout>
  )
}
