import './Avatar.css'

// Avatar reutilizável: mostra a foto do usuário quando houver; senão, cai
// para as iniciais do nome. A `className` define tamanho/cor (reaproveita os
// estilos de cada lugar: cabeçalho, perfil, etc.).
export default function Avatar({ nome, foto, className }) {
  if (foto) {
    return <img className={`${className} avatar--foto`} src={foto} alt={nome} />
  }

  const iniciais = nome
    .split(' ')
    .map((parte) => parte[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return <span className={className}>{iniciais}</span>
}
