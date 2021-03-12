const model = require('../models/henkilo');

exports.listaaHenkilot = async (req, res) => {
  const tulos = await model.haeHenkilot();
  res.status(200).json({ henkilot: tulos });
};
