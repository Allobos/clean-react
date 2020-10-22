import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    // Estado inicial
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  const validate = (input: string): void => {
    console.log('FUI CHAMADOOOO')
  }
  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
    // validation.validate('email', state.email) // professor (passa nos testes mas não renderiza)
    // if (validation) {
    // validate(state.email) // comentar do professor e manter esse para renderizar (não passa nos testes)
    // validate({ email: state.email })
    // }
  }, [state.email, state.password])
  /*
  useEffect(() => {
    // validation.validate('password', state.password) // professor (passa nos testes mas não renderiza)
    // validate(state.password) // comentar do professor e manter esse para renderizar (não passa nos testes)
  }, [state.password])
  */

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          {/* só desabilitará o button se tiver erro no input email ou no input password */}
          <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
