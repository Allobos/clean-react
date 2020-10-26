import React from 'react'
import faker from 'faker'
import { RenderResult, render, cleanup } from '@testing-library/react'
import SignUp from './signup'
import { Helper, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError // se não for passado o valor será nulo indicando que não tem erro
  const sut = render(
    <SignUp
      // validationStub é uma versão mockada, de uma dependência nossa, que valida se os campos são válidos ou não
      validation={validationStub}
    />
  )
  return {
    sut
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup) // garante que qualquer alteração no render(<Login />) de um teste não afete o teste de baixo
  // testa o estado inicial dos campos
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0) // testa que o error-wrap não pode ter nenhum filho
    Helper.testButtonIsDisabled(sut, 'submit', true) // que o botão de submit tem que estar desbilitado
    // testa todos os campos com status inicial 'Campo obrigatório'
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
