const Router = require('express').Router;

const asiasanaController = require('../../controllers/asiasanaController');
const loginController = require('../../controllers/loginController');
const validointiController = require('../../controllers/validointiController');
const inputController = require('../../controllers/inputController');


const api = Router();
api.use(loginController.etsiToken, loginController.tarkistaToken);

// POST: lisätään tietokantaan yksi hakusana ja sen ilmentymä
// @body: JSON-objekti: hs_osio, paivays, sana, selite, sanaluokka, tyyli, kayttoala, lause,
// kuvaus, viesti, valmis
api.post('/',
  validointiController.tarkistaSananLisays,
  inputController.muunnaSanojenKirjaimet,
  asiasanaController.insertHakusana,
  asiasanaController.tarkistaIlmentyma,
  asiasanaController.insertIlmentyma,
  asiasanaController.addAsiasana,
  loginController.uusiToken,
  asiasanaController.vastaus
);

module.exports = api;
