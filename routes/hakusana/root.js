const { Router } = require("express");

const asiasanaController = require("../../controllers/asiasanaController");

const validator = require("../../controllers/validointiController.js");
const hakusana = require("../../controllers/hakusana");

const api = Router();

// /api/hakusana
// GET: palauttaa kaikki tietokannassa olevat hakusanat ja niiden ilmentymät
api.get("/kaikki", asiasanaController.listWords);
api.get("/", validator.vuosiluvut, hakusana.hakuKaikki);

module.exports = api;
