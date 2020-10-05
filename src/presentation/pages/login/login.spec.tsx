import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

// tem que ser criado como .tsx porque esse teste irá renderizar o componente do login

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
})
