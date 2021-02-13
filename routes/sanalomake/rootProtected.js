const Router = require('express').Router;

const loginController = require('../../controllers/loginController');
const lomakeController = require('../../controllers/lomakeController.js');
const sLomakeController = require('../../controllers/sanalomakeController.js');




const api = Router();
api.use(loginController.etsiToken, loginController.tarkistaToken);

// Hakusanan resurssit typeaheadia varten
// GET:
api.get('/',
  sLomakeController.returnPaivays,
  sLomakeController.returnHS_osio,
  sLomakeController.returnHakusana,
  sLomakeController.returnSelite,
  lomakeController.returnAsiasana,
  sLomakeController.returnSanaluokka,
  sLomakeController.returnTyyli,
  sLomakeController.returnKayttoala,
  sLomakeController.returnLause
);

module.exports = api;
