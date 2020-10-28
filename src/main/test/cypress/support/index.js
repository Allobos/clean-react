// adiciona um comando para o cypress
Cypress.Commands.add('getByTestId', (id) => cy.get(`[data-testid=${id}]`))
