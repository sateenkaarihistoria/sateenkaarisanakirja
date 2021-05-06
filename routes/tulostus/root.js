const { Router } = require("express");

const tulostusController = require("../../controllers/tulostusController");

const api = Router();

api.get("/", tulostusController.tulostaSanat);
api.get("/teokset", tulostusController.tulostaTeokset);

module.exports = api;
