import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="naoencontrada">
      <h1>404</h1>
      <p>A página que você procura não existe.</p>
      <Link to="/">Voltar para o login</Link>
    </div>
  )
}
