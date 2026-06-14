import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import EsqueciSenhaPage from './pages/EsqueciSenhaPage'
import NovaSenhaPage from './pages/NovaSenhaPage'
import CadastroPasso1Page from './pages/CadastroPasso1Page'
import CadastroPasso2Page from './pages/CadastroPasso2Page'
import DashboardPage from './pages/DashboardPage'
import DisciplinasPage from './pages/DisciplinasPage'
import DisciplinaDetalhePage from './pages/DisciplinaDetalhePage'
import PerfilPage from './pages/PerfilPage'
import TutorIAPage from './pages/TutorIAPage'
import NotFoundPage from './pages/NotFoundPage'

import DashboardLayout from './components/DashboardLayout'
import RotaProtegida from './components/RotaProtegida'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Fluxo de autenticação */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/esqueci-senha" element={<EsqueciSenhaPage />} />
        <Route path="/nova-senha" element={<NovaSenhaPage />} />
        <Route path="/cadastro" element={<CadastroPasso1Page />} />
        <Route path="/cadastro/dados" element={<CadastroPasso2Page />} />

        {/* Telas internas (SPA) protegidas, dentro do layout com menu */}
        <Route
          element={
            <RotaProtegida>
              <DashboardLayout />
            </RotaProtegida>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/disciplinas" element={<DisciplinasPage />} />
          <Route path="/disciplinas/:id" element={<DisciplinaDetalhePage />} />
          <Route path="/tutoria" element={<TutorIAPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
