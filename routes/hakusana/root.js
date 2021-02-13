const Router = require('express').Router;

const asiasanaController = require('../../controllers/asiasanaController');

const api = Router();

// /api/hakusana
// GET: palauttaa kaikki tietokannassa olevat hakusanat ja niiden ilmentymät
api.get('/', asiasanaController.listWords);

module.exports = api;
