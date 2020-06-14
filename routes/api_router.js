'use strict';
const express = require('express');
const api = express.Router();
const asiasanaController = require('../controllers/asiasanaController');
const organisaatioController = require('../controllers/organisaatioController');
const kulttuuriteosController = require('../controllers/kulttuuriteosController');
const kLomakeController = require('../controllers/kulttuuriteosLomakeController.js');
const sLomakeController = require('../controllers/sanalomakeController.js');
const oLomakeController = require('../controllers/organisaatiolomakeController.js');
const lomakeController = require('../controllers/lomakeController.js');
const yleinenController = require('../controllers/yleinenController.js');
const kayttajaController = require('../controllers/kayttajaController.js');
const loginController = require('../controllers/loginController.js');
const validointiController = require('../controllers/validointiController.js');
const inputController =  require('../controllers/inputController.js');

//----------------------------- AVOIMET REITIT -----------------------------//
//////////////////////////////////////////////////////////////////////////////

// Apureitti devaukseen
// POST: luo yhden Admin-nimisen käyttäjän vapaavalintaisella salasanalla, estää useamman käytön
// @body JSON-objekti: salasana
api.post('/api/kayttaja/admin', kayttajaController.luoAdmin, kayttajaController.uusiKayttaja);

// LOGIN
// POST: sovellukseen kirjautuminen
// @body: JSON-objekti: nimi, salasana
api.post('/login', 
  loginController.sanitoiParametrit, 
  loginController.tarkistaParametrit, 
  loginController.etsiKayttaja,
  loginController.tarkistaSalasana,
  loginController.login
);

// HAKUSANAT
// GET: palauttaa kaikki tietokannassa olevat hakusanat ja niiden ilmentymät
api.get('/api/hakusana', asiasanaController.listWords);

// GET: palauttaa yhden tietokannassa olevan hakusanan
// @param: id
api.get('/api/hakusana/:id',
  validointiController.tarkistaParam,
  asiasanaController.returnWord
);

// ORGANISAATIOT
// GET: palauttaa kaikki tietokannassa olevat organisaatiot ja niiden tapahtumat
api.get('/api/organisaatio', organisaatioController.listOrganizations);

// GET: palauttaa yhden tietokannassa olevan organisaation
// @param: id
api.get('/api/organisaatio/:id', 
  validointiController.tarkistaParam,
  organisaatioController.returnOrganization
);

// KULTTUURITEOKSET
// GET: palauttaa kaikki tietokannassa olevat kulttuuriteokset ja niiden tekijät
api.get('/api/kulttuuriteos', kulttuuriteosController.listCulture);

// GET: palauttaa yhden tietokannassa olevan kulttuuriteoksen tekijän
// @param: id
api.get('/api/henkilo/:id',
  validointiController.tarkistaParam,
  kulttuuriteosController.returnHenkilo
);

//------------------------------ SUOJATUT REITIT ----------------------------//
///////////////////////////////////////////////////////////////////////////////

// Kaikki alla olevat reitit vaativat, että käyttäjä on kirjautunut sovellukseen
// Tarkistetaan, että pyynnössä on mukana JWT-token ja tarkistetaan, että token on validi
api.use(loginController.etsiToken, loginController.tarkistaToken);

// KÄYTTÄJÄT
// GET: palauttaa kaikki tietokannan käyttäjät, vaatii admin-oikeudet
api.get('/api/kayttaja', loginController.tarkistaAdmin, kayttajaController.haeKaikkiKayttajat);

// GET: palauttaa yhden käyttäjän tiedot, vaatii admin-oikeudet tai resurssin omistajuuden
// @param: id
api.get('/api/kayttaja/:id', loginController.tarkistaOikeudet, kayttajaController.haeKayttaja);

// POST: lisätään yksi uusi käyttäjä tietokantaan, vaatii admin-oikeudet
// @body: JSON-objekti: nimi, salasana, rooli
api.post('/api/kayttaja', 
  loginController.tarkistaAdmin,
  kayttajaController.tarkistaData,
  kayttajaController.uusiKayttaja
);

// PUT: muutetaan yhden käyttäjän tietoja, vaatii admin-oikeudet
// @param: id
// @body: JSON-objekti: nimi, rooli
api.put('/api/kayttaja/:id',
  loginController.tarkistaAdmin,
  kayttajaController.tarkistaMuutos,
  kayttajaController.muutaKayttaja
);

// PUT: muutetaan yhden käyttäjän nimi ja vaihdetaan salasana, vaatii resurssin omistajuuden
// @body: nimi, vanhaSalasana, uusiSalasana
api.put('/api/kayttaja/oma/:id',
  loginController.tarkistaOmistajuus,
  kayttajaController.tarkistaOmaMuutos,
  loginController.etsiOmatTiedot,
  loginController.tarkistaSalasana,
  kayttajaController.muutaOmatTiedot
);

// DELETE: poistetaan yksi käyttäjä tietokannasta, vaatii admin-oikeudet tai resurssin omistajuuden
// @param: id
api.delete('/api/kayttaja/:id', loginController.tarkistaOikeudet, kayttajaController.poistaKayttaja);

// HAKUSANAT
// POST: lisätään tietokantaan yksi hakusana ja sen ilmentymä
// @body: JSON-objekti: hs_osio, paivays, sana, selite, sanaluokka, tyyli, kayttoala, lause, 
// kuvaus, viesti, valmis
api.post('/api/hakusana',
  validointiController.tarkistaSananLisays,
  inputController.muunnaSanojenKirjaimet,
  asiasanaController.insertHakusana,
  asiasanaController.tarkistaIlmentyma,
  asiasanaController.insertIlmentyma,
  asiasanaController.addAsiasana,
  loginController.uusiToken,
  asiasanaController.vastaus
);

// PUT: muutetaan yhden hakusanan tietoja
// @param: id
// @body: JSON-objekti: sana, sanaluokka
api.put('/api/hakusana/:id', 
  validointiController.tarkistaParam,
  validointiController.tarkistaHakusananMuutos,
  inputController.muunnaSanojenKirjaimet,
  asiasanaController.updateWord
);

// DELETE: poistetaan yksi hakusana ja sen ilmentymät
// @param: id
api.delete('/api/hakusana/:id',
  validointiController.tarkistaParam,
  asiasanaController.poistaIlmentymat,
  yleinenController.poistaAsiasana,
  asiasanaController.deleteWord
);

// PUT: muutetaan yhden ilmentymän tietoja
// @param: id
// @body: JSON-objekti: hs_osio, paivays, selite, tyyli, kayttoala, lause, kuvaus, viesti, valmis
api.put('/api/ilmentyma/:id',
  validointiController.tarkistaParam,
  validointiController.tarkistaIlmentymanMuutos,
  inputController.muunnaSanojenKirjaimet,
  asiasanaController.deleteAsiasana,
  yleinenController.poistaAsiasana,
  asiasanaController.addAsiasana,
  asiasanaController.updateIlmentyma
);

// DELETE: poistetaan yksi ilmentymä ja hakusana, jos ilmentymä oli hakusanan viimeinen ilmentymä
// @param: id
api.delete('/api/ilmentyma/:id',
  validointiController.tarkistaParam,
  asiasanaController.deleteOccurence,
  yleinenController.poistaAsiasana,
  asiasanaController.onkoViimeinen,
  asiasanaController.deleteWord
);

// ORGANISAATIOT
// POST: lisätään tietokantaan yksi organisaatio ja sen tapahtuma
// @body: JSON-objekti: org_nimi, maa, paikkakunta, tapahtuma_nimi, luonne, paivays, kuvaus, viesti, valmis
api.post('/api/organisaatio',
  validointiController.tarkistaOrgLisays,
  inputController.muunnaOrganisaatioidenKirjaimet,
  organisaatioController.insertOrganization,
  organisaatioController.addLocation,
  organisaatioController.tarkistaTapahtuma,
  organisaatioController.insertEvent,
  organisaatioController.addAsiasana,
  loginController.uusiToken,
  organisaatioController.vastaus
);

// PUT: muutetaan yhden organisaation tietoja
// @param: id
// @body: JSON-objekti: org_nimi, maa, paikkakunta
api.put('/api/organisaatio/:id',
  validointiController.tarkistaParam,
  validointiController.tarkistaOrgMuutos,
  inputController.muunnaOrganisaatioidenKirjaimet,
  organisaatioController.deleteLocation,
  yleinenController.poistaSijainti,
  organisaatioController.addLocation,
  organisaatioController.updateOrg
);

// DELETE: poistetaan yksi organisaatio
// @param: id
api.delete('/api/organisaatio/:id',
  validointiController.tarkistaParam,
  organisaatioController.deleteOrganization,
  yleinenController.poistaAsiasana,
  yleinenController.poistaSijainti,
  organisaatioController.poistoVastaus
);

// PUT: muutetaan yhden tapahtuman tietoja
// @param: id
// @body: JSON-objekti: tapahtuma_nimi, luonne, paivays, kuvaus, viesti, valmis
api.put('/api/tapahtuma/:id',
  validointiController.tarkistaParam,
  validointiController.tarkistaTapahtumaMuutos,
  inputController.muunnaOrganisaatioidenKirjaimet,
  organisaatioController.deleteAsiasana,
  yleinenController.poistaAsiasana,
  organisaatioController.addAsiasana,
  organisaatioController.updateEvent
);

// DELETE: poistetaan yksi tapahtuma ja sen organisaatio, jos tapahtuma oli organisaation viimeinen tapahtuma
// @param: id
api.delete('/api/tapahtuma/:id',
  validointiController.tarkistaParam,
  organisaatioController.deleteEvent,
  yleinenController.poistaAsiasana,
  organisaatioController.onkoViimeinen,
  organisaatioController.deleteOrganization,
  yleinenController.poistaSijainti,
  organisaatioController.poistoVastaus
);

// KULTTUURITEOKSET
// POST: lisätään tietokantaan yksi kulttuuriteos ja sen tekijä
// @body: JSON-objekti: etunimi, sukunimi, ammattinimike, henkilo_maa, henkilo_paikkakunta, nimi, lajityyppi,
// teos_maa, teos_paikkakunta, kuvaus, viesti, valmis
api.post('/api/kulttuuriteos',
  validointiController.tarkistaTeosLisays,
  inputController.muunnaKulttuuriteostenKirjaimet,
  kulttuuriteosController.insertHenkilo,
  kulttuuriteosController.addLocation,
  kulttuuriteosController.tarkistaTeos,
  kulttuuriteosController.insertTeos,
  kulttuuriteosController.insertTeosSijainti,
  kulttuuriteosController.addAsiasana,
  loginController.uusiToken,
  kulttuuriteosController.vastaus
);

// PUT: muutetaan yhden kulttuuriteoksen tietoja
// @param: id
// @body: JSON-objekti: kuvaus, teos_maa, teos_paikkakunta, nimi, lajityyppi, viesti, valmis
api.put('/api/kulttuuriteos/:id',
  validointiController.tarkistaParam,
  validointiController.tarkistaTeosMuutos,
  inputController.muunnaKulttuuriteostenKirjaimet,
  kulttuuriteosController.deleteAsiasana,
  yleinenController.poistaAsiasana,
  kulttuuriteosController.addAsiasana,
  kulttuuriteosController.deleteTeosSijainti,
  yleinenController.poistaSijainti,
  kulttuuriteosController.insertTeosSijainti,
  kulttuuriteosController.updateTeos
);

// DELETE: poistetaan yksi kulttuuriteos
// @param: id
api.delete('/api/kulttuuriteos/:id',
  validointiController.tarkistaParam,
  kulttuuriteosController.poistaHenkiloYhteys,
  kulttuuriteosController.deleteCulture,
  yleinenController.poistaAsiasana,
  kulttuuriteosController.deletePeople,
  yleinenController.poistaSijainti,
  kulttuuriteosController.poistoVastaus
);

// PUT: muutetaan yhden kulttuuriteoksen tekijän tietoja
// @param: id
// @body: JSON-objekti: etunimi, sukunimi, ammattinimike, henkilo_maa, henkilo_paikkakunta
api.put('/api/henkilo/:id',
  validointiController.tarkistaParam,
  validointiController.tarkistaHenkiloMuutos,
  inputController.muunnaKulttuuriteostenKirjaimet,
  kulttuuriteosController.deleteLocation,
  yleinenController.poistaSijainti,
  kulttuuriteosController.addLocation,
  kulttuuriteosController.updatePerson
);

// DELETE: poistetaan yksi kulttuurieteoksen tekijä
// @param: id
api.delete('/api/henkilo/:id',
  validointiController.tarkistaParam,
  kulttuuriteosController.deletePerson,
  kulttuuriteosController.deleteTeokset,
  yleinenController.poistaAsiasana,
  yleinenController.poistaSijainti,
  kulttuuriteosController.poistoVastaus
);

// RESURSSIT TYPEAHEADIA VARTEN
// Hakusanan resurssit typeaheadia varten
// GET:
api.get('/api/sanalomake',
  sLomakeController.returnPaivays,
  sLomakeController.returnHS_osio,
  sLomakeController.returnHakusana,
  sLomakeController.returnSelite,
  lomakeController.returnAsiasana,
  sLomakeController.returnSanaluokka,
  sLomakeController.returnTyyli,
  sLomakeController.returnKayttoala,
  sLomakeController.returnLause
);

// Kulttuuriteoksen resurssit typeaheadia varten
// GET:
api.get('/api/kulttuuriteoslomake',
  kLomakeController.returnEtunimi,
  kLomakeController.returnSukunimi,
  kLomakeController.returnAmmatti,
  lomakeController.returnAsiasana,
  lomakeController.returnPaikkakunta,
  lomakeController.returnMaa,
  kLomakeController.returnTeosNimi,
  kLomakeController.returnLajityyppi
);

// Organisaation resurssit typeaheadia varten
// GET:
api.get('/api/organisaatiolomake',
  oLomakeController.returnOrgNimi,
  lomakeController.returnAsiasana,
  oLomakeController.returnTapahtumaNimi,
  oLomakeController.returnTapahtumaLuonne,
  lomakeController.returnPaikkakunta,
  lomakeController.returnMaa,
  oLomakeController.returnVuosi
);

module.exports = api;
