describe('Dictionary page for authenticated user', function() {
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
    cy.wait(1000)
    cy.visit('/dictionary')
  })

  it('new word can be added and removed', function() {
    cy.get('[data-cy=add-word-to-dictionary-button]')
      .click()
    cy.get('[data-cy=dictionary-word-lemma]')
      .type('mot de test')
    cy.get('[data-cy=dictionary-word-translation]')
      .type('testisana')
    cy.get('form')
      .submit()
    cy.contains('mot de test')
    cy.get('[data-cy=word-lemma]')
      .first()
      .click()
    cy.get('[data-cy=dictionary-word-remove-button')
      .click()
    cy.get('[data-cy=empty-dictionary-message]')
      .should('be.visible')
  })
})