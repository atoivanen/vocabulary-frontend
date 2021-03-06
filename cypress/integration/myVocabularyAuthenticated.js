describe('My Vocabulary page for authenticated user', function() {
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
  })

  it('words can be practiced', function() {
    cy.visit('/myvocabulary')
    cy.get('[type="checkbox"]')
      .check()
    cy.get('[data-cy=practice-myvocabulary-word-button]')
      .click()
    cy.get('[data-cy=word-to-practice]')
      .should('be.visible')
    cy.get('[data-cy=correct-solution]')
      .should('not.visible')
    cy.get('[data-cy=check-solution-button')
      .click()
    cy.get('[data-cy=correct-solution]')
      .should('be.visible')
    cy.wait(5000)
    cy.get('[data-cy=correct-solution]')
      .should('not.visible')
    cy.get('[data-cy=practice-next-button]')
      .click()
    cy.get('[data-cy=word-to-practice]')
      .should('be.visible')
  })

  it('clicking a word in the vocabulary opens up the word detail modal', function() {
    cy.visit('/myvocabulary')
    cy.get('[data-cy=word-lemma]')
      .first()
      .click()
    cy.get('[data-cy=word-details-modal]')
      .should('be.visible')
    cy.get('[data-cy=save-word-button]')
      .should('not.visible')
    cy.get('[data-cy=remove-word-button]')
      .should('not.visible')
    cy.get('[data-cy=previous-word-button]')
      .click()
    cy.get('[data-cy=word-details-modal]')
      .should('be.visible')
    cy.get('[data-cy=next-word-button]')
      .click()
    cy.get('[data-cy=word-details-modal]')
      .should('be.visible')
  })

  it('words can be added to My Vocabulary and removed', function() {
    cy.visit('/chapters')
    cy.contains('Le Cabinet des Fées: Les Fées')
      .click()
    cy.get('[data-cy=search-field]')
      .type('bon')
    cy.get('[type="checkbox"]')
      .check()
    cy.get('[data-cy=practice-words-button]')
      .click()
    cy.get('[data-cy=practice-next-button]')
      .click()
    cy.get('button.close')
      .click()
    cy.visit('/myvocabulary')
    cy.contains('bon')
    cy.get('[data-cy=search-field]')
      .type('bon')
    cy.get('[type="checkbox"]')
      .first()
      .check()
    cy.get('[data-cy=remove-myvocabulary-word-button]')
      .click()
    cy.get('table')
      .contains('bon')
      .should('not.exist')
  })
})