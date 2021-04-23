/// <reference types="cypress" />

context('Sanakirja', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/sanakirja')
    })

    it('div that contains dictionary words should not be empty', () => {
      cy.get('.left.aligned.six.wide.column').should('not.be.empty')
    })

    it('div that contains dictionary words should have word abnormisuus', () => {
      cy.get('.left.aligned.six.wide.column').contains('abnormisuus')
    })

    it('click word abnormisuus, should show info about abnormisuus on the right side column', () => {
      cy.log("Right side column should be empty")
      cy.get('.top.aligned.ten.wide.column').should('be.empty')

      cy.log("Click word abnormisuus")
      cy.get('.left.aligned.six.wide.column').contains('abnormisuus').click()

      cy.log("Right side column should not be empty")
      cy.get('.top.aligned.ten.wide.column').should('not.be.empty')

      cy.log("Check that there is a header that have text abnormisuus")
      cy.get('h2').should('have.text', 'abnormisuus')
      
      cy.log("Check that word info contains correct names")
      cy.get('.table-label-cell').contains('Sanaluokka')
      cy.get('.table-label-cell').contains('Ensimmäinen')
      cy.get('.table-label-cell').contains('Viimeinen')
      cy.get('.table-label-cell').contains('Selite')
      cy.get('table').contains('Tyylilaji')
      cy.get('table').contains('Käyttöala')
      cy.get('table').contains('Asiasana')
    })

    it('when not signed in, should not find Päivitä and Poista buttons', () => {
      cy.log("Click word abnormisuus")
      cy.get('.left.aligned.six.wide.column').contains('abnormisuus').click()
      
      cy.log("Check that word info does not show buttons, when not signed in")
      cy.get('button').contains('Päivitä').should('not.exist')
      cy.get('button').contains('Poista').should('not.exist')
    })

    it('test Hakusana search with word abnormisuus', () => {
      cy.get('.ui.input.hakukentta').within(() =>
          cy.get('input[type="text"]').type('abnormisuus')
      )
      cy.get('button').contains('Hae').click()
      cy.get('button').contains('Poista suodatus').should('exist')
      cy.get('.menuitem').contains('abnormisuus')
    })

    it('test Asiasana search with word sukupuoli', () => {
      cy.get('.ui.input.hakukentta').within(() =>
          cy.get('input[type="text"]').type('sukupuoli')
      )
      cy.get('.dropdown.icon').click()
      cy.get('.visible.menu.transition').contains('Asiasana').click()
    
      cy.get('button').contains('Hae').click()
      cy.get('button').contains('Poista suodatus').should('exist')
    })

    // it('test letter filtering, all letters', () => {
    //   const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J', 'K', 'L', 
    //                   'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö',]

    //   for( const letter of letters) {
    //     cy.get('.hakukirjain').contains(letter).click()
    //     cy.get('button').contains('Poista suodatus').click()
    //   }
    // })

    it('test letter filtering, 4 letters in test', () => {
      const letters = ['A', 'H', 'P', 'Ö',]

      for( const letter of letters) {
        cy.get('.hakukirjain').contains(letter).click()
        cy.get('button').contains('Poista suodatus').click()
      }
    })
})
