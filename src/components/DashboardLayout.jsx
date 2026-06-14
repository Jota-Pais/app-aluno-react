import { Outlet } from 'react-router-dom'
import Header from './Header'
import './DashboardLayout.css'

// Casca das telas internas: cabeçalho fixo + conteúdo da rota atual (Outlet).
export default function DashboardLayout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__conteudo">
        <Outlet />
      </main>
    </div>
  )
}
