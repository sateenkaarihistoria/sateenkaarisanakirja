// Apureitti devaukseen
const Router = require('express').Router;

const kayttajaController = require('../../controllers/kayttajaController');

const api = Router();

// POST: luo yhden Admin-nimisen käyttäjän vapaavalintaisella salasanalla, estää useamman käytön
// @body JSON-objekti: salasana
api.post('/', kayttajaController.luoAdmin, kayttajaController.uusiKayttaja);

module.exports = api;
