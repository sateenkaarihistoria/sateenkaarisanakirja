/// <reference types="cypress" />

context('Organisaatiot', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/organisaatiot')
    })

    it('div that contains dictionary words should not be empty', () => {
      cy.get('.left.aligned.six.wide.column').should('not.be.empty')
    })

    it('div that contains dictionary words should have Aleksanterin teatteri', () => {
      cy.get('.left.aligned.six.wide.column').contains('Aleksanterin teatteri')
    })

    it('click item Aleksanterin teatteri, should show info on the right side column', () => {
        cy.get('.ten.wide.column').should('be.empty')

        cy.get('.left.aligned.six.wide.column').contains('Aleksanterin teatteri').click()
    
        cy.get('.ten.wide.column').should('not.be.empty')
    
        cy.get('h2').should('have.text', 'Aleksanterin teatteri')
        
        cy.get('.table-label-cell').contains('Maa')
        cy.get('.table-label-cell').contains('Paikkakunta')
    
        cy.get('.table-label-cell').contains('Tapahtuman nimi')
        cy.get('.table-label-cell').contains('Tapahtuman luonne')
        cy.get('.table-label-cell').contains('Tapahtuman vuosi')
        cy.get('.table-label-cell').contains('Asiasanat')
      })

    it('when not signed in, should not find Päivitä and Poista buttons', () => {
      cy.get('.left.aligned.six.wide.column').contains('Aleksanterin teatteri').click()
      
      cy.log("Check that word info does not show buttons, when not signed in")
      cy.get('button').contains('Päivitä').should('not.exist')
      cy.get('button').contains('Poista').should('not.exist')
    })

    it('test Organisaation nimi search with text Aleksanterin teatteri', () => {
      cy.get('.ui.input.hakukentta').within(() =>
          cy.get('input[type="text"]').type('Aleksanterin teatteri')
      )
      cy.get('.dropdown.icon').click()
      cy.get('.visible.menu.transition').contains('Organisaation nimi').click()

      cy.get('button').contains('Hae').click()
      cy.get('button').contains('Poista suodatus').should('exist')
      cy.get('.menuitem').contains('Aleksanterin teatteri')
    })

    it('test Maa search with word Suomi', () => {
      cy.get('.ui.input.hakukentta').within(() =>
          cy.get('input[type="text"]').type('Suomi')
      )
      cy.get('.dropdown.icon').click()
      cy.get('.visible.menu.transition').contains('Maa').click()
    
      cy.get('button').contains('Hae').click()
      cy.get('button').contains('Poista suodatus').should('exist')
    })


    it('test letter filtering, 4 letters in test', () => {
      const letters = ['A', 'H', 'P', 'Ö',]

      for( const letter of letters) {
        cy.get('.hakukirjain').contains(letter).click()
        cy.get('button').contains('Poista suodatus').click()
      }
    })
})
