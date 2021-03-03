const Router = require('express').Router;

const loginController = require('../../controllers/loginController');
const kayttajaController = require('../../controllers/kayttajaController');

// Linkittyy /api/hakusana
const api = Router( {mergeParams: true} );

api.use(loginController.etsiToken, loginController.tarkistaToken);
// /api/hakusana/:id
// GET: palauttaa yhden tietokannassa olevan hakusanan
// @param: id
api.put('/',
  loginController.tarkistaOmistajuus,
  kayttajaController.tarkistaOmaMuutos,
  loginController.etsiOmatTiedot,
  loginController.tarkistaSalasana,
  kayttajaController.muutaOmatTiedot
);

module.exports = api;
