// não utilizamos memo porque este componente fica mudando de estado
import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

// Props guarda as propriedades do <input type="email"> que está comentado dentro do return mais abaixo
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]
  // Hackzinho para bloquear o autocomplete do Chrome capturando o evento do onFocus do input
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }
  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  const getStatus = (): string => {
    return 'O'
  }
  const getTitle = (): string => {
    return error
  }

  return (
    <div className={Styles.inputWrap}>
      {/* <input type="email" name="email" placeholder="Digite seu e-mail" /> */}
      {/*
          Para rodar o Hackzinho, precisa colocar o input como readOnly e
          e atribuir o hackzinho no onFocus do input
      */}
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input

// é só deixar o mouse estacionado sobre o <input> para ver as propriedades. Com isso, não precisamos digitar todo o textão todas as vezes que formos utilizar esse input, é só chamar o props no local onde o <input> estava no código que será entendido todas as propriedades do input!
