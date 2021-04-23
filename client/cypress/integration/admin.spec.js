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

context('Admin and Sanalomake page testing ', () => {
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

    it('when logged in, should find Päivitä and Poista buttons', () => {
        loginAdmin()
        cy.location('pathname').should('include', 'sanakirja')
        cy.get('.left.aligned.six.wide.column').contains('abnormisuus').click()
        cy.get('button').contains('Päivitä').should('exist')
        cy.get('button').contains('Poista').should('exist')

        logOut()
    })

    it('log in and find sanalomake page, log out and fail to find sanalomake page', () => {
        loginAdmin()
        cy.location('pathname').should('include', 'sanakirja')
        cy.visit('http://localhost:3000/sanalomake')
        cy.location('pathname').should('include', 'sanalomake')
        logOut()
        cy.visit('http://localhost:3000/sanalomake')
        cy.wait(300)
        cy.location('pathname').should('include', 'kirjautuminen')
    })

    it('logged in user can fill Sanalomake form and add new word to sanakirja wordlist', () => {
        loginAdmin()
        cy.wait(300)
        cy.location('pathname').should('include', 'sanakirja')
        cy.visit('http://localhost:3000/sanalomake')
        cy.get('button').contains('Lisää sana').click()
        cy.wait(300)

        cy.fixture('sanalomake-test-data.json').then((sanalomakeData) => {
            const sana = sanalomakeData.testiSanat[0]

            cy.get('input[name="sanaluokka"]').type(sana.sanaluokka)
            // koska kentässä lukee jo HS19, niin jatketaan siihen perään
            // lehden nimi, vuosi, kk, päivä ja lehden sivunumero
            cy.get('input[name="paivays"]').type(sana.paivays)
            cy.wait(300)
            cy.get('input[name="hs_osio"]').type(sana.hs_osio)
            cy.get('input[name="hakusana"]').type(sana.hakusana)
            cy.wait(300)
            cy.get('textarea[name="selitemuokkaus"]').type(sana.selite)
            cy.wait(300)
            cy.get('input[name="kuvaus"]').type(sana.asiasana)
            cy.wait(300)
            cy.get('input[name="tyyli"]').type(sana.tyyli)
            cy.wait(300)
            cy.get('input[name="kayttoala"]').type(sana.kayttoala)
            cy.get('input[name="lause"]').type(sana.lause)
            cy.wait(300)
            cy.get('textarea[name="viesti"]').type(sana.viesti)
            cy.wait(300)
            cy.get('button').contains('Tallenna').click()
        })
        cy.contains('Lisäys onnistui').should('exist')
        cy.get('.ui.tiny.modal').contains('Ok').click()
        logOut()
    }) 

    it('remove just created word from sanakirja list', () => {
        loginAdmin()
        cy.location('pathname').should('include', 'sanakirja')

        cy.fixture('sanalomake-test-data.json').then((sanalomakeData) => {
            const sana = sanalomakeData.testiSanat[0]
            cy.get('.left.aligned.six.wide.column').contains(sana.hakusana).click()
            cy.get('button').contains('Päivitä').should('exist')
            cy.get('button').contains('Poista').should('exist')
    
            cy.get('button').contains('Poista').click()
    
            cy.contains('Oletko varma, että haluat poistaa sanan ilmentymineen?').should('exist')
            cy.get('.ui.tiny.modal').contains('Peru').should('exist')
            cy.get('.ui.tiny.modal').contains('Poista').click()
    
            cy.log('Check that word is removed from sanakirja wordlist')
            cy.get('.left.aligned.six.wide.column').should('not.contain', sana.hakusana)
        })
        logOut()
    })

    it('logged in user can fill Kulttuurituotelomake form', () => {
        loginAdmin()
        cy.wait(300)
        cy.location('pathname').should('include', 'sanakirja')
        cy.visit('http://localhost:3000/sanalomake')
        cy.get('button').contains('Lisää kulttuurituote').click()
        cy.wait(300)

        cy.fixture('sanalomake-test-data.json').then((sanalomakeData) => {
            const kulttuuri = sanalomakeData.testiKulttuurituotteet[0]
            cy.get('input[name="etunimi"]').type(kulttuuri.tekija_etunimi)
            cy.get('input[name="sukunimi"]').type(kulttuuri.tekija_sukunimi)
            cy.wait(300)
            cy.get('input[name="ammatti"]').type(kulttuuri.tekija_ammatti)
            cy.get('input[name="paikkakunta"]').type(kulttuuri.tekija_paikkakunta)
            cy.get('input[name="maa"]').type(kulttuuri.tekija_maa)
            cy.get('input[name="teos_nimi"]').type(kulttuuri.teos_nimi)
            cy.wait(300)
            cy.get('input[name="lajityyppi"]').type(kulttuuri.teos_lajityyppi)
            cy.wait(300)
            cy.get('input[name="asiasana"]').type(kulttuuri.teos_asiasana)
            cy.wait(300)
            // force true päällä, koska muuten ei suostunut kirjoittamaan kenttään
            cy.get('input[name="tapahtumapaikkakunta"]').type(kulttuuri.teos_paikkakunta, { force: true })
            cy.wait(300)
            cy.get('input[name="tapahtumamaa"]').type(kulttuuri.teos_tapahtumamaa)
            cy.wait(300)
            cy.get('textarea[name="viesti"]').type(kulttuuri.viesti)
            cy.wait(300)
            cy.get('button').contains('Tallenna').click()
        })

        cy.contains('Lisäys onnistui').should('exist')
        cy.get('.ui.tiny.modal').contains('Ok').click()
        logOut()
    })

    it('remove just created new tekijä and teos from kulttuurituotteet list', () => {
        loginAdmin()
        cy.location('pathname').should('include', 'sanakirja')
        cy.visit('http://localhost:3000/kulttuurituotteet')

        cy.fixture('sanalomake-test-data.json').then((sanalomakeData) => {
            const word = sanalomakeData.testiKulttuurituotteet[0]

            cy.get('button').contains('Kulttuurituotteet').click()
            cy.get('.left.aligned.six.wide.column').contains(word.teos_nimi).click()

            cy.get('button').contains('Päivitä').should('exist')
            cy.get('button').contains('Poista').should('exist')
            cy.get('button').contains('Poista').click()
    
            cy.get('.ui.tiny.modal').contains('Peru').should('exist')
            cy.get('.ui.tiny.modal').contains('Poista').click()
    
            cy.log('Check that it is removed from kulttuurituotteet list')
            cy.get('.left.aligned.six.wide.column').should('not.contain', word.teos_nimi)
        })
        logOut()
    })

    it('logged in user can fill Organisaatiolomake form', () => {
        loginAdmin()
        cy.wait(300)
        cy.location('pathname').should('include', 'sanakirja')
        cy.visit('http://localhost:3000/sanalomake')
        cy.get('button').contains('Lisää organisaatio').click()
        cy.wait(300)

        cy.fixture('sanalomake-test-data.json').then((sanalomakeData) => {
            const org = sanalomakeData.testiOrganisaatiot[0]

            cy.get('input[name="org_nimi"]').type(org.org_nimi)
            cy.get('input[name="paikkakunta"]').type(org.org_paikkakunta)
            cy.wait(300)
            cy.get('input[name="maa"]').type(org.org_maa)
            cy.get('input[name="tapahtuma_nimi"]').type(org.tapahtuma_nimi)
            cy.get('input[name="tapahtuma_luonne"]').type(org.tapahtuma_luonne)
            cy.get('input[name="kuvaus"]').type(org.tapahtuma_asiasana)
            cy.wait(300)
            cy.get('textarea[name="viesti"]').type(org.viesti)
            cy.wait(300)
            cy.get('button').contains('Tallenna').click()
            // lehden nimi, vuosi, kk, päivä esim. HS19321022
            cy.get('input[name="paivays"]').type(org.tapahtuma_paivays)
            cy.wait(300)
            cy.get('button').contains('Tallenna').click()
        })
        cy.contains('Lisäys onnistui').should('exist')
        cy.get('.ui.tiny.modal').contains('Ok').click()
        logOut()
    })

    it('remove just created new organisaatio from organisaatiot list', () => {
        loginAdmin()
        cy.location('pathname').should('include', 'sanakirja')
        cy.visit('http://localhost:3000/organisaatiot')

        cy.fixture('sanalomake-test-data.json').then((sanalomakeData) => {
            const org = sanalomakeData.testiOrganisaatiot[0]

            cy.get('.left.aligned.six.wide.column').contains(org.org_nimi).click()

            cy.get('button').contains('Päivitä').should('exist')
            cy.get('button').contains('Poista').should('exist')
            cy.get('button').contains('Poista').click()
    
            cy.get('.ui.tiny.modal').contains('Peru').should('exist')
            cy.get('.ui.tiny.modal').contains('Poista').click()
    
            cy.log('Check that it is removed from organisaatiot list')
            cy.get('.left.aligned.six.wide.column').should('not.contain', org.org_nimi)
        })
        logOut()
    })
})