const Router = require('express').Router;


const api = Router();

api.use('/:id', require('./idProtected.js'));

module.exports = api;
