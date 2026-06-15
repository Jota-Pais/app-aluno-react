import './Interruptor.css'

// Interruptor (switch) reutilizável e controlado.
// Recebe o estado via `ativo` e avisa mudanças por `onChange(novoValor)`.
export default function Interruptor({ label, descricao, ativo, onChange }) {
  return (
    <label className="interruptor">
      <span className="interruptor__textos">
        <span className="interruptor__label">{label}</span>
        {descricao && (
          <span className="interruptor__descricao">{descricao}</span>
        )}
      </span>

      <input
        type="checkbox"
        className="interruptor__input"
        checked={ativo}
        onChange={(evento) => onChange(evento.target.checked)}
      />
      <span className="interruptor__trilho" aria-hidden="true" />
    </label>
  )
}
