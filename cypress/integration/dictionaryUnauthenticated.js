describe('Dictionary page for unauthenticated user', function() {
  beforeEach(function() {
    cy.visit('/dictionary')
  })

  it('New button is not visible', function() {
    cy.get('[data-cy=add-word-to-dictionary-button]')
      .should('not.visible')
  })

  it('words can be searched', function() {
    cy.get('[data-cy=dictionary-search-field]')
      .type('tes')
    cy.contains('test')
    cy.contains('tester')
    cy.contains('temps').should('not.visible')
  })

  it('clicking a word in the dictionary opens up the word detail modal', function() {
    cy.get('[data-cy=dictionary-search-field]')
      .type('tes')
    cy.get('[data-cy=word-lemma]')
      .first()
      .click()
    cy.get('[data-cy=dictionary-details-modal]')
      .should('be.visible')
    cy.get('[data-cy=dictionary-word-save-button]')
      .should('not.visible')
    cy.get('[data-cy=dictionary-word-remove-button]')
      .should('not.visible')
    cy.get('[data-cy=dictionary-word-previous-button]')
      .click()
    cy.get('[data-cy=dictionary-details-modal]')
      .should('be.visible')
    cy.get('[data-cy=dictionary-word-next-button]')
      .click()
    cy.get('[data-cy=dictionary-details-modal]')
      .should('be.visible')
  })
})