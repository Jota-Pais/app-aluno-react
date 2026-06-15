# App Aluno — React (SPA)

Portabilidade do **App Aluno** (originalmente em HTML, CSS e JavaScript puro) para uma
**Single Page Application em React**, mantendo funcionalidade equivalente à versão original.

Trabalho final (N3) da disciplina de Front-end — Engenharia de Software / SATC.

## Tecnologias

- [Vite](https://vite.dev/) + React (JavaScript)
- [react-router-dom](https://reactrouter.com/) para o roteamento SPA
- CSS próprio (sem framework de estilos)

## Como executar

Pré-requisito: **Node.js 20.19+ (ou 22.12+)** instalado — exigência do Vite 8.

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar em modo de desenvolvimento
npm run dev
```

A aplicação fica disponível em `http://localhost:5173` (se a porta estiver ocupada,
o Vite escolhe a próxima livre e mostra a URL no terminal).

Outros comandos úteis:

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve o build de produção localmente
npm run lint      # roda o ESLint
```

> **Login:** a autenticação é **simulada** (não há backend). Basta informar um e-mail
> válido e uma senha para entrar; também é possível criar a conta pelo fluxo de cadastro.

## Funcionalidades

**Fluxo de autenticação**
- Login, Recuperar senha, Nova senha e Cadastro (passo 1 — CPF; passo 2 — dados).
- Formulários controlados com validação e mensagens de erro na tela.
- Após o login, redireciona para o Dashboard.

**Telas internas (SPA)**
- **Dashboard** — saudação personalizada por horário (usa o nome escolhido pelo usuário),
  cursos em andamento (derivados das disciplinas) e indicadores.
- **Disciplinas** — lista renderizada a partir de uma coleção de dados, com tela de detalhe.
- **Perfil** — três abas:
  - *Dados Pessoais*: dados do usuário, edição do **nome de preferência**, **foto de perfil**
    (upload) e **conexão com o GitHub** (puxa foto e nome pelo nome de usuário); CPF/matrícula
    ocultável (mostrar/ocultar).
  - *Configurações*: notificações e **tema claro/escuro**.
  - *Segurança*: troca de senha (validada), verificação em duas etapas, sessões ativas e
    ações de conta (sair / trocar / excluir).
- **Tutor IA** — chat que consome uma API externa e trata os estados de carregando / erro /
  dados; tem sugestões de perguntas, foco por disciplina e ações por resposta (ouvir, copiar,
  refazer).
- Menu com indicação visual da rota ativa e botão de sair.
- **Tema claro/escuro** aplicado a toda a interface (com opção "automático", que segue o sistema).

## Estrutura do projeto

```
src/
├── components/   # Componentes reutilizáveis (InputField, Botao, Card, Header, Avatar, Interruptor, ...)
├── pages/        # Telas/rotas (LoginPage, DashboardPage, ...)
├── context/      # UsuarioContext.jsx (usuário) e TemaContext.jsx (tema claro/escuro)
├── services/     # tutorIaService.js e githubService.js (fetch) e disciplinas.js (dados locais)
├── App.jsx       # Definição das rotas
├── main.jsx      # Ponto de entrada + TemaProvider e UsuarioProvider
└── index.css     # Estilos globais, variáveis de cor e tema escuro
```

## Conceitos de React aplicados

- **Componentização** com props e `children` (`Card`, `AuthLayout`, `Botao`, ...).
- **Hooks** `useState` e `useEffect` (ex.: relógio do Dashboard com `setInterval` e limpeza).
- **Formulários controlados** (`value` + `onChange`) com validação.
- **Renderização condicional** (`&&` / ternário) para erros e estados.
- **Renderização de listas** com `.map()` e prop `key` (Disciplinas, Dashboard).
- **React Router**: `BrowserRouter`, `Routes`, `Route`, `NavLink` e `useNavigate`.
- **Context API** para compartilhar o usuário e o tema entre as telas, sem prop drilling.
- **Consumo de API com `fetch`** usando `try` / `catch` / `finally` e checagem de `res.ok`
  (duas APIs: JSONPlaceholder no Tutor IA e GitHub no Perfil).
- **Estilização** com `className` + arquivos `.css`, responsiva (desktop e mobile) e com tema claro/escuro.
