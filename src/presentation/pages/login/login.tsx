import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <img src="data:image/png;base64,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" />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={Styles.status}></span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Digite sua senha" />
          <span className={Styles.status}></span>
        </div>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <footer className={Styles.footer}>

      </footer>
    </div>
  )
}

export default Login
