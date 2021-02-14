const hakusana = require('../models/hakusana.js');

exports.haeLista = async (alku = 0, loppu = 9999) => {
  const alkuPvm = new Date(alku, 1, 1);
  const loppuPvm = new Date(loppu, 12, 31);
  const paluu = await hakusana.haeHakuSanat(alkuPvm, loppuPvm);
  return paluu;
}
