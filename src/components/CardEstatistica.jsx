import Card from './Card'
import './CardEstatistica.css'

// Card pequeno de indicador no Dashboard (ícone + título + valor + descrição).
// O ícone é recebido como elemento via prop.
export default function CardEstatistica({ icone, titulo, valor, descricao }) {
  return (
    <Card className="estatistica">
      <div className="estatistica__topo">
        {icone}
        <span>{titulo}</span>
      </div>
      <h3 className="estatistica__valor">{valor}</h3>
      <p className="estatistica__desc">{descricao}</p>
    </Card>
  )
}
