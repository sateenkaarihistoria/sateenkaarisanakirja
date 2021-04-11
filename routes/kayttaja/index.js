const { Router } = require('express');

const api = Router();

api.use('/:id', require('./id.js'));
// /api/kayttaja
api.use('/', require('./root.js'));

api.use('/oma/:id', require('./oma.js'));

module.exports = api;
