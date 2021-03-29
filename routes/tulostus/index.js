const {Router} = require('express');

const api = Router();


// GET api/tulostus palauttaa tulostettavan sanalistan
api.use('/', require('./root.js'));


module.exports = api;