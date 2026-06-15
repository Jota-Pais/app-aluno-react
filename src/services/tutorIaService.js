// Serviço do Tutor IA.
// A resposta do tutor combina duas coisas: uma explicação local (curada por
// tema) e um "material de referência" buscado em uma API externa
// (JSONPlaceholder). Assim a tela continua consumindo dados de uma API de
// verdade, mas o que o aluno lê deixa de ser só texto aleatório.
//
// O fetch fica isolado em `buscarMaterial`; a checagem de `res.ok` é feita
// aqui e os estados de carregando/erro/dados são tratados na página.
const URL_BASE = 'https://jsonplaceholder.typicode.com/posts'

// Base de conhecimento simples: casa palavras-chave da pergunta (ou da
// disciplina em foco) com uma explicação curada e útil. Mantém o tutor
// prestativo mesmo sem uma IA real por trás.
const RESPOSTAS = [
  {
    temas: ['cálculo', 'calculo', 'integral', 'derivada', 'limite', 'função', 'funcao'],
    resposta:
      'Em Cálculo, a ideia central é entender taxas de variação (derivadas) e acúmulo (integrais). ' +
      'Domine primeiro os limites, depois pratique as derivadas das funções básicas e só então parta ' +
      'para as técnicas de integração. Resolver muitos exercícios passo a passo rende mais do que decorar fórmulas.',
  },
  {
    temas: ['estatística', 'estatistica', 'probabilidade', 'média', 'media', 'desvio', 'distribuição', 'distribuicao', 'amostra'],
    resposta:
      'Em Estatística, separe o que é descritiva (média, mediana, desvio padrão) do que é inferência ' +
      '(tirar conclusões a partir de uma amostra). A pergunta-guia é sempre "o que esses dados estão me dizendo?". ' +
      'Montar gráficos antes de aplicar fórmulas ajuda muito a enxergar os padrões.',
  },
  {
    temas: ['react', 'front', 'frontend', 'front-end', 'componente', 'hook', 'usestate', 'useeffect', 'css', 'javascript', 'html'],
    resposta:
      'No Front-end com React, pense em tudo como componentes pequenos e reutilizáveis: eles recebem dados ' +
      'via props e guardam estado com useState. Quando precisar reagir a algo (buscar dados, timers), use ' +
      'useEffect com a lista de dependências certa. Construir das peças menores para as telas deixa o código bem mais organizado.',
  },
  {
    temas: ['banco', 'sql', 'consulta', 'query', 'tabela', 'índice', 'indice', 'transação', 'transacao'],
    resposta:
      'Em Banco de Dados, uma boa consulta começa por entender o modelo: quais tabelas existem e como se ' +
      'relacionam. Pratique SELECTs com JOIN e filtros antes de partir para otimização com índices, e teste ' +
      'sempre em um conjunto pequeno de dados primeiro.',
  },
  {
    temas: ['criatividade', 'inovação', 'inovacao', 'design', 'ideia', 'protótipo', 'prototipo', 'negócio', 'negocio'],
    resposta:
      'Criatividade e Inovação não é esperar a inspiração cair — é método. O Design Thinking propõe entender ' +
      'a fundo o problema das pessoas, gerar muitas ideias sem julgar, prototipar rápido e testar. Errar cedo e barato faz parte.',
  },
  {
    temas: ['prova', 'estudar', 'estudo', 'organizar', 'organização', 'organizacao', 'foco', 'revisar', 'revisão', 'revisao', 'cronograma', 'tempo'],
    resposta:
      'Para render nos estudos, divida o conteúdo em blocos curtos e revise de forma espaçada (hoje, em 2 dias, ' +
      'em 1 semana) em vez de virar a noite antes da prova. Técnicas como Pomodoro (25 min focado, 5 de pausa) e ' +
      'tentar explicar a matéria em voz alta ajudam a fixar de verdade.',
  },
]

const PADRAO =
  'Boa pergunta! Vamos destrinchar isso juntos. Tente quebrar o problema em partes menores e atacar uma de ' +
  'cada vez — quase sempre o que parece complicado é só uma sequência de passos simples. Me dê mais detalhes que a gente se aprofunda.'

const ABERTURAS = [
  'Ótima pergunta!',
  'Boa, vamos nessa!',
  'Entendi sua dúvida.',
  'Legal você perguntar isso.',
]

const FECHOS = [
  'Quer que eu detalhe algum ponto específico?',
  'Se quiser, posso dar um exemplo prático.',
  'Faz sentido? Posso aprofundar se precisar.',
  'Manda outra dúvida quando quiser!',
]

// Consome a API externa e devolve o material bruto (título + corpo).
// Lança erro se a resposta não vier ok, para a página tratar no catch.
export async function buscarMaterial() {
  const id = Math.floor(Math.random() * 100) + 1

  const resposta = await fetch(`${URL_BASE}/${id}`)

  if (!resposta.ok) {
    throw new Error(`Falha ao consultar o Tutor IA (HTTP ${resposta.status})`)
  }

  const dados = await resposta.json()
  return { titulo: dados.title, corpo: dados.body }
}

function explicacaoPara(texto) {
  const busca = texto.toLowerCase()
  const item = RESPOSTAS.find((r) => r.temas.some((tema) => busca.includes(tema)))
  return item ? item.resposta : PADRAO
}

// Monta a resposta exibida: abertura contextual + explicação curada +
// material de referência da API + um fecho convidando a continuar.
export function montarResposta(pergunta, disciplina, material) {
  const busca = `${pergunta} ${disciplina ? disciplina.nome : ''}`
  const explicacao = explicacaoPara(busca)
  const abertura = disciplina
    ? `📌 Sobre ${disciplina.nome}:`
    : ABERTURAS[pergunta.length % ABERTURAS.length]
  const fecho = FECHOS[pergunta.length % FECHOS.length]

  return [
    `${abertura} ${explicacao}`,
    `📚 Material de referência — "${material.titulo}":\n${material.corpo}`,
    fecho,
  ].join('\n\n')
}

// Mensagem de boas-vindas: usa o material da API como "pensamento do dia",
// mantendo o consumo de dados visível já no carregamento da tela.
export function montarBoasVindas(material) {
  const ideia = material.corpo.split('.')[0].trim()

  return [
    'Olá! 👋 Sou o Tutor IA, seu assistente de estudos. Posso explicar conteúdos das suas disciplinas, ajudar a organizar a rotina e tirar dúvidas.',
    'Use o 📎 ao lado do campo para focar numa disciplina específica, ou toque em uma das sugestões abaixo para começar.',
    `💡 Pensamento do dia: "${ideia}."`,
  ].join('\n\n')
}
