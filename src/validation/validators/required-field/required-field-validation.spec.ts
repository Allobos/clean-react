import { RequiredFieldValidation } from './required-field-validation'
import { RequiredFieldError } from '@/validation/erros'
import faker from 'faker'

const makeSut = (field: string): RequiredFieldValidation => new RequiredFieldValidation(field)

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' }) // passa um objeto que tem um atributo (com o nome igual ao valor da variável field) com o valor de vazio ('')
    expect(error).toEqual(new RequiredFieldError()) // testa com o valor vazio
  })

  test('Should return falsy if field is not empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy() // testa com um valor
  })
})
