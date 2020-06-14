'use strict';
require('dotenv').config();
// Haetaan tietokantayhteys config.js:stä
const connection = require('../config.js');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const saltRounds = parseInt(process.env.SALTROUNDS);

// Funktio hakee tietokannasta kaikki käyttäjät
exports.haeKaikkiKayttajat = function (req, res, next) {
  connection.query('SELECT * FROM kayttaja', (error, results) => {
    if (error) {
      next(error);
    }
    else if (!results.rows[0]) {
      console.log('Ei löydetty käyttäjiä');
      res.status(404).json({ 'status' : 404, error: 'Ei löydetty käyttäjiä' });
    }
    else {
      res.status(200).json(results.rows);
    }
  })
}

// Funktio hakee tietokannasta yhden käyttäjän ID:n perusteella
exports.haeKayttaja = function (req, res, next) {
  connection.query('SELECT * FROM kayttaja WHERE id = $1', [req.params.id], (error, results) => {
    if (error) {
      next(error);
    }
    else if (!results.rows[0]) {
      console.log('Käyttäjää ei löydetty');
      res.status(404).json({ 'status' : 404, error: 'Käyttäjää ei löydetty' });
    }
    else {
      res.status(200).json(results.rows[0]);
    }
  })
}

// Funktio luo uuden käyttäjän tietokantaan
exports.uusiKayttaja = function (req, res, next) {
  if (req.body.nimi && req.body.salasana && req.body.rooli) {
    const { nimi, salasana, rooli } = req.body;
    const kysely = 'INSERT INTO kayttaja (nimi, salasana, rooli) VALUES ($1, $2, $3) RETURNING *';

    bcrypt.hash(salasana, saltRounds, function (err, hash) {
      const salattuSana = hash;

      connection.query(kysely, [nimi, salattuSana, rooli], (error, results) => {
        if (error) {
          return next(error);
        }
        else {
          console.log('Käyttäjä lisätty');
          res.status(201).json(results.rows[0]);
        }
      })
    });
  }
  else {
    console.log('Pyynnöstä puuttuu parametreja');
    res.status(400).json({ 'status' : 400, error: 'Pyynnöstä puuttuu parametreja' });
  }
}

// Funktio päivittää yhden ID:n perusteella tunnistetun käyttäjän tietoja
exports.muutaKayttaja = function (req, res, next) {
  // Keskeytetään pyyntö, jos siitä puuttuu parametreja
  if (!req.body.nimi && !req.body.rooli) {
    console.log('Pyynnöstä puuttuu parametreja');
    return res.status(400).json({ 'status' : 400, error: 'Pyynnöstä puuttuu parametreja' });
  }

  const kysely = 'UPDATE kayttaja SET nimi = $1, rooli = $2 WHERE id = $3 RETURNING *';

  connection.query(kysely, [req.body.nimi, req.body.rooli, req.params.id], (error, results) => {
    if (error) {
      return next(error);
    }
    else if (!results.rows[0]) {
      console.log('Käyttäjää ei löydetty');
      res.status(404).json({ 'status' : 404, error: 'Käyttäjää ei löydetty' });
    }
    else {
      console.log('Käyttäjän tiedot päivitetty');
      res.status(200).json(results.rows[0]);
    }
  })
}

// Funktio päivittää käyttäjän omia tietoja
exports.muutaOmatTiedot = function (req, res, next) {
  if (req.body.nimi && req.body.uusiSalasana) {
    const { nimi, uusiSalasana } = req.body;
    const kysely = 'UPDATE kayttaja SET nimi = $1, salasana = $2 WHERE id = $3 RETURNING *';

    bcrypt.hash(uusiSalasana, saltRounds, function (err, hash) {
      const salattuSana = hash;

      connection.query(kysely, [nimi, salattuSana, req.params.id], (error, results) => {
        if (error) {
          return next(error);
        }
        else if (!results.rows[0]) {
          console.log('Käyttäjää ei löydetty');
          res.status(404).json({ 'status' : 404, error: 'Käyttäjää ei löydetty' });
        }
        else {
          console.log('Käyttäjän tiedot päivitetty');
          res.status(200).json(results.rows[0]);
        }
      })
    });
  }
  else {
    console.log('Pyynnöstä puuttuu parametreja');
    res.status(400).json({ 'status' : 400, error: 'Pyynnöstä puuttuu parametreja' });
  }
}

// Funktio poistaa yhden käyttäjän ID:n perusteella
exports.poistaKayttaja = function (req, res, next) {
  connection.query('DELETE FROM kayttaja WHERE id = $1', [req.params.id], (error, results) => {
    if (error) {
      return next(error);
    }
    else if (results.rowCount === 0) {
      console.log('Käyttäjää ei löydetty');
      res.status(404).json({ 'status' : 404, error: 'Käyttäjää ei löydetty' });
    }
    else {
      console.log('Käyttäjä poistettu');
      res.sendStatus(204);
    }
  })
}

// Funktio Admin-käyttäjän automaattista luomista varten
exports.luoAdmin = function (req, res, next) {
  if (req.body.salasana) {
    connection.query('SELECT * FROM kayttaja WHERE nimi = $1', ['Admin'], (error, results) => {
      if (error) {
        next(error);
      }
      else if (results.rowCount !== 0) {
        console.log('Admin on jo luotu');
        res.status(403).json({ 'status' : 403, error: 'Admin on jo luotu' });
      }
      else {
        req.body.nimi = 'Admin';
        req.body.rooli = 'admin';
        next();
      }
    })
  }
  else {
    console.log('Pyynnöstä puuttuu parametreja');
    res.status(400).json({ 'status' : 400, error: 'Pyynnöstä puuttuu parametreja' });
  }
}

// Funktio sanitoi ja validoi syötetyn datan
exports.tarkistaData = [
  body('nimi').trim().escape().isLength({ min: 1 }).withMessage('Nimi ei saa olla tyhjä'),
  body('salasana').trim().escape().isLength({ min: 8 }).withMessage('Salasanan pitää olla 8 vähintään merkkiä'),
  body('rooli').trim().escape().isIn(['admin', 'tutkija']).withMessage('Ei sallittu rooli'),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];

exports.tarkistaMuutos = [
  body('nimi').trim().escape().isLength({ min: 1 }).withMessage('Nimi ei saa olla tyhjä'),
  body('rooli').trim().escape().isIn(['admin', 'tutkija']).withMessage('Ei sallittu rooli'),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];

// Funktio sanitoi ja validoi syötetyn datan omien tietojen muutoksen yhteydessä
exports.tarkistaOmaMuutos = [
  body('nimi').trim().escape().isLength({ min: 1 }).withMessage('Nimi ei saa olla tyhjä'),
  body('salasana').trim().escape().isLength({ min: 8 }).withMessage('Vanhan salasanan pitää olla 8 vähintään merkkiä'),
  body('uusiSalasana').trim().escape().isLength({ min: 8 }).withMessage('Uuden salasanan pitää olla 8 vähintään merkkiä'),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];