const Router = require('express').Router;

const api = Router();

api.use('/', require('./rootProtected.js'));

module.exports = api;
