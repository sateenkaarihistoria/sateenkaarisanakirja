const url = require('url');

const {
  haeLista,
  haeSana,
  haeKaikki,
  haeKaikkiVuosilla,
} = require("../services/hakusana.js");

exports.hakuSanaLista = async (req, res, next) => {
  const { alkuvuosi, loppuvuosi } = req.body;
  const lista = await haeLista(alkuvuosi, loppuvuosi);
  res.status(200).json(lista);
};

exports.hakuSanaTiedot = async (req, res, next) => {
  const tiedot = await haeSana(req.params.id);
  res.status(200).json(tiedot);
};

// Hae kaikki sanat
exports.hakuKaikki = async (req, res, next) => {
//const { alkuvuosi, loppuvuosi } = req.body;
const qstr = url.parse(req.url, true).query;
console.log(qstr);
console.log("hakuKaikki() " + qstr.alkuvuosi, " - " + qstr.loppuvuosi);
const alkuvuosi = qstr.alkuvuosi;
const loppuvuosi = qstr.loppuvuosi;
  let tiedot;
  if (alkuvuosi || loppuvuosi) {
    tiedot = await haeKaikkiVuosilla(alkuvuosi, loppuvuosi);
  } else {
    tiedot = await haeKaikki();
  }
  const paluu = { sanat: tiedot };
  res.status(200).json(paluu);
};
