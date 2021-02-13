const Router = require('express').Router;

const loginController = require('../../controllers/loginController');
const kayttajaController = require('../../controllers/kayttajaController');

const api = Router( {mergeParams: true} );

api.use(loginController.etsiToken, loginController.tarkistaToken);
// GET: palauttaa yhden käyttäjän tiedot, vaatii admin-oikeudet tai resurssin omistajuuden
// @param: id
api.get('/', loginController.tarkistaOikeudet, kayttajaController.haeKayttaja);

// PUT: muutetaan yhden käyttäjän tietoja, vaatii admin-oikeudet
// @param: id
// @body: JSON-objekti: nimi, rooli
api.put('/',
  loginController.tarkistaAdmin,
  kayttajaController.tarkistaMuutos,
  kayttajaController.muutaKayttaja
);

// DELETE: poistetaan yksi käyttäjä tietokannasta, vaatii admin-oikeudet tai resurssin omistajuuden
// @param: id
api.delete('/', loginController.tarkistaOikeudet, kayttajaController.poistaKayttaja);


module.exports = api;
