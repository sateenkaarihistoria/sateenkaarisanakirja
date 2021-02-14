const {haeLista} = require('../services/hakusana.js');

exports.hakuSanaLista = async (req, res, next) => {
  const {alkuvuosi, loppuvuosi} = req.body;
  const lista = await haeLista(alkuvuosi, loppuvuosi);
  res.status(200).json(lista);
}
