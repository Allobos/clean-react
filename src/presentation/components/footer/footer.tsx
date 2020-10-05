// memo evita que o browser fique renderizando o <header> toda vez que houver mudança de estado (clique ou preenchimento de inputs) na página de login
import React, { memo } from 'react'
import Styles from './footer-styles.scss'

const Footer: React.FC = () => {
  return (
    <footer className={Styles.footer} />
  )
}

export default memo(Footer)
