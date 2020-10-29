import { should } from 'chai'
import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.server() // servidor do cypress para mockar valores
    cy.visit('login')
  })
  // testa caso inicial - testa o estado inicial da tela de Login
  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly') // testa se o input do email está readonly
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório') // pega qualquer elemento que tenha o atributo data-testid com o valor email-status
      .should('contain.text', '🔴')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants') // não tem elemento filho
  })

  // testa caso de erro - testa os campos com valores inválidos
  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word()) // se eu digitar um email inválido
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Valor inválido') // espero que o status seja 'Valor inválido'...
      .should('contain.text', '🔴') // ...com a bolinha vermelha
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3)) // de 5 caracteres para cima é válido
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled') // espero que o botão esteja desabilitado
    cy.getByTestId('error-wrap').should('not.have.descendants') // espero que não tenha elemento filho, ou seja não mostra o loading e nem mensagem de erro
  })

  // testa caso de sucesso - campos com valores corretos
  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email()) // se eu digitar um email correto
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!') // espero que o status dele fique 'Tudo certo!'
      .should('contain.text', '🟢')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByTestId('submit').should('not.have.attr', 'disabled') // o botão (submit) não pode mais ter o atributo disabled
    cy.getByTestId('error-wrap').should('not.have.descendants') // não é para mostrar loading, só alteramos os campos mas ainda não demos submit
  })

  // testa credenciais inválidas
  it('Should present InvalidCredentialsError on 401', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: {
        error: faker.random.words()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email()) // se eu digitar um email correto
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click() // ao clicar no botão...
    cy.getByTestId('error-wrap') // caso de erro
    cy.getByTestId('spinner').should('not.exist') // espero que o spinner esteja escondido...
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas') // ... e que o main-erro tenha esteja preenchido com o texto 'Credenciais inválidas'
    cy.url().should('eq', `${baseUrl}/login`) // se der erro, espero que não mude (seja equal - igual - ao baseUrl) a URL
  })

  // testa falhas nas requests (códigos 400, 404 e 500)
  it('Should present UnexpectedError on default error cases', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: faker.helpers.randomize([400, 404, 500]),
      response: {
        error: faker.random.words() // resposta de erro aleatória mockada
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email()) // se eu digitar um email
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click() // ao clicar no botão...
    cy.getByTestId('spinner').should('not.exist') // espero não ter spinner
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.') // ...e espero que o main-error tenha esteja preenchido com o texto 'Algo de errado aconteceu. Tente novamente em breve'
    cy.url().should('eq', `${baseUrl}/login`) // ...e espero que a URL não mude
  })

  // testa caso de sucesso (200) mas com dados inválidos retornados
  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalidProperty: faker.random.uuid()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email()) // se eu digitar um email correto
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click() // ao clicar no botão...
    cy.getByTestId('spinner').should('not.exist') // spinner não deve aparecer
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve') // ... e que o main-erro tenha esteja preenchido com o texto 'Algo de errado aconteceu. Tente novamente em breve'
    cy.url().should('eq', `${baseUrl}/login`) // deve continuar na mesma tela
  })

  // testa caso de sucesso (200) com accessToken no localStorage
  it('Should present save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email()) // valor aleatório usando o server local do cypress - basta que seja um email válido e uma senha com 5 caracteres
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    // cy.getByTestId('email').focus().type('mango@gmail.com') // valor marretado usando a API
    // cy.getByTestId('password').focus().type('12345')
    cy.getByTestId('submit').click()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`) // vai mudar de URL
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken'))) // testa que tem que ter um acessToken setado no localStorage
  })

  // testa que se clicar várias vezes no botão, ele não possa submeter o formulário várias vezes
  it('Should prevent multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    }).as('request') // apelida de request
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick() // clique duplo (double) no botão
    cy.get('@request.all').should('have.length', 1) // all faz a contagem da quantidade de chamadas, espera que tenha 1
  })
})
