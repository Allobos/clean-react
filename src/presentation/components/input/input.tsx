// não utilizamos memo porque este componente fica mudando de estado
import React, { useContext, useRef } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

// Props guarda as propriedades do <input type="email"> que está comentado dentro do return mais abaixo
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  return (
    <div className={Styles.inputWrap}>
      {/* <input type="email" name="email" placeholder="Digite seu e-mail" /> */}
      {/*
          Para rodar o Hackzinho, precisa colocar o input como readOnly e
          e atribuir o hackzinho no onFocus do input
      */}
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={e => { e.target.readOnly = false }} // Hackzinho para bloquear o autocomplete do Chrome capturando o evento do onFocus do input
        onChange={ e => { setState({ ...state, [e.target.name]: e.target.value }) }}
      />
      <label onClick={() => { inputRef.current.focus() }}>
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo!'} // SE tem error mostra 'Tudo certo!
        className={Styles.status}
      >
        {error ? '🔴' : '🟢' /* SE tem error mostra a bolinha vermelha SENÃO mostra a bolinha verde */}
      </span>
    </div>
  )
}

export default Input

// é só deixar o mouse estacionado sobre o <input> para ver as propriedades. Com isso, não precisamos digitar todo o textão todas as vezes que formos utilizar esse input, é só chamar o props no local onde o <input> estava no código que será entendido todas as propriedades do input!
