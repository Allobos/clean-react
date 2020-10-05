// memo evita que o browser fique renderizando o <header> toda vez que houver mudança de estado (clique ou preenchimento de inputs) na página de login
import React, { memo } from 'react'
import Styles from './login-header-styles.scss'
import Logo from '@/presentation/components/logo/logo'

// type Props = React.HTMLAttributes<HTMLElement>

// const LoginHeader: React.FC<Props> = (props: Props) => {
const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
