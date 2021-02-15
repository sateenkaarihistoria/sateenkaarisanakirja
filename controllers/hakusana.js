const {haeLista, haeSana, haeKaikki} = require('../services/hakusana.js');

exports.hakuSanaLista = async (req, res, next) => {
  const {alkuvuosi, loppuvuosi} = req.body;
  const lista = await haeLista(alkuvuosi, loppuvuosi);
  res.status(200).json(lista);
}

exports.hakuSanaTiedot = async (req, res, next) => {
  const tiedot = await haeSana(req.params.id);
  res.status(200).json(tiedot);
}

exports.hakuKaikki = async (req, res, next) => {
  const tiedot = await haeKaikki();
  const paluu = {"sanat": tiedot};
  res.status(200).json(paluu);
}
