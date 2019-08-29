describe('Access for unauthenticated user', function() {
  beforeEach(function() {
    cy.visit('/')
  })

  it('language can be changed to English', function() {
    cy.get('[data-cy=english-button]')
      .click()
    cy.contains('Welcome')
  })

  it('language can be changed to Finnish', function() {
    cy.get('[data-cy=finnish-button]')
      .click()
    cy.contains('Tervetuloa')
  })

  it('login page can be accessed', function() {
    cy.get('[data-cy=login-link]')
      .click()
    cy.url().should('include', '/login')
  })

  it('registering page can be accessed', function() {
    cy.get('[data-cy=register-link]')
      .click()
    cy.url().should('include', '/register')
  })

  it('Chapters page can be accessed', function() {
    cy.get('[data-cy=chapters-link]')
      .click()
    cy.url().should('include', '/chapters')
  })

  it('Dictionary page can be accessed', function() {
    cy.get('[data-cy=dictionary-link]')
      .click()
    cy.url().should('include', '/dictionary')
  })

  it('About page can be accessed', function() {
    cy.get('[data-cy=about-link]')
      .click()
    cy.url().should('include', '/about')
  })

  it('link to My Vocabulary is not visible', function() {
    cy.get('[data-cy=my-vocabulary-link]')
      .should('not.visible')
  })

  it('My Vocabulary page displays an error message', function() {
    cy.visit('/myvocabulary')
    cy.get('[data-cy=unauthorized-message]')
  })

  it('Logout link is not visible', function() {
    cy.get('[data-cy=my-logout-link]')
      .should('not.visible')
  })

  it('Username is not visible', function() {
    cy.get('[data-cy=username]')
      .should('not.visible')
  })
})