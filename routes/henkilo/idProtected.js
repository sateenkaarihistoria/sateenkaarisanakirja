const Router = require('express').Router;

const kulttuuriteosController = require('../../controllers/kulttuuriteosController');
const validointiController = require('../../controllers/validointiController');
const loginController = require('../../controllers/loginController');
const yleinenController = require('../../controllers/yleinenController');
const inputController = require('../../controllers/inputController');


// Linkittyy /api/hakusana
const api = Router( {mergeParams: true} );
api.use(loginController.etsiToken, loginController.tarkistaToken);


// PUT: muutetaan yhden kulttuuriteoksen tekijän tietoja
// @param: id
// @body: JSON-objekti: etunimi, sukunimi, ammattinimike, henkilo_maa, henkilo_paikkakunta
api.put('/',
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
api.delete('/',
  validointiController.tarkistaParam,
  kulttuuriteosController.deletePerson,
  kulttuuriteosController.deleteTeokset,
  yleinenController.poistaAsiasana,
  yleinenController.poistaSijainti,
  kulttuuriteosController.poistoVastaus
);

module.exports = api;
