describe('Login page', function() {
  it('user can login', function() {
    cy.visit('/login')
    cy.get('#usernameField')
      .type('testi')
    cy.get('#passwordField')
      .type('testi')
    cy.get('form')
      .submit()
    cy.contains('testi')
    cy.url().should('include', '/chapters')
  })
})