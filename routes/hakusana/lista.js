const {Router} = require('express');

const hakusana = require('../../controllers/hakusana');

const api = Router();

// /api/hakusana
// GET: palauttaa kaikki tietokannassa olevat hakusanat ja niiden ilmentymät
api.get('/', hakusana.hakuSanaLista);

module.exports = api;
