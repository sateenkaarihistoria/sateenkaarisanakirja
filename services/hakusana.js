const hakusana = require('../models/hakusana.js');

exports.haeLista = async (alku = 0, loppu = 9999) => {
  const alkuPvm = new Date(alku, 0, 1);
  const loppuPvm = new Date(loppu, 11, 31);
  const paluu = await hakusana.haeHakuSanat(alkuPvm, loppuPvm);
  return paluu;
}

exports.haeSana = async (id) => {
  const paluu = await hakusana.haeSananTiedot(id);
  return paluu;
}

exports.haeKaikki = async () => {
  const paluu = await hakusana.haeKaikkiTiedot();
  return paluu;
}

exports.haeKaikkiVuosilla = async (alku = 0, loppu = 9999) => {
  const alkuPvm = new Date(alku, 0, 1);
  const loppuPvm = new Date(loppu, 11, 31);
  const paluu = await hakusana.haeKaikkiTiedotVuosilla(alkuPvm, loppuPvm);
  return paluu;
}
