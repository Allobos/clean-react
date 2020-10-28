describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Shuld load with correct initial state', () => {
    // pega qualquer elemento que tenha o atributo data-testid com o valor email-status
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatório')
  })
})
