/// <reference types="cypress" />

context('Kulttuurituotteet', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/kulttuurituotteet')
  })

  it('Kulttuurituotteet and Tekijät buttons should exist', () => {
    cy.get('button').contains('Kulttuurituotteet').should('exist')
    cy.get('button').contains('Tekijät').should('exist')
  })

  it('div that contains items should not be empty', () => {
    cy.get('.left.aligned.six.wide.column').should('not.be.empty')
  })

  it('div that contains Tekijät should have item Asch, Schalom', () => {
    cy.get('button').contains('Tekijät').click()
    cy.get('.left.aligned.six.wide.column').contains('Asch, Schalom')
  })

  it('div that contains Kulttuurituotteet should have item Aaria Sapho-oopperasta', () => {
    cy.get('button').contains('Kulttuurituotteet').click()
    cy.get('.left.aligned.six.wide.column').contains('Aaria Sapho-oopperasta')
  })

  it('click item Asch Schalom, should show info on the right side column', () => {
    cy.get('.ten.wide.column').should('be.empty')
    cy.get('button').contains('Tekijät').click()
    cy.get('.left.aligned.six.wide.column').contains('Asch, Schalom').click()

    cy.get('.ten.wide.column').should('not.be.empty')

    cy.get('h2').should('have.text', 'Schalom Asch')
    
    cy.get('.table-label-cell').contains('Ammatti')
    cy.get('.table-label-cell').contains('Paikkakunta')
    cy.get('.table-label-cell').contains('Maa')

    cy.get('table').contains('Teoksen nimi')
    cy.get('table').contains('Teoslaji')
    cy.get('table').contains('Teoksen paikkakunta')
    cy.get('table').contains('Teoksen maa')
    cy.get('table').contains('Asiasanat')
  })

  it('click item Aaria Sapho-oopperasta, should show info on the right side column', () => {
    cy.get('.ten.wide.column').should('be.empty')
    cy.get('button').contains('Kulttuurituotteet').click()
    cy.get('.left.aligned.six.wide.column').contains('Aaria Sapho-oopperasta').click()

    cy.get('.ten.wide.column').should('not.be.empty')

    cy.get('h2').should('have.text', 'Aaria Sapho-oopperasta')
    
    cy.get('.table-label-cell').contains('Lajityyppi')
    cy.get('.table-label-cell').contains('Teoksen paikkakunta')
    cy.get('.table-label-cell').contains('Teoksen maa')
    cy.get('.table-label-cell').contains('Asiasana')


    cy.get('table').contains('Tekijän etunimi')
    cy.get('table').contains('Tekijän sukunimi')
    cy.get('table').contains('Teoksen paikkakunta')
    cy.get('table').contains('Ammatti')
    cy.get('table').contains('Tekijän paikkakunta')
    cy.get('table').contains('Tekijan maa')
  })

  it('when not signed in, should not find Päivitä and Poista buttons', () => {
    cy.get('button').contains('Kulttuurituotteet').click()
    cy.get('.left.aligned.six.wide.column').contains('Aaria Sapho-oopperasta').click()
    cy.get('button').contains('Päivitä').should('not.exist')
    cy.get('button').contains('Poista').should('not.exist')

    cy.get('button').contains('Tekijät').click()
    cy.get('.left.aligned.six.wide.column').contains('Asch, Schalom').click()
    cy.get('button').contains('Päivitä').should('not.exist')
    cy.get('button').contains('Poista').should('not.exist')
  })


  it('test Tekijän sukunimi search with text Asch', () => {
    cy.get('button').contains('Tekijät').click()
    cy.get('.ui.input.hakukentta').within(() =>
      cy.get('input[type="text"]').type('Asch')
    )
    cy.get('button').contains('Hae').click()
    cy.get('button').contains('Poista suodatus').should('exist')
    cy.get('.menuitem').contains('Asch')
  })

  
  it('test Teoksen nimi search with text *sapho*', () => {
    cy.get('button').contains('Kulttuurituotteet').click()
    cy.get('.ui.input.hakukentta').within(() =>
      cy.get('input[type="text"]').type('*sapho*')
    )
    cy.get('button').contains('Hae').click()
    cy.get('button').contains('Poista suodatus').should('exist')
    cy.get('.menuitem').contains('Aaria Sapho-oopperasta')
  })

  

  it('test letter filtering, 4 letters in test', () => {
    const letters = ['A', 'H', 'P', 'Ö',]

    cy.get('button').contains('Tekijät').click()
    for( const letter of letters) {
      cy.get('.hakukirjain').contains(letter).click()
      cy.get('button').contains('Poista suodatus').click()
    }
  })

})
