const Router = require('express').Router;

// Linkittyy /api/hakusana
const api = Router();

api.use('/:id', require('./idProtected.js'));

module.exports = api;
