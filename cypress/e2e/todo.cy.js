describe('To-Do App E2E Tests', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('loads the app', () => {
    cy.get('body').should('be.visible')
  })

  it('adds a new task', () => {
    cy.get('input').first().type('Cypress Test Task')
    cy.get('button').first().click()
    cy.contains('Cypress Test Task').should('be.visible')
  })

  it('marks a task as complete', () => {
    cy.get('input').first().type('Complete Me')
    cy.get('button').first().click()
    cy.contains('button', /complete|done/i).first().click()
  })

  it('deletes a task', () => {
  cy.get('input').first().type('Delete Me')
  cy.get('button').first().click()

  // Go up 2 parent levels to reach the full task card row
  cy.contains('Delete Me')
    .parent()
    .parent()
    .contains('button', 'Delete')
    .click()

  cy.contains('Delete Me').should('not.exist')
    })

})