const { Router } = require('express');

// Linkittyy /api/hakusana
const api = Router();

// /api/henkilo/:id¨
api.use('/', require('./root'));
api.use('/:id', require('./id.js'));
api.use('/:id', require('./idProtected.js'));

module.exports = api;
