const {haeHakuSanat} = require('../models/hakusana');

exports.hakuSanaLista = async (req, res, next) => {
  const {alkuvuosi, loppuvuosi} = req.body;
  const lista = await haeHakuSanat(alkuvuosi, loppuvuosi);
  res.status(200).json(lista);
}
