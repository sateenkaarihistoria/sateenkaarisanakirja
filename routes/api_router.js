
const {Router} = require('@awaitjs/express');

const api = Router();

const loginController = require('../controllers/loginController.js');


// Reitit
api.use('/api/hakusana', require('./hakusana'));

api.use('/api/organisaatio', require('./organisaatio'));

api.use('/api/henkilo', require('./henkilo'));

api.use('/api/kulttuuriteos', require('./kulttuuriteos'));

api.use('/api/kayttaja', require('./kayttaja'));

api.use('/api/ilmentyma', require('./ilmentyma'));

api.use('/api/tapahtuma', require('./tapahtuma'));

api.use('/api/kulttuuriteoslomake', require('./kulttuuriteoslomake'));

api.use('/api/organisaatiolomake', require('./organisaatiolomake'));

api.use('/api/sanalomake', require('./sanalomake'));
// LOGIN
// POST: sovellukseen kirjautuminen
// @body: JSON-objekti: nimi, salasana
api.post('/login',
  loginController.sanitoiParametrit,
  loginController.tarkistaParametrit,
  loginController.etsiKayttaja,
  loginController.tarkistaSalasana,
  loginController.login
);


module.exports = api;
