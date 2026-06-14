// Ícones em SVG inline (sem biblioteca externa). Usam currentColor,
// então herdam a cor do texto — útil para o estado ativo do menu.

function base(props) {
  return {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    ...props,
  }
}

export function IconePainel(props) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

export function IconeDisciplinas(props) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z" />
      <path d="M18 16H7a2 2 0 0 0-2 2" />
    </svg>
  )
}

export function IconeTutor(props) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 4v4" />
      <circle cx="12" cy="3" r="1" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="15" cy="14" r="1" />
    </svg>
  )
}

export function IconePerfil(props) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  )
}

export function IconeRelogio(props) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function IconeTarefas(props) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  )
}

export function IconeChat(props) {
  return (
    <svg {...base(props)}>
      <path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-4.3A8 8 0 1 1 21 11.5z" />
    </svg>
  )
}

export function IconeSeta(props) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function IconeEnviar(props) {
  return (
    <svg {...base(props)}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  )
}

export function IconeClipe(props) {
  return (
    <svg {...base(props)}>
      <path d="M21 12.5 12.5 21a5 5 0 0 1-7-7L14 5.5a3.3 3.3 0 1 1 4.7 4.7l-8.5 8.5a1.6 1.6 0 0 1-2.3-2.3l7.8-7.8" />
    </svg>
  )
}

export function IconeSom(props) {
  return (
    <svg {...base(props)}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a9 9 0 0 1 0 14" />
    </svg>
  )
}

export function IconeCopiar(props) {
  return (
    <svg {...base(props)}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export function IconeRefazer(props) {
  return (
    <svg {...base(props)}>
      <path d="M21 12a9 9 0 1 1-2.6-6.4" />
      <path d="M21 3v6h-6" />
    </svg>
  )
}

export function IconeNegativo(props) {
  return (
    <svg {...base(props)}>
      <path d="M17 14V3" />
      <path d="M9 18.1 10 14H4.2a2 2 0 0 1-2-2.5l2-7A2 2 0 0 1 6.2 3H20a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3a2 2 0 0 0-1.8 1.1L12 21a3 3 0 0 1-3-2.9z" />
    </svg>
  )
}

export function IconeCheck(props) {
  return (
    <svg {...base(props)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
