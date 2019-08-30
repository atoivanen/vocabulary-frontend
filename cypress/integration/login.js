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

  it('user cannot login with wrong credentials', function() {
    cy.visit('/login')
    cy.get('#usernameField')
      .type('testi')
    cy.get('#passwordField')
      .type('t')
    cy.get('form')
      .submit()
    cy.url().should('include', '/login')
  })

  it('user cannot login with empty credentials', function() {
    cy.visit('/login')
    cy.get('form')
      .submit()
    cy.url().should('include', '/login')
  })
})