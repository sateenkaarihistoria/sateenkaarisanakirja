//haetaan tietokantayhteys config.js:stä
const connection = require('../config.js');

'use strict';

// Palautetaan sanan ilmentymien paivaykset
exports.returnPaivays = function (req, res, next) {
  connection.query('SELECT DISTINCT sivunumero FROM ilmentyma', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let tiedot = [];
      let paivays = {"paivays": []};
      for (let i in results.rows) {
        paivays.paivays.push(results.rows[i].sivunumero)
        if (results.rows.length - i === 1) {
          tiedot.push(paivays)
          req.tieto = tiedot
          next()
        }
      }
      // Jos ei ole paivayksia
      if (results.rows.length === 0) {
        req.tieto = tiedot
        next()
      }
    }
  })
}

// Palautetaan ilmentymien hs osiot
exports.returnHS_osio = function (req, res, next) {
  connection.query('SELECT DISTINCT hs_osio FROM ilmentyma', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let hs_osio = {"hs_osio": []}
      for (let i in results.rows) {
        hs_osio.hs_osio.push(results.rows[i].hs_osio)
        if (results.rows.length - i === 1) {
          req.tieto.push(hs_osio)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan hakusanat
exports.returnHakusana = function (req, res, next) {
  connection.query('SELECT DISTINCT sana FROM hakusana', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let hakusana = {"hakusana": []}
      for (let i in results.rows) {
        hakusana.hakusana.push(results.rows[i].sana)
        if (results.rows.length - i === 1) {
          req.tieto.push(hakusana)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan ilmentymien selitteet
exports.returnSelite = function (req, res, next) {
  connection.query('SELECT DISTINCT selite FROM ilmentyma', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let selite = {"selite": []}
      for (let i in results.rows) {
        selite.selite.push(results.rows[i].selite)
        if (results.rows.length - i === 1) {
          req.tieto.push(selite)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan hakusanojen sanaluokat
exports.returnSanaluokka = function (req, res, next) {
  connection.query('SELECT DISTINCT sanaluokka FROM hakusana', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let sanaluokka = {"sanaluokka": []}
      for (let i in results.rows) {
        sanaluokka.sanaluokka.push(results.rows[i].sanaluokka)
        if (results.rows.length - i === 1) {
          req.tieto.push(sanaluokka)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan ilmentymien tyylit
exports.returnTyyli = function (req, res, next) {
  connection.query('SELECT DISTINCT tyyli FROM ilmentyma', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let tyyli = {"tyyli": []}
      for (let i in results.rows) {
        tyyli.tyyli.push(results.rows[i].tyyli)
        if (results.rows.length - i === 1) {
          req.tieto.push(tyyli)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan ilmentymien kayttoalat
exports.returnKayttoala = function (req, res, next) {
  connection.query('SELECT DISTINCT kayttoala FROM ilmentyma', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let kayttoala = {"kayttoala": []}
      for (let i in results.rows) {
        kayttoala.kayttoala.push(results.rows[i].kayttoala)
        if (results.rows.length - i === 1) {
          req.tieto.push(kayttoala)
          next()
        }
      }
      if (results.rows.length === 0) {
        next()
      }
    }
  })
}

// Palautetaan ilmentymien lauseet
exports.returnLause = function (req, res, next) {
  connection.query('SELECT DISTINCT lause FROM ilmentyma', (error, results) => {
    if (error) {
      next(error)  
    } else {
      let lause = {"lause": []}
      for (let i in results.rows) {
        lause.lause.push(results.rows[i].lause)
        if (results.rows.length - i === 1) {
          req.tieto.push(lause)
          res.status(200).json(req.tieto)
        }
      }
      if (results.rows.length === 0) {
        res.status(200).json(req.tieto)
      }
    }
  })
}
