//haetaan tietokantayhteys config.js:stä
const connection = require('../config.js');

'use strict';

// Palautetaan organisaation nimet
exports.returnOrgNimi = function (req, res, next) {
  connection.query('SELECT DISTINCT nimi FROM organisaatio', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let tiedot = [];
      let nimet = {"org_nimi": []};
      for (let i in results.rows) {
        nimet.org_nimi.push(results.rows[i].nimi)
        if (results.rows.length - i === 1) {
          tiedot.push(nimet)
          req.tieto = tiedot
          next()
        }
      }
      if (results.rows.length === 0) {
        req.tieto = tiedot
        next()
      }
    }
  })
}

// Palautetaan tapahtumien nimet
exports.returnTapahtumaNimi = function (req, res, next) {
  connection.query('SELECT DISTINCT nimi FROM tapahtuma', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let tapahtuma_nimi = {"tapahtuma_nimi": []}
      for (let i in results.rows) {
        tapahtuma_nimi.tapahtuma_nimi.push(results.rows[i].nimi)
        if (results.rows.length - i === 1) {
          req.tieto.push(tapahtuma_nimi)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan tapahtumien luonteet
exports.returnTapahtumaLuonne = function (req, res, next) {
  connection.query('SELECT DISTINCT luonne FROM tapahtuma', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let luonne = {"tapahtuma_luonne": []}
      for (let i in results.rows) {
        luonne.tapahtuma_luonne.push(results.rows[i].luonne)
        if (results.rows.length - i === 1) {
          req.tieto.push(luonne)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan tapahtumien paivays
exports.returnVuosi = function (req, res, next) {
  connection.query('SELECT DISTINCT paivays FROM tapahtuma', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let paivays = {"paivays": []}
      for (let i in results.rows) {
        paivays.paivays.push(results.rows[i].paivays)
        if (results.rows.length - i === 1) {
          req.tieto.push(paivays)
          res.status(200).json(req.tieto)
        }
      }
      if (results.rows.length === 0) {
        res.status(200).json(req.tieto)
      }
    }
  })
}
