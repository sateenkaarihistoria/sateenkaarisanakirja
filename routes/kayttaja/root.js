const Router = require('express').Router;

const loginController = require('../../controllers/loginController');
const kayttajaController = require('../../controllers/kayttajaController');

const api = Router();

api.use(loginController.etsiToken, loginController.tarkistaToken);

// GET: palauttaa kaikki tietokannan käyttäjät, vaatii admin-oikeudet
api.get('/', loginController.tarkistaAdmin, kayttajaController.haeKaikkiKayttajat);

// POST: lisätään yksi uusi käyttäjä tietokantaan, vaatii admin-oikeudet
// @body: JSON-objekti: nimi, salasana, rooli
api.post('/',
  loginController.tarkistaAdmin,
  kayttajaController.tarkistaData,
  kayttajaController.uusiKayttaja
);

module.exports = api;
