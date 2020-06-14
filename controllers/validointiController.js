'use strict';
const { body, param, validationResult } = require('express-validator');

// Funktio tarkistaa POST kutsun osoitteeseen /api/hakusana
exports.tarkistaSananLisays = [
  body('hs_osio').trim().notEmpty(),
  body('paivays').trim().isLength({ min: 13 }),
  body('sana').trim().notEmpty(),
  body('selite').trim().notEmpty(),
  body('sanaluokka').trim().notEmpty(),
  body('tyyli').trim().notEmpty(),
  body('kayttoala').trim().notEmpty(),
  body('lause').trim().notEmpty(),
  body('kuvaus').trim().notEmpty(),
  body('viesti').trim(),
  body('valmis').isBoolean(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];

// Funktio tarkistaa PUT kutsun osoitteeseen /api/hakusana/:id
exports.tarkistaHakusananMuutos = [
  body('sana').trim().notEmpty(),
  body('sanaluokka').trim().notEmpty(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];

// Funktio tarkistaa PUT kutsun osoitteeseen /api/ilmentyma/:id
exports.tarkistaIlmentymanMuutos = [
  body('hs_osio').trim().notEmpty(),
  body('paivays').trim().isLength({ min: 13 }),
  body('selite').trim().notEmpty(),
  body('tyyli').trim().notEmpty(),
  body('kayttoala').trim().notEmpty(),
  body('lause').trim().notEmpty(),
  body('kuvaus').trim().notEmpty(),
  body('viesti').trim(),
  body('valmis').isBoolean(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];

// Funktio tarkistaa POST kutsun osoitteeseen /api/organisaatio
exports.tarkistaOrgLisays = [
  body('org_nimi').trim().notEmpty(),
  body('maa').trim().notEmpty(),
  body('paikkakunta').trim().notEmpty(),
  body('tapahtuma_nimi').trim().notEmpty(),
  body('luonne').trim().notEmpty(),
  body('paivays').trim().notEmpty(),
  body('kuvaus').trim().notEmpty(),
  body('viesti').trim(),
  body('valmis').isBoolean(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];

// Funktio tarkistaa PUT kutsun osoitteeseen /api/organisaatio/:id
exports.tarkistaOrgMuutos = [
  body('org_nimi').trim().notEmpty(),
  body('maa').trim().notEmpty(),
  body('paikkakunta').trim().notEmpty(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];

// Funktio tarkistaa PUT kutsun osoitteeseen /api/tapahtuma/:id
exports.tarkistaTapahtumaMuutos = [
  body('tapahtuma_nimi').trim().notEmpty(),
  body('luonne').trim().notEmpty(),
  body('paivays').trim().notEmpty(),
  body('kuvaus').trim().notEmpty(),
  body('viesti').trim(),
  body('valmis').isBoolean(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];

// Funktio joka tarkistaa POST kutsun osoitteeseen /api/kulttuuriteos
exports.tarkistaTeosLisays = [
  body('etunimi').trim().notEmpty(),
  body('sukunimi').trim().notEmpty(),
  body('ammattinimike').trim().notEmpty(),
  body('henkilo_maa').trim().notEmpty(),
  body('henkilo_paikkakunta').trim().notEmpty(),
  body('nimi').trim().notEmpty(),
  body('lajityyppi').trim().notEmpty(),
  body('teos_maa').trim().notEmpty(),
  body('teos_paikkakunta').trim().notEmpty(),
  body('kuvaus').trim().notEmpty(),
  body('viesti').trim(),
  body('valmis').isBoolean(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];

// Funktio joka tarkistaa PUT kutsun osoitteeseen /api/kulttuuriteos/:id
exports.tarkistaTeosMuutos = [
  body('kuvaus').trim().notEmpty(),
  body('teos_maa').trim().notEmpty(),
  body('teos_paikkakunta').trim().notEmpty(),
  body('nimi').trim().notEmpty(),
  body('lajityyppi').trim().notEmpty(),
  body('viesti').trim(),
  body('valmis').isBoolean(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];

// Funktio joka tarkistaa PUT kutsun osoitteeseen /api/henkilo/:id
exports.tarkistaHenkiloMuutos = [
  body('etunimi').trim().notEmpty(),
  body('sukunimi').trim().notEmpty(),
  body('ammattinimike').trim().notEmpty(),
  body('henkilo_maa').trim().notEmpty(),
  body('henkilo_paikkakunta').trim().notEmpty(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];

// Funktio tarkistaa kutsun parametrina lähetetyn ID:n
exports.tarkistaParam = [
  param('id').trim().escape().isInt(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('@param control');
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
];