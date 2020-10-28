import faker from 'faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  // caso inicial - testa o estado inicial da tela de Login
  it('Shuld load with correct initial state', () => {
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

  // caso de erro - testa os campos com valores inválidos
  it('Shuld present error state if form is invalid', () => {
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

  // caso de sucesso
  it('Shuld present valid state if form is valid', () => {
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
})
