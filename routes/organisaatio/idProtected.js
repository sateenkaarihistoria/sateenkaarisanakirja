const { Router } = require('express');

const organisaatioController = require('../../controllers/organisaatioController');
const validointiController = require('../../controllers/validointiController');
const loginController = require('../../controllers/loginController');
const yleinenController = require('../../controllers/yleinenController');

// Linkittyy /api/hakusana
const api = Router({ mergeParams: true });
api.use(loginController.etsiToken, loginController.tarkistaToken);

// PUT: muutetaan yhden organisaation tietoja
// @param: id
// @body: JSON-objekti: org_nimi, maa, paikkakunta
api.put(
  '/',
  validointiController.tarkistaParam,
  validointiController.tarkistaOrgMuutos,
  organisaatioController.deleteLocation,
  yleinenController.poistaSijainti,
  organisaatioController.addLocation,
  organisaatioController.updateOrg,
);

// DELETE: poistetaan yksi organisaatio
// @param: id
api.delete(
  '/',
  validointiController.tarkistaParam,
  organisaatioController.deleteOrganization,
  yleinenController.poistaAsiasana,
  yleinenController.poistaSijainti,
  organisaatioController.poistoVastaus,
);

module.exports = api;
