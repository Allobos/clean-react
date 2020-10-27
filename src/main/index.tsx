import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeLogin } from './factories/pages/login/login-factory'
import { makeSignUp } from './factories/pages/signup/signup-factory'

// Router é o componente inicial do nosso projeto
ReactDOM.render(
  <Router
    makeLogin={makeLogin}
    makeSignUp={makeSignUp}

  />,
  document.getElementById('main')
)
