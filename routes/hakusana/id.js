const Router = require('express').Router;

const asiasanaController = require('../../controllers/asiasanaController');
const validointiController = require('../../controllers/validointiController');

// Linkittyy /api/hakusana
const api = Router( {mergeParams: true} );

// /api/hakusana/:id
// GET: palauttaa yhden tietokannassa olevan hakusanan
// @param: id
api.get('/',
  validointiController.tarkistaParam,
  asiasanaController.returnWord);

module.exports = api;
