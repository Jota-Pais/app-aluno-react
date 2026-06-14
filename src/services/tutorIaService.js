// Serviço de consumo de API do Tutor IA.
// A resposta da IA é simulada buscando um "post" na JSONPlaceholder e
// usando seu conteúdo como texto da resposta. A checagem de res.ok fica aqui;
// os estados de carregando/erro/dados são tratados no componente da página.
const URL_BASE = 'https://jsonplaceholder.typicode.com/posts'

export async function buscarRespostaTutor(pergunta) {
  // Deriva um id entre 1 e 100 a partir da pergunta, só para variar a resposta.
  const id = (pergunta.length % 100) + 1

  const resposta = await fetch(`${URL_BASE}/${id}`)

  if (!resposta.ok) {
    throw new Error(`Falha ao consultar o Tutor IA (HTTP ${resposta.status})`)
  }

  const dados = await resposta.json()
  return dados.body
}
