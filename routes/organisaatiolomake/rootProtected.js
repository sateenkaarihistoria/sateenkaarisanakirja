const Router = require('express').Router;

const loginController = require('../../controllers/loginController');
const lomakeController = require('../../controllers/lomakeController.js');
const oLomakeController = require('../../controllers/organisaatiolomakeController.js');




const api = Router();
api.use(loginController.etsiToken, loginController.tarkistaToken);

// Organisaation resurssit typeaheadia varten
// GET:
api.get('/',
  oLomakeController.returnOrgNimi,
  lomakeController.returnAsiasana,
  oLomakeController.returnTapahtumaNimi,
  oLomakeController.returnTapahtumaLuonne,
  lomakeController.returnPaikkakunta,
  lomakeController.returnMaa,
  oLomakeController.returnVuosi
);

module.exports = api;
