import * as FormHelper from '../support/form-helper'
import * as Http from '../support/login-mocks'
import faker from 'faker'

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email()) // insere um email válido
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)) // insere um password válido (com 5 caracteres)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click() // faz o clique do mouse (botão esquerdo) no botão (submit) que submete o formulário
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  // testa caso inicial - testa o estado inicial da tela de Login
  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly') // espero que tenha o atributo readOnly
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled') // espera que o elemento 'submit' tenha o atributo 'disabled'
    cy.getByTestId('error-wrap').should('not.have.descendants') // não tem elemento filho
  })

  // testa caso de erro - testa os campos inserindo valores inválidos
  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word()) // insere um email inválido
    FormHelper.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3)) // insere um password inválido (de 5 caracteres para cima é válido)
    FormHelper.testInputStatus('password', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled') // espero que o botão esteja desabilitado
    cy.getByTestId('error-wrap').should('not.have.descendants') // espero que não tenha elemento filho, ou seja não mostra o loading e nem mensagem de erro
  })

  // testa caso de sucesso - campos com valores corretos
  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email()) // insere um email válido
    FormHelper.testInputStatus('email')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)) // insere um password válido (com 5 caracteres)
    FormHelper.testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled') // espera que o botão (submit) não tenha o atributo 'disabled'
    cy.getByTestId('error-wrap').should('not.have.descendants') // espera que qualquer elemento que tenha o atributo data-testid="error-wrap" não tenha elementos filhos - não é para mostrar loading, só alteramos os campos mas não demos submit
  })

  // testa credenciais inválidas
  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError()
    simulateValidSubmit()
    FormHelper.testMainError('Credenciais inválidas')
    FormHelper.testUrl('/login') // testa que a URL seja /login
  })

  // testa falhas nas requests (códigos 400, 404 e 500)
  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError()
    simulateValidSubmit()
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    FormHelper.testUrl('/login')
  })

  // testa caso de sucesso (200) mas com dados inválidos retornados
  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidData()
    simulateValidSubmit()
    FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    FormHelper.testUrl('/login')
  })

  // testa caso de sucesso (200) com accessToken no localStorage
  it('Should present save accessToken if valid credentials are provided', () => {
    Http.mockOk()
    simulateValidSubmit()
    // cy.getByTestId('email').focus().type('mango@gmail.com') // valor marretado usando a API
    // cy.getByTestId('password').focus().type('12345')
    cy.getByTestId('error-wrap').should('not.have.descendants')
    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken') // testa que tem que ter um acessToken setado no localStorage
  })

  // testa que se clicar várias vezes no botão, ele não possa submeter o formulário várias vezes
  it('Should prevent multiple submits', () => {
    Http.mockOk()
    populateFields()
    cy.getByTestId('submit').dblclick() // clique duplo (double) no botão
    FormHelper.testHttpCallsCount(1)
  })

  // testa não fazer submit se tivermos algum Input com valor inválido no formulário - neste caso o Input do password estará vazio
  it('Should not call submit if form is invalid', () => {
    Http.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}') // type('{enter}) faz o Enter do teclado
    FormHelper.testHttpCallsCount(0)
  })
})
