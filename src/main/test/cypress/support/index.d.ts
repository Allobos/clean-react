// https://docs.cypress.io/guides/tooling/typescript-support.html#Types-for-custom-commands
declare namespace Cypress {
  interface Chainable {
    getByTestId: (id: string) => Chainable<Element>
  }
}
