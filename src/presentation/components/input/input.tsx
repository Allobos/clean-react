// não utilizamos memo porque este componente fica mudando de estado
import React, { useContext, useRef } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

// Props guarda as propriedades do <input> que está dentro do return
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={props.name}
        readOnly // para rodar o hackzinho, presica colocar o input como readOnly e atribuir o hackzinho no onFocus do input
        onFocus={e => { e.target.readOnly = false }} // Hackzinho para bloquear o autocomplete do Chrome capturando o evento do onFocus do input
        onChange={ e => { setState({ ...state, [e.target.name]: e.target.value }) }}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => { inputRef.current.focus() }}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input

// é só deixar o mouse estacionado sobre o <input> para ver as propriedades. Com isso, não precisamos digitar todo o textão todas as vezes que formos utilizar esse input, é só chamar o props no local onde o <input> estava no código que será entendido todas as propriedades do input!
