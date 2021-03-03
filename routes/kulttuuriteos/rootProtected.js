const Router = require('express').Router;

const kulttuuriteosController = require('../../controllers/kulttuuriteosController');
const loginController = require('../../controllers/loginController');
const validointiController = require('../../controllers/validointiController');
const inputController = require('../../controllers/inputController');


const api = Router();
api.use(loginController.etsiToken, loginController.tarkistaToken);

// KULTTUURITEOKSET
// POST: lisätään tietokantaan yksi kulttuuriteos ja sen tekijä
// @body: JSON-objekti: etunimi, sukunimi, ammattinimike, henkilo_maa, henkilo_paikkakunta, nimi, lajityyppi,
// teos_maa, teos_paikkakunta, kuvaus, viesti, valmis
api.post('/',
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

module.exports = api;
