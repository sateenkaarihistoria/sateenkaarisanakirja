const Router = require('express').Router;


const api = Router();

// ORGANISAATIOT
// GET: palauttaa kaikki tietokannassa olevat organisaatiot ja niiden tapahtumat
api.use('/', require('./root.js'));
api.use('/', require('./rootProtected.js'));

// GET: palauttaa yhden tietokannassa olevan organisaation
// @param: id
api.use('/:id', require('./id.js'));
api.use('/:id', require('./idProtected.js'));

module.exports = api;
