import './Card.css'

// Componente "container": qualquer conteúdo entra via children.
// Repassa props extras (ex.: onClick) para o elemento raiz.
export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  )
}
