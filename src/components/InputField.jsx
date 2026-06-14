import './InputField.css'

// Campo de formulário controlado e reutilizável.
// `label` aceita texto ou JSX (ex.: o link "Esqueceu?" do Login).
// `error` exibe a mensagem de validação via renderização condicional.
export default function InputField({ label, error, id, name, ...props }) {
  const inputId = id || name

  return (
    <div className="campo">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        name={name}
        className={`campo__input ${error ? 'campo__input--erro' : ''}`}
        {...props}
      />
      {error && <span className="campo__erro">{error}</span>}
    </div>
  )
}
