import './Card.css'

// Componente "container": qualquer conteúdo entra via children.
export default function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>
}
