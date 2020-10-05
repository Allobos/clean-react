import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'

// Router é o componente inicial do nosso projeto
ReactDOM.render(
  <Router />,
  document.getElementById('main')
)
