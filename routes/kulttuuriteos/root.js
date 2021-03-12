const { Router } = require('express');
const kulttuuriteos = require('../../controllers/kulttuuriteos');

const api = Router();

// KULTTUURITEOKSET
// GET: palauttaa kaikki tietokannassa olevat kulttuuriteokset ja niiden tekijät
api.get('/', kulttuuriteos.listaaTeokset);

module.exports = api;
