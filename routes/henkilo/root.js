const { Router } = require('express');
const henkilo = require('../../controllers/henkilo');

const api = Router();

api.get('/', henkilo.listaaHenkilot);

module.exports = api;
