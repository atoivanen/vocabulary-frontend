describe('Access for authenticated user', function() {
  const username = 'testi'
  const password = 'testi'
  beforeEach(function() {
    cy.visit('/login')
    cy.get('#usernameField')
      .type(username)
    cy.get('#passwordField')
      .type(password)
    cy.get('form')
      .submit()
  })

  it('login link is not visible', function() {
    cy.get('[data-cy=login-link]')
      .should('not.visible')
  })

  it('register link is not visible', function() {
    cy.get('[data-cy=register-link]')
      .should('not.visible')
  })

  it('My Vocabulary page can be accessed', function() {
    cy.get('[data-cy=my-vocabulary-link]')
      .click()
    cy.url().should('include', '/myvocabulary')
  })

  it('Username is visible', function() {
    cy.get('[data-cy=username]')
      .contains('testi')
  })

  it('User can log out', function() {
    cy.get('[data-cy=logout-link]')
      .click()
    cy.url().should('include', '/chapters')
    cy.get('[data-cy=username]')
      .should('not.visible')
  })
})