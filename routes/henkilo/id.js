const Router = require('express').Router;

const kulttuuriteosController = require('../../controllers/kulttuuriteosController');
const validointiController = require('../../controllers/validointiController');

// Linkittyy /api/hakusana
const api = Router( {mergeParams: true} );

// GET: palauttaa yhden tietokannassa olevan kulttuuriteoksen tekijän
// @param: id
api.get('/',
  validointiController.tarkistaParam,
  kulttuuriteosController.returnHenkilo
);

module.exports = api;
