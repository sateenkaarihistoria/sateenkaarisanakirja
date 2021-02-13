const Router = require('express').Router;

const loginController = require('../../controllers/loginController');
const lomakeController = require('../../controllers/lomakeController.js');
const kLomakeController = require('../../controllers/kulttuuriteosLomakeController.js');




const api = Router();
api.use(loginController.etsiToken, loginController.tarkistaToken);

// Kulttuuriteoksen resurssit typeaheadia varten
// GET:
api.get('/',
  kLomakeController.returnEtunimi,
  kLomakeController.returnSukunimi,
  kLomakeController.returnAmmatti,
  lomakeController.returnAsiasana,
  lomakeController.returnPaikkakunta,
  lomakeController.returnMaa,
  kLomakeController.returnTeosNimi,
  kLomakeController.returnLajityyppi
);

module.exports = api;
