const URL_BASE = 'https://jsonplaceholder.typicode.com/posts';

// 1. Função para pedir à IA (Gemini)
export async function pedirParaIA(pergunta, disciplinaNome = "") {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: "Você é o Assistente Virtual de um App focado no aprendizado dos usuario (estudantes/alunos), seu papel é exercer o trabalho de um tutor focado a apoiar e auxiliar estudantes em seus estudos e desafios estudantis. Seu papel é explicar conceitos acadêmicos de forma didática, ajudar a organizar rotinas de estudo e responder dúvidas sobre disciplinas. Mantenha um tom didatico, claro, que se baseia na linguagem que o estudante usa contigo (se falar de forma mais formal responda de forma formal, se o estudante falar de forma informal em uma linguagem 'popular' responda de acordo) e objetivo. Nunca apresente respostas prontas sem explicaçao prévia ou sem um contexto definido, sempre busque ser mais claro e prestativo. Sempre que possível, sugira técnicas de produtividade como Pomodoro ou outras que sejam reconhecidas como efetivas ou eficazes de acordo com pesquisas e artigos mundialmente conhecidos consolidados e confiaveis de acordo com os mais renomados pedagogos, para ajudar o aluno a se organizar ao mesmo tempo em que o orienta." }]
      },
      contents: [{
        parts: [{ text: `Pergunta: ${pergunta}. Disciplina foco: ${disciplinaNome}` }]
      }],
      generationConfig: {
        maxOutputTokens: 1000, //limita o uso de tokens
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) throw new Error("Erro ao conectar com a IA");

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// 2. Busca material externo (JSONPlaceholder)
export async function buscarMaterial() {
  const id = Math.floor(Math.random() * 100) + 1;
  const resposta = await fetch(`${URL_BASE}/${id}`);
  
  if (!resposta.ok) {
    throw new Error(`Falha ao consultar material extra (HTTP ${resposta.status})`);
  }

  const dados = await resposta.json();
  return { titulo: dados.title, corpo: dados.body };
}

// 3. Boas-vindas
export function montarBoasVindas(material) {
  const ideia = material.corpo.split('.')[0].trim();
  return [
    'Olá! 👋 Sou o Tutor IA, seu assistente de estudos. Posso explicar conteúdos, ajudar a organizar a rotina e tirar dúvidas.',
    `💡 Pensamento do dia: "${ideia}."`,
  ].join('\n\n');
}