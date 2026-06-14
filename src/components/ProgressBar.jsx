import './ProgressBar.css'

// Barra de progresso reutilizada no Dashboard e em Disciplinas.
// Com `rotulo`, mostra um cabeçalho ("Progresso ... 75%") acima da barra;
// sem rótulo, mostra a barra com a porcentagem ao lado (estilo do Dashboard).
export default function ProgressBar({ valor, rotulo }) {
  if (rotulo) {
    return (
      <div className="progresso">
        <div className="progresso__topo">
          <span>{rotulo}</span>
          <span>{valor}%</span>
        </div>
        <div className="progresso__trilho">
          <div className="progresso__preenchido" style={{ width: `${valor}%` }} />
        </div>
      </div>
    )
  }

  return (
    <div className="progresso progresso--inline">
      <div className="progresso__trilho">
        <div className="progresso__preenchido" style={{ width: `${valor}%` }} />
      </div>
      <span className="progresso__valor">{valor}%</span>
    </div>
  )
}
