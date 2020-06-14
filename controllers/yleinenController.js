//haetaan tietokantayhteys config.js:stä
const connection = require('../config.js');

'use strict';

// Poistetaan asiasanat jotka eivat liity yhteenkaan tapahtumaan, teokseen tai ilmentymaan
exports.poistaAsiasana = function (req, res, next) {
  let kysely = 'DELETE FROM asiasana WHERE id NOT IN (SELECT asiasana_id FROM edustaa) AND id NOT IN (SELECT asiasana_id FROM liittyy) AND id NOT IN (SELECT asiasana_id FROM sisaltaa)'
  
  connection.query(kysely, (error, results) => {
    if (error) {
      next(error)
    }
    else {
      next()
    }
  })
}

// Poistetaan sijainnit, jotka eivat liity yhteenkaan organisaatioon teokseen tai henkiloon
exports.poistaSijainti = function (req, res, next) {
  let kysely = 'DELETE FROM sijainti WHERE id NOT IN (SELECT sijainti_id FROM org_toimii) AND id NOT IN (SELECT sijainti_id FROM tapahtuu_teos) AND id NOT IN (SELECT sijainti_id FROM toimii_henkilo)'
  
  connection.query(kysely, (error, results) => {
    if (error) {
      next(error)
    }
    else {
      next()
    }
  })
}
