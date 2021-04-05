const { Router } = require('express');

const organisaatioController = require('../../controllers/organisaatioController');
const loginController = require('../../controllers/loginController');
const validointiController = require('../../controllers/validointiController');

const api = Router();
api.use(loginController.etsiToken, loginController.tarkistaToken);

// POST: lisätään tietokantaan yksi organisaatio ja sen tapahtuma
// @body: JSON-objekti: org_nimi, maa, paikkakunta, tapahtuma_nimi, luonne, paivays, kuvaus, viesti, valmis
api.post(
  '/',
  validointiController.tarkistaOrgLisays,
  organisaatioController.insertOrganization,
  organisaatioController.addLocation,
  organisaatioController.tarkistaTapahtuma,
  organisaatioController.insertEvent,
  organisaatioController.addAsiasana,
  loginController.uusiToken,
  organisaatioController.vastaus,
);

module.exports = api;
