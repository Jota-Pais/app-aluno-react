// Serviço de consumo da API pública do GitHub.
// Busca o perfil pelo nome de usuário (endpoint visto em aula:
// GET https://api.github.com/users/{login}).
const API = 'https://api.github.com'
const ACEITA_JSON = { Accept: 'application/vnd.github+json' }

export async function buscarUsuarioGithub(usuario) {
  const login = usuario.trim()
  if (!login) {
    throw new Error('Informe o usuário do GitHub.')
  }

  const resposta = await fetch(`${API}/users/${encodeURIComponent(login)}`, {
    headers: ACEITA_JSON,
  })
  if (resposta.status === 404) {
    throw new Error('Usuário do GitHub não encontrado.')
  }
  if (!resposta.ok) {
    throw new Error(`Falha ao buscar o perfil (HTTP ${resposta.status}).`)
  }

  return resposta.json()
}
