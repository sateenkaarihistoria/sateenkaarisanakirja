/// <reference types="cypress" />

// Kun backend ja frontend ovat käynnissä, käynnistä Cypress komennolla:
// CYPRESS_API_USER=Admintunnus CYPRESS_API_PASS=salasana npm run e2e
// jossa syötetään käyttäjän tunnus ja salasana, jotta tämän tiedoston testit voidaan ajaa
// Jos haluaa ajaa testit Cypressin graafisen test runnerin avulla, käytä komentoa:
// CYPRESS_API_USER=Admintunnus CYPRESS_API_PASS=salasana npm run e2e:open

let API_USER = Cypress.env('API_USER')
let API_PASS = Cypress.env('API_PASS')


const loginAdmin = () => {
    cy.get('input[type="text"').type(API_USER)
    cy.get('input[type="password"]').type(API_PASS)
    cy.get('button').contains('Kirjaudu').click()
}

const logOut = () => {
    cy.get('.ui.floating.dropdown').click()
    cy.contains('Kirjaudu ulos').click()
}

context('Admin', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/kirjautuminen')
    })

    it('try to login with wrong username and password, get error message', () => {
        cy.get('input[type="text"]').type('userName')
        cy.get('input[type="password"]').type('wrongPassword')
        cy.get('button').contains('Kirjaudu').click()
        cy.get('.negative.message').contains('Tarkista käyttäjätunnus ja salasana.')
        cy.location('pathname').should('include', 'kirjautuminen')
    })

    it('can login with correct username and password', () => {
        cy.get('input[type="text"').type(API_USER)
        cy.get('input[type="password"]').type(API_PASS)
        cy.get('button').contains('Kirjaudu').click()
        cy.location('pathname').should('include', 'sanakirja')
        cy.get('.item').contains('Sanalomake')

        logOut()
    })

    it('logged in user can fill Sanalomake form', () => {
        loginAdmin()
        cy.wait(300)
        cy.location('pathname').should('include', 'sanakirja')
        cy.visit('http://localhost:3000/sanalomake')
        cy.get('button').contains('Lisää sana').click()
        cy.wait(300)
        cy.get('input[name="sanaluokka"]').type('Verbi')
        // koska kentässä lukee jo HS19, niin jatketaan siihen perään
        // lehden nimi, vuosi, kk, päivä ja lehden sivunumero
        cy.get('input[name="paivays"]').type('321001010')
        cy.wait(300)
        cy.get('input[name="hs_osio"]').type('Kulttuuri')
        cy.get('input[name="hakusana"]').type('TESTI E2E: SANALOMAKKEEN TÄYTTÖ')
        cy.wait(300)
        cy.get('textarea[name="selitemuokkaus"]').type('testi')
        cy.wait(300)
        // syötetään asiasana
        cy.get('input[name="kuvaus"]').type('Testi')
        cy.wait(300)
        cy.get('input[name="tyyli"]').type('vanhahtava ilmaisu')
        cy.wait(300)
        cy.get('input[name="kayttoala"]').type('historia')
        cy.get('input[name="lause"]').type('testi')
        cy.wait(300)
        cy.get('textarea[name="viesti"]').type('testiviesti')
        cy.wait(300)
        cy.get('button').contains('Tallenna').click()

        logOut()
    }) 

    it('when logged in, should find Päivitä and Poista buttons', () => {
        loginAdmin()
        cy.location('pathname').should('include', 'sanakirja')
        cy.get('.left.aligned.six.wide.column').contains('abnormisuus').click()
        cy.get('button').contains('Päivitä').should('exist')
        cy.get('button').contains('Poista').should('exist')

        logOut()
    })


    it('log in and find sanalomake, log out and fail to find sanalomake', () => {
        loginAdmin()
        cy.location('pathname').should('include', 'sanakirja')
        cy.visit('http://localhost:3000/sanalomake')
        cy.location('pathname').should('include', 'sanalomake')
        logOut()
        cy.visit('http://localhost:3000/sanalomake')
        cy.wait(300)
        cy.location('pathname').should('include', 'kirjautuminen')
    })
})