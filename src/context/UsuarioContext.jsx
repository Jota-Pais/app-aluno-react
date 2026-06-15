/* Provider e hook ficam juntos (padrão didático de Context API). A regra
   abaixo é só sobre HMR/fast-refresh, não afeta o funcionamento. */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const UsuarioContext = createContext(null)

// Dados padrão do aluno (refletem a tela de Perfil de referência).
// A autenticação é simulada: não há backend, o usuário fica só no estado.
const USUARIO_PADRAO = {
  nome: 'João Silva',
  nomePreferencia: '', // começa igual ao nome (definido no login), até o usuário mudar
  email: 'joao.silva@satc.edu.br',
  cpf: '***.***.***-89',
  telefone: '',
  curso: 'Engenharia de Software',
  ano: '3º Ano',
  foto: '', // data URL (upload) ou avatar_url do GitHub
  github: null, // dados puxados da conta do GitHub, quando conectada
}

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  // Login/cadastro chamam essa função: mescla os dados informados
  // sobre o padrão e marca o usuário como autenticado.
  function login(dados = {}) {
    const informados = {}
    for (const chave in dados) {
      if (dados[chave] !== undefined && dados[chave] !== '') {
        informados[chave] = dados[chave]
      }
    }
    const novoUsuario = { ...USUARIO_PADRAO, ...informados }
    // Por padrão, o nome de preferência começa igual ao nome — até o usuário trocar.
    if (!novoUsuario.nomePreferencia) {
      novoUsuario.nomePreferencia = novoUsuario.nome
    }
    setUsuario(novoUsuario)
  }

  function logout() {
    setUsuario(null)
  }

  // Atualiza campos do usuário logado (ex.: editar o nome de preferência),
  // preservando os demais dados.
  function atualizarUsuario(dados) {
    setUsuario((atual) => ({ ...atual, ...dados }))
  }

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout, atualizarUsuario }}>
      {children}
    </UsuarioContext.Provider>
  )
}

export function useUsuario() {
  const contexto = useContext(UsuarioContext)
  if (!contexto) {
    throw new Error('useUsuario precisa ser usado dentro de um UsuarioProvider')
  }
  return contexto
}

// Primeiro nome que o app usa para se dirigir ao usuário: vem do nome de
// preferência (ou do nome), e cai para "Aluno" se nada estiver definido.
export function nomeDeExibicao(usuario) {
  const base = (usuario.nomePreferencia || '').trim() || usuario.nome || ''
  return base.split(' ')[0] || 'Aluno'
}
