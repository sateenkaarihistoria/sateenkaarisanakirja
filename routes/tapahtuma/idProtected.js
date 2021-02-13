const Router = require('express').Router;

const organisaatioController = require('../../controllers/organisaatioController');
const validointiController = require('../../controllers/validointiController');
const loginController = require('../../controllers/loginController');
const yleinenController = require('../../controllers/yleinenController');
const inputController = require('../../controllers/inputController');


// Linkittyy /api/hakusana
const api = Router( {mergeParams: true} );
api.use(loginController.etsiToken, loginController.tarkistaToken);


// PUT: muutetaan yhden tapahtuman tietoja
// @param: id
// @body: JSON-objekti: tapahtuma_nimi, luonne, paivays, kuvaus, viesti, valmis
api.put('/',
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
api.delete('/',
  validointiController.tarkistaParam,
  organisaatioController.deleteEvent,
  yleinenController.poistaAsiasana,
  organisaatioController.onkoViimeinen,
  organisaatioController.deleteOrganization,
  yleinenController.poistaSijainti,
  organisaatioController.poistoVastaus
);

module.exports = api;
