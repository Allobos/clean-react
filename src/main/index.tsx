import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeLogin } from './factories/pages/login/login-factory'

// Router é o componente inicial do nosso projeto
ReactDOM.render(
  <Router
    makeLogin={makeLogin}
  />,
  document.getElementById('main')
)
