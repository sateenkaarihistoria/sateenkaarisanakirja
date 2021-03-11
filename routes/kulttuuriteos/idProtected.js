const { Router } = require('express');

const kulttuuriteosController = require('../../controllers/kulttuuriteosController');
const validointiController = require('../../controllers/validointiController');
const loginController = require('../../controllers/loginController');
const yleinenController = require('../../controllers/yleinenController');
const inputController = require('../../controllers/inputController');

const api = Router({ mergeParams: true });
api.use(loginController.etsiToken, loginController.tarkistaToken);

// PUT: muutetaan yhden kulttuuriteoksen tietoja
// @param: id
// @body: JSON-objekti: kuvaus, teos_maa, teos_paikkakunta, nimi, lajityyppi, viesti, valmis
api.put(
  '/',
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
api.delete(
  '/',
  validointiController.tarkistaParam,
  kulttuuriteosController.poistaHenkiloYhteys,
  kulttuuriteosController.deleteCulture,
  yleinenController.poistaAsiasana,
  kulttuuriteosController.deletePeople,
  yleinenController.poistaSijainti,
  kulttuuriteosController.poistoVastaus
);

module.exports = api;
