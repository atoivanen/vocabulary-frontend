describe('Chapters page for unauthenticated user', function() {
  beforeEach(function() {
    cy.visit('/chapters')
  })

  it('user can access a chapter', function() {
    cy.contains('Le Cabinet des Fées: Les Fées')
      .click()
    cy.contains('Le Cabinet des Fées: Les Fées')
  })

  it('user can make a search', function() {
    cy.get('[data-cy=search-field]')
      .type('le cabinet')
    cy.contains('Le Cabinet des Fées: Les Fées')
    cy.contains('Le Cabinet des Fées: Le Petit Chaperon Rouge')
    cy.contains('Bric-à-Brac').should('not.exist')
  })

  it('buttons are not visible', function () {
    cy.get('[data-cy=new-chapter-button]')
      .should('not.visible')
    cy.get('[data-cy=remove-chapters-button]')
      .should('not.visible')
  })

  it('New chapter page redirects to the login page', function() {
    cy.visit('/new')
    cy.url().should('include', '/login')
  })
})