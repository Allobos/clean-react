import React from 'react'
import SignUp from './signup'
import { RenderResult, render } from '@testing-library/react'
import { Helper } from '@/presentation/test'
type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />
  )
  return {
    sut
  }
}

describe('SignUp Component', () => {
  // testa o estado inicial dos campos
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    Helper.testChildCount(sut, 'error-wrap', 0) // testa que o error-wrap não pode ter nenhum filho
    Helper.testButtonIsDisabled(sut, 'submit', true) // que o botão de submit tem que estar desbilitado
    // testa todos os campos com status inicial 'Campo obrigatório'
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
