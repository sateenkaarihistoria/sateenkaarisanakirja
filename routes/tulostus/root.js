const { Router } = require("express");

const tulostusController = require("../../controllers/tulostusController");
/*const asiasanaController = require("../../controllers/asiasanaController");

const validator = require("../../controllers/validointiController.js");
const hakusana = require("../../controllers/hakusana");
*/

const api = Router();

api.get("/", tulostusController.tulostaSanat);
//api.get("/", validator.vuosiluvut, hakusana.hakuKaikki);

module.exports = api;
