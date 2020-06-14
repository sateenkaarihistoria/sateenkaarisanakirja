//haetaan tietokantayhteys config.js:stä
const connection = require('../config.js');

'use strict';

// Palautetaan asiasanat
exports.returnAsiasana = function (req, res, next) {
  connection.query('SELECT DISTINCT kuvaus FROM asiasana', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let asiasana = {"kuvaus": []}
      for (let i in results.rows) {
        asiasana.kuvaus.push(results.rows[i].kuvaus)
        if (results.rows.length - i === 1) {
          req.tieto.push(asiasana)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan paikkakunnat
exports.returnPaikkakunta = function (req, res, next) {
    connection.query('SELECT DISTINCT paikkakunta FROM sijainti', (error, results) => {
      if (error) {
        next(error)  
      } else {
        let paikkakunta = {"paikkakunta": []}
        for (let i in results.rows) {
          paikkakunta.paikkakunta.push(results.rows[i].paikkakunta)
          if (results.rows.length - i === 1) {
            req.tieto.push(paikkakunta)
            next()
          }
        }
        if (results.rows.length === 0) {
          next()
        }
      }
    })
}

// Palautetaan maat
exports.returnMaa = function (req, res, next) {
    connection.query('SELECT DISTINCT maa FROM sijainti', (error, results) => {
      if (error) {
        next(error)  
      } else {
        let maa = {"maa": []}
        for (let i in results.rows) {
          maa.maa.push(results.rows[i].maa)
          if (results.rows.length - i === 1) {
            req.tieto.push(maa)
            next()
          }
        }
        if (results.rows.length === 0) {
          next()
        }
      }
    })
}