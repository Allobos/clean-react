// não utilizamos memo porque este componente fica mudando de estado
import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

// Props guarda as propriedades do <input type="email"> que está comentado dentro do return mais abaixo
type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(Context)

  return (
    <button data-testid="submit" disabled={state.isFormInvalid} type="submit">{text}</button>
  )
}

export default SubmitButton
