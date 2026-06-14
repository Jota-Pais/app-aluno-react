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
- **Dashboard** — saudação personalizada por horário, cursos em andamento e indicadores.
- **Disciplinas** — lista renderizada a partir de uma coleção de dados.
- **Perfil** — dados do usuário logado, com abas.
- **Tutor IA** — chat que consome uma API externa e trata os estados de
  carregando / erro / dados.
- Menu com indicação visual da rota ativa e botão de sair.

## Estrutura do projeto

```
src/
├── components/   # Componentes reutilizáveis (InputField, Botao, Card, Header, ...)
├── pages/        # Telas/rotas (LoginPage, DashboardPage, ...)
├── context/      # UsuarioContext.jsx — dados do usuário (Context API)
├── services/     # tutorIaService.js (fetch) e disciplinas.js (dados locais)
├── App.jsx       # Definição das rotas
├── main.jsx      # Ponto de entrada + UsuarioProvider
└── index.css     # Estilos globais e variáveis de cor
```

## Conceitos de React aplicados

- **Componentização** com props e `children` (`Card`, `AuthLayout`, `Botao`, ...).
- **Hooks** `useState` e `useEffect` (ex.: relógio do Dashboard com `setInterval` e limpeza).
- **Formulários controlados** (`value` + `onChange`) com validação.
- **Renderização condicional** (`&&` / ternário) para erros e estados.
- **Renderização de listas** com `.map()` e prop `key` (Disciplinas, Dashboard).
- **React Router**: `BrowserRouter`, `Routes`, `Route`, `NavLink` e `useNavigate`.
- **Context API** para compartilhar os dados do usuário sem prop drilling.
- **Consumo de API com `fetch`** usando `try` / `catch` / `finally` e checagem de `res.ok`.
- **Estilização** com `className` + arquivos `.css`, responsiva (desktop e mobile).
