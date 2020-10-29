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
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid') // testa se o atributo data-status tem o valor 'invalid'
    cy.getByTestId('email')
      .should('have.attr', 'title', 'Campo obrigatório') // espera que o atributo title tenha valor de 'Campo obrigatório'
      .should('have.attr', 'readOnly') // espera que tenha o atributo readOnly
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo obrigatório') // pega qualquer elemento que tenha o atributo data-testid com o valor email-status e verifica se o atributo title deste elemento tem o valor de 'Campo obrigatório'
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled') // espera que o elemento 'submit' tenha o atributo 'disabled'
    cy.getByTestId('error-wrap').should('not.have.descendants') // não tem elemento filho
  })

  // testa caso de erro - testa os campos inserindo valores inválidos
  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word()) // insere um email inválido
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Valor inválido') // espero que o atributo title tenha o valor: 'Valor inválido'
    cy.getByTestId('email-label').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3)) // insere um password inválido (de 5 caracteres para cima é válido)
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled') // espero que o botão esteja desabilitado
    cy.getByTestId('error-wrap').should('not.have.descendants') // espero que não tenha elemento filho, ou seja não mostra o loading e nem mensagem de erro
  })

  // testa caso de sucesso - campos com valores corretos
  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email()) // insere um email válido
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('email').should('not.have.attr', 'title') // espera que não tenha o atributo title
    cy.getByTestId('email-label').should('not.have.attr', 'title')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)) // insere um password válido (com 5 caracteres)
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password').should('not.have.attr', 'title')
    cy.getByTestId('password-label').should('not.have.attr', 'title')
    cy.getByTestId('submit').should('not.have.attr', 'disabled') // espera que o botão (submit) não tenha o atributo 'disabled'
    cy.getByTestId('error-wrap').should('not.have.descendants') // espera que qualquer elemento que tenha o atributo data-testid="error-wrap" não tenha elementos filhos - não é para mostrar loading, só alteramos os campos mas não demos submit
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
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}') // type('{enter}) faz o Enter do teclado
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

  // testa - não fazer submit se tivermos com o formulário inválido (com password em branco)
  it('Should not call submit if form is invalid', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    }).as('request')
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
