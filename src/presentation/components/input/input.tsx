// não utilizamos memo porque este componente fica mudando de estado
import React from 'react'
import Styles from './input-styles.scss'

// Props = guarda as propriedades que essa classe vai receber, esse nosso props aqui é igual ao props do <input type="email"> que está comentado dentro do return mais abaixo - é só deixar o mouse estacionado sobre o <input> para ver as propriedades. Com isso, não precisamos digitar todo o textão todas as vezes que formos utilizar esse input, é só chamar o props no local onde o <input> estava no código que será entendido todas as propriedades do input!
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputWrap}>
      {/* <input type="email" name="email" placeholder="Digite seu e-mail" /> */}
      <input {...props} />
      <span className={Styles.status}></span>
    </div>
  )
}

export default Input
