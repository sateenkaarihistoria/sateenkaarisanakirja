const Router = require('express').Router;

const organisaatioController = require('../../controllers/organisaatioController');
const validointiController = require('../../controllers/validointiController');

// Linkittyy /api/hakusana
const api = Router( {mergeParams: true} );

api.get('/',
  validointiController.tarkistaParam,
  organisaatioController.returnOrganization
);

module.exports = api;
