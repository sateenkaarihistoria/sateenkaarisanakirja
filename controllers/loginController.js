'use strict';
require('dotenv').config();
// Haetaan tietokantayhteys config.js:stä
const connection = require('../config.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const jwtSecret = process.env.JWT_SECRET;

// Funktio etsii tietokannasta käyttäjän annetun nimen perusteella
exports.etsiKayttaja = function (req, res, next) {
  connection.query('SELECT * FROM kayttaja WHERE nimi = $1', [req.body.nimi], (error, results) => {
    if (error) {
      next(error);
    }
    else if (!results.rows[0]) {
      console.log('Käyttäjää ei löydetty');
      res.status(404).json({ 'status' : 404, error: 'Käyttäjää ei löydetty' });
    }
    else {
      req.user = results.rows[0];
      next();
    }
  })
}

// Funktio etsii tietokannasta käyttäjän tiedot annetun Id:n perusteella
exports.etsiOmatTiedot = function (req, res, next) {
  connection.query('SELECT * FROM kayttaja WHERE id = $1', [req.params.id], (error, results) => {
    if (error) {
      next(error);
    }
    else if (!results.rows[0]) {
      console.log('Käyttäjää ei löydetty');
      res.status(404).json({ 'status' : 404, error: 'Käyttäjää ei löydetty' });
    }
    else {
      req.user = results.rows[0];
      next();
    }
  })
}

// Funktio tarkistaa lähetetyn salasanan
exports.tarkistaSalasana = function (req, res, next) {
  // Tarkistetaan käyttäjän salasana
  bcrypt.compare(req.body.salasana, req.user.salasana, function (err, result) {
    if (result) {
      next();
    }
    else {
      console.log(req);
      console.log('Nimi ja salasana eivät täsmää');
      res.sendStatus(401);
    }
  });
}

// Funktio luo JSON Web Tokenin sekä lähettää tokenin ja käyttäjän tiedot takaisin selaimelle
exports.login = function (req, res, next) {
  const payload = { sub: req.user.id, nimi: req.user.nimi, rooli: req.user.rooli };
  const options = { algorithm: 'HS256', expiresIn: '1h' };

  // Luodaan JWT-token etukäteen alustetuilla tiedoilla
  jwt.sign(payload, jwtSecret, options, function (err, token) {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }
    res.status(200).json({ 'token' : token, 'id' : req.user.id, 'nimi' : req.user.nimi, 'rooli' : req.user.rooli })
  })
}

// Funktio tarkistaa, että pyynnössä on mukana JWT-token
exports.etsiToken = function  (req, res, next) {
  // Jos pyynnöstä puuttuu oikeanlaiset headerit, hylätään pyyntö
  if (!req.headers.authorization) {
    console.log('Tunnistus headerit puuttuvat');
    return res.sendStatus(401);
  }

  // Jos pyynnön headerit ovat oikenlaiset, otetaan JWT-token headerista ja lisätään se request objektiin
  if (req.headers.authorization.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];

    req.token = token;
    next();
  }
  else {
    console.log('Virheelliset headerit');
    res.sendStatus(403);
  }
}

// Funktio tarkistaa, onko pyynnön mukana lähetetty token validi
exports.tarkistaToken = function (req, res, next) {
  jwt.verify(req.token, jwtSecret, function (err, decoded) {
    if (err) {
      console.log('Virhe JWT-tokenissa');
      res.sendStatus(403);
    }
    else {
      // Lisätään request objektiin tokenista dekoodatut tiedot
      req.locals = decoded;
      next();
    }
  });
}

// Funktio päivittää vanhan JWT-tokenin uuteen JWT-tokeniin
exports.uusiToken = function (req, res, next) {
  if (req.token) {
    const payload = { sub: req.locals.sub, nimi: req.locals.nimi, rooli: req.locals.rooli };
    const options = { algorithm: 'HS256', expiresIn: '1h' };

    // Luodaan JWT-token etukäteen alustetuilla tiedoilla ja palautetaan se selaimelle
    jwt.sign(payload, jwtSecret, options, function (err, token) {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }
      // Päivitetään pyynnön mukana lähetetty vanha JWT-token uuteen JWT-tokeniin
      req.token = token;
      next();
    })
  }
  else {
    console.log('Ei löydetty toimivaa tokenia');
    res.sendStatus(401);
  }
}

// Funktio tarkistaa onko pyynnöllä oikeuksia pyydettyyn resurssiin
exports.tarkistaOikeudet = function (req, res, next) {
  // Salli jos käyttäjä on admin
  if (req.locals.rooli === 'admin') {
    next();
  }
  // Salli jos pyydetty resurssi kuuluu käyttäjälle
  else if (parseInt(req.params.id) === req.locals.sub) {
    next();
  }
  else {
    console.log('Ei käyttöoikeutta');
    res.sendStatus(403);
  }
}

// Funktio tarkistaa onko pyynnön lähettäjä admin
exports.tarkistaAdmin = function (req, res, next) {
  if (req.locals.rooli === 'admin') {
    next();
  }
  else {
    console.log('Ei käyttöoikeutta');
    res.sendStatus(403);
  }
}

// Funktio tarkistaa omistaako pyytäjä resurssin
exports.tarkistaOmistajuus = function (req, res, next) {
  // Salli jos pyydetty resurssi kuuluu käyttäjälle
  if (parseInt(req.params.id) === req.locals.sub) {
    next();
  }
  else {
    console.log('Ei käyttöoikeutta');
    res.sendStatus(403);
  }
}

// Funktio tarkistaa, että pyynnössä on tarvittavat parametrit
exports.tarkistaParametrit = function (req, res, next) {
  // Hylätään pyyntö, jos se ei sisällä sekä nimeä että salasanaa
  if (!req.body.nimi || !req.body.salasana) {
    return res.status(400).json({ error: 'Parametreja puuttuu' });
  }
  else {
    next();
  }
}

// Funktio trimmaa pyynnöstä tyhjät merkit ja sanitoi parametrit
exports.sanitoiParametrit = [
  body('nimi').trim().escape(),
  body('salasana').trim().escape(),
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