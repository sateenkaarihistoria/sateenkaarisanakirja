const { Router } = require("express");

const tulostus = require("../../controllers/tulostusController");


const api = Router();

api.get("/", tulostus.tulostaSanat);

module.exports = api;
