const Router = require('express').Router;

const organisaatioController = require('../../controllers/organisaatioController');

const api = Router();

// ORGANISAATIOT
// GET: palauttaa kaikki tietokannassa olevat organisaatiot ja niiden tapahtumat
api.get('/', organisaatioController.listOrganizations);

module.exports = api;
