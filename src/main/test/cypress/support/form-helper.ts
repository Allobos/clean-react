const baseUrl: string = Cypress.config().baseUrl

// testa o status de um component Input
export const testInputStatus = (field: string, error?: string): void => { // error?:string é optional (opcional)
  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')
  const attr = `${error ? '' : 'not.'}have.attr`
  cy.getByTestId(field).should(attr, 'title', error)
  cy.getByTestId(`${field}-label`).should(attr, 'title', error)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('spinner').should('not.exist') // espera que o spinner esteja escondido...
  cy.getByTestId('main-error').should('contain.text', error) // ...e que o main-error esteja preenchido com o texto passado pela variável error
}

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count) // all faz a contagem da quantidade de vezes que o request foi chamado, espera que tenha a quantidade do número passado pela variável count
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`) // testa a URL e espera que seja igual ao valor concatenado das variáveis baseUrl e path
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key))) // testa e espera que o valor passado pela variável key exista no localStorage
}
