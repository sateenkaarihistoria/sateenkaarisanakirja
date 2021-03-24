// haetaan tietokantayhteys config.js:stä
const connection = require("../config.js");

("use strict");

exports.tulostaSanat = async function (req, res, next) {
  const result = "Tulostus. Tähän tulee sanalista";
  res.status(200).json(result);
};