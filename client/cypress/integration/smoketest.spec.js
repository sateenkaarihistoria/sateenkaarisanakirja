/// <reference types="cypress" />

context('SmokeTest', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('should find some text on front page', () => {
        cy.get('h1.header')
          .should('have.text', 'SATEENKAARIHISTORIAN HAKUSANAKIRJA')
    })

})
