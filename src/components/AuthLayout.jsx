import './AuthLayout.css'

// Layout das telas de autenticação: faixa "hero" verde com a citação à
// esquerda e a área do formulário (children) à direita.
export default function AuthLayout({ children }) {
  return (
    <div className="auth">
      <div className="auth__hero">
        <p>
          "Educação não é o aprendizado de fatos, mas treinamento da mente para
          pensar."
          <span>Albert Einstein</span>
        </p>
      </div>

      <div className="auth__form">
        <div className="auth__form-inner">{children}</div>
      </div>
    </div>
  )
}
