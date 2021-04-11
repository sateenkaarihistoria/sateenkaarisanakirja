const { Router } = require("express");

const loginController = require('../../controllers/loginController');
const tulostusController = require("../../controllers/tulostusController");

const api = Router();

api.use(loginController.etsiToken, loginController.tarkistaToken);

api.get("/", loginController.tarkistaAdmin, tulostusController.tulostaSanat);
api.get("/teokset", loginController.tarkistaAdmin, tulostusController.tulostaTeokset);

module.exports = api;
