const Router = require('express').Router;

const kulttuuriteosController = require('../../controllers/kulttuuriteosController');

const api = Router();

// KULTTUURITEOKSET
// GET: palauttaa kaikki tietokannassa olevat kulttuuriteokset ja niiden tekijät
api.get('/', kulttuuriteosController.listCulture);

module.exports = api;
