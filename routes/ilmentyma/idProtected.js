const Router = require('express').Router;

const asiasanaController = require('../../controllers/asiasanaController');
const validointiController = require('../../controllers/validointiController');
const loginController = require('../../controllers/loginController');
const yleinenController = require('../../controllers/yleinenController');
const inputController = require('../../controllers/inputController');


// Linkittyy /api/hakusana
const api = Router( {mergeParams: true} );
api.use(loginController.etsiToken, loginController.tarkistaToken);


// PUT: muutetaan yhden ilmentymän tietoja
// @param: id
// @body: JSON-objekti: hs_osio, paivays, selite, tyyli, kayttoala, lause, kuvaus, viesti, valmis
api.put('/',
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
api.delete('/',
  validointiController.tarkistaParam,
  asiasanaController.deleteOccurence,
  yleinenController.poistaAsiasana,
  asiasanaController.onkoViimeinen,
  asiasanaController.deleteWord
);

module.exports = api;
