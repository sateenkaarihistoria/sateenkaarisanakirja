const { Router } = require('express');

const asiasanaController = require('../../controllers/asiasanaController');
const validointiController = require('../../controllers/validointiController');
const loginController = require('../../controllers/loginController');
const yleinenController = require('../../controllers/yleinenController');

// Linkittyy /api/hakusana
const api = Router({ mergeParams: true });
api.use(loginController.etsiToken, loginController.tarkistaToken);

// PUT: muutetaan yhden hakusanan tietoja
// @param: id
// @body: JSON-objekti: sana, sanaluokka
api.put(
  '/',
  validointiController.tarkistaParam,
  validointiController.tarkistaHakusananMuutos,
  asiasanaController.updateWord,
);

// DELETE: poistetaan yksi hakusana ja sen ilmentymät
// @param: id
api.delete(
  '/',
  validointiController.tarkistaParam,
  asiasanaController.poistaIlmentymat,
  yleinenController.poistaAsiasana,
  asiasanaController.deleteWord,
);

module.exports = api;
