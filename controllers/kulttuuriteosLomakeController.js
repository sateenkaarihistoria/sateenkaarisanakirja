//haetaan tietokantayhteys config.js:stä
const connection = require('../config.js');

'use strict';

// Palautetaan kaikki tietokannan etunimet
exports.returnEtunimi = function (req, res, next) {
  connection.query('SELECT DISTINCT etunimi FROM henkilo', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let tiedot = [];
      let nimet = {"etunimi": []};
      for (let i in results.rows) {
        nimet.etunimi.push(results.rows[i].etunimi)
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

// Palautetaan tietokannan sukunimet
exports.returnSukunimi = function (req, res, next) {
  connection.query('SELECT DISTINCT sukunimi FROM henkilo', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let sukunimet = {"sukunimi": []}
      for (let i in results.rows) {
        sukunimet.sukunimi.push(results.rows[i].sukunimi)
        if (results.rows.length - i === 1) {
          req.tieto.push(sukunimet)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan ammatit
exports.returnAmmatti = function (req, res, next) {
  connection.query('SELECT DISTINCT ammattinimike FROM henkilo', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let ammatit = {"ammatti": []}
      for (let i in results.rows) {
        ammatit.ammatti.push(results.rows[i].ammattinimike)
        if (results.rows.length - i === 1) {
          req.tieto.push(ammatit)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan kulttuuriteosten nimet
exports.returnTeosNimi = function (req, res, next) {
  connection.query('SELECT DISTINCT nimi FROM teos', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let nimi = {"teos_nimi": []}
      for (let i in results.rows) {
        nimi.teos_nimi.push(results.rows[i].nimi)
        if (results.rows.length - i === 1) {
          req.tieto.push(nimi)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan kulttuuriteosten lajityypit
exports.returnLajityyppi = function (req, res, next) {
  connection.query('SELECT DISTINCT lajityyppi FROM teos', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let lajityyppi = {"lajityyppi": []}
      for (let i in results.rows) {
        lajityyppi.lajityyppi.push(results.rows[i].lajityyppi)
        if (results.rows.length - i === 1) {
          req.tieto.push(lajityyppi)
          res.status(200).json(req.tieto)
        }
      }
      if (results.rows.length === 0) {
        res.status(200).json(req.tieto)
      }
    }
  })
}
