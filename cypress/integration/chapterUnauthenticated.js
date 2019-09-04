describe('Chapter page for unauthenticated user', function() {
  beforeEach(function() {
    cy.visit('/chapters')
    cy.contains('Le Cabinet des Fées: Les Fées')
      .click()
  })

  it('return button takes back to the Chapters page', function() {
    cy.get('[data-cy=return-to-chapters-button]')
      .click()
    cy.url()
      .should('eq', 'http://localhost:3000/chapters')
  })

  it('chapter title and body are visible', function() {
    cy.get('[data-cy=chapter-title]')
      .should('be.visible')
    cy.get('[data-cy=chapter-body]')
      .should('be.visible')
  })

  it('vocabulary title is visible', function() {
    cy.get('[data-cy=vocabulary-title]')
      .should('be.visible')
  })

  it('buttons for editing chapter and vocabulary are not visible', function() {
    cy.get('[data-cy=publish-chapter-button]')
      .should('not.visible')
    cy.get('[data-cy=edit-chapter-button]')
      .should('not.visible')
    cy.get('[data-cy=remove-chapter-button]')
      .should('not.visible')
    cy.get('[data-cy=add-word-button]')
      .should('not.visible')
    cy.get('[data-cy=remove-words-button]')
      .should('not.visible')
  })

  it('clicking a word in the vocabulary opens up the word detail modal', function() {
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

  it('words can be searched and practiced', function() {
    cy.get('[data-cy=search-field]')
      .type('bo')
    cy.get('[type="checkbox"]')
      .its('length').should('eq', 5)
    cy.get('[type="checkbox"]')
      .check()
    cy.get('[data-cy=practice-words-button]')
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
})