const model = require('../models/kulttuuriteos');

exports.listaaTeokset = async (req, res) => {
  const tulos = await model.haeTeokset();
  res.status(200).json({ teokset: tulos });
};
