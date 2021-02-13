const Router = require('express').Router;

// Linkittyy /api/hakusana
const api = Router();

// /api/henkilo/:id
api.use('/:id', require('./id.js'));
api.use('/:id', require('./idProtected.js'))

module.exports = api;
