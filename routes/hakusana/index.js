const Router = require('express').Router;

// Linkittyy /api/hakusana
const api = Router();

// /api/hakusana/:id
api.use('/:id', require('./id.js'));
// /api/hakusana
// GET: palauttaa kaikki tietokannassa olevat hakusanat ja niiden ilmentymät
api.use('/', require('./root.js'));

api.use('/', require('./rootProtected.js'));

api.use('/:id', require('./idProtected.js'));

module.exports = api;
