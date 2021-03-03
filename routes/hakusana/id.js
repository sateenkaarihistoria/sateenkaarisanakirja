const {Router} = require('express');

const hakusana = require('../../controllers/hakusana');

// Linkittyy /api/hakusana
const api = Router( {mergeParams: true} );

// /api/hakusana/:id
// GET: palauttaa yhden tietokannassa olevan hakusanan
// @param: id
api.get('/',
  hakusana.hakuSanaTiedot);

module.exports = api;
