import './Botao.css'

// Botão reutilizável. Repassa props (type, onClick, disabled...) e
// renderiza o conteúdo passado via children (texto, ícone, etc.).
export default function Botao({ children, className = '', ...props }) {
  return (
    <button className={`botao ${className}`} {...props}>
      {children}
    </button>
  )
}
