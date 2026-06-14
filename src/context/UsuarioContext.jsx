/* Provider e hook ficam juntos (padrão didático de Context API). A regra
   abaixo é só sobre HMR/fast-refresh, não afeta o funcionamento. */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const UsuarioContext = createContext(null)

// Dados padrão do aluno (refletem a tela de Perfil de referência).
// A autenticação é simulada: não há backend, o usuário fica só no estado.
const USUARIO_PADRAO = {
  nome: 'João Silva',
  nomePreferencia: 'Jonh',
  email: 'joao.silva@satc.edu.br',
  cpf: '***.***.***-89',
  telefone: '',
  curso: 'Engenharia de Software',
  ano: '3º Ano',
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
    setUsuario({ ...USUARIO_PADRAO, ...informados })
  }

  function logout() {
    setUsuario(null)
  }

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
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
