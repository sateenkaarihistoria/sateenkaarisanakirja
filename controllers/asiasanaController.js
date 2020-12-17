//haetaan tietokantayhteys config.js:stä
const connection = require("../config.js");

("use strict");

// Hakee kaikki tietokannan sanat
exports.listWords = async function (req, res, next) {
  let result = await hakusanat();
  res.status(200).json(result);
};

const hakusanat = async () => {
  // Etsitään kaikki hakusanat
  let hakusanat = await new Promise((resolve, reject) =>
    connection.query("SELECT * FROM hakusana", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    })
  );

  let res = await kaikkiSanat(hakusanat);
  return res;
};

const kaikkiSanat = async (hakusanat) => {
  // palautettava objekti
  let palautus = { sanat: [] };

  for (let j = 0; j < hakusanat.length; j++) {
    let hakuSana = hakusanat[j];
    // Etsitään sanan kaikki ilmentymät
    let sanaIlmentymat = await new Promise((resolve, reject) =>
      connection.query(
        "SELECT * FROM ilmentyma WHERE sana_id = $1",
        [hakuSana.id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            let sanat = results.rows;
            // Etsitään ilmentyman asiasanat
            let kysely =
              "SELECT DISTINCT (kuvaus) FROM ilmentyma, asiasana, edustaa WHERE asiasana.id = asiasana_id AND ilmentyma.id = ilmentyma_id AND ilmentyma_id = $1";
            for (let i = 0; i < results.rows.length; i++) {
              let aSanat = [];
              connection.query(
                kysely,
                [results.rows[i].id],
                (error, results) => {
                  if (error) {
                    return error;
                  } else {
                    // Jos ilmentymalla ei ole asiasanoja, palautetaan ilmentymat
                    if (results.rows.length === 0) {
                      resolve(sanat);
                    }
                    // Etsitään ilmentyman kaikki asiasanat
                    for (let k = 0; k < results.rows.length; k++) {
                      aSanat.push(results.rows[k].kuvaus);
                      // Jos viimeinen kierros
                      if (results.rows.length - k === 1) {
                        // Lisataan tapahtumaan asiasanat
                        sanat[i].asiasana = aSanat;
                        // Jos kaikki ilmentymat tarkistettu palautetaan ilmentymat
                        if (sanat.length - i === 1) {
                          resolve(sanat);
                        }
                      }
                    }
                  }
                }
              );
            }
            // Jos hakusanalla ei ilmentymia.
            if (results.rows.length === 0) {
              resolve([]);
            }
          }
        }
      )
    );

    // Etsitään hakusanaan liittyvät asiasanat
    let kysely =
      "SELECT DISTINCT (kuvaus) FROM ilmentyma, asiasana, edustaa WHERE asiasana.id = asiasana_id AND ilmentyma.id = ilmentyma_id AND sana_id = $1";
    let asiasanat = await new Promise((resolve, reject) =>
      connection.query(kysely, [hakuSana.id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          let aSanat = [];
          for (let k = 0; k < results.rows.length; k++) {
            aSanat.push(results.rows[k].kuvaus);
          }

          resolve(aSanat);
        }
      })
    );

    // Etsitään aikaisin ilmentymä hakusanalle.
    let aikaisin = await new Promise((resolve, reject) =>
      connection.query(
        "SELECT MIN (paivays) FROM ilmentyma where sana_id = $1",
        [hakuSana.id],
        (error, results) => {
          let pv = null;
          if (error) {
            reject(error);
          } else if (results.rows[0].min != null) {
            pv = results.rows[0].min;
            // HUOM - Poistettu koska Herokussa tämä aiheutti pvm tulostumisen väärin
            // Lisataan yksi paiva, koska lokaali aika ottaa kaksi tuntia pois.
            // pv.setDate(pv.getDate() +1);
            pv = pv.toISOString();

            pv = pv.substring(0, 10);
          }
          resolve(pv);
        }
      )
    );

    // Etsitään viimeisin ilmentyma hakusanalle.
    let viimeisin = await new Promise((resolve, reject) =>
      connection.query(
        "SELECT MAX (paivays) FROM ilmentyma where sana_id = $1",
        [hakuSana.id],
        (error, results) => {
          let pv = null;
          if (error) {
            reject(error);
          } else if (results.rows[0].max != null) {
            pv = results.rows[0].max;
            // HUOM - Poistettu koska Herokussa tämä aiheutti pvm tulostumisen väärin
            // Lisataan yksi paiva, koska lokaali aika ottaa kaksi tuntia pois.
            // pv.setDate(pv.getDate() +1);

            pv = pv.toISOString();
            // console.log(pv + " hei");
            pv = pv.substring(0, 10);
          }
          resolve(pv);
        }
      )
    );

    // Lisätään sanaan asiasanat
    hakuSana.asiasanat = asiasanat;
    // Lisätään sanaan aikaisin
    hakuSana.aikaisin = aikaisin;
    // Lisätään sanaan viimeisin
    hakuSana.viimeisin = viimeisin;
    // Lisätään sanaan ilmentymät
    hakuSana.ilmentymat = sanaIlmentymat;
    // Lisätään asiasana ja sen ilmeytymät listaan muiden asiasanojen kanssa
    palautus.sanat.push(hakuSana);
  }
  return palautus;
};

// Hakee id:n perusteella tietokannasta yhden sanan
exports.returnWord = function (req, res, next) {
  const id = parseInt(req.params.id);
  connection.query(
    "SELECT * FROM hakusana WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        next(error);
      } else if (results.rows[0] == null) {
        res.status(404).json({ error: "Word with given id does not exist!" });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
};

// Lisaa hakusanan tietokantaan
exports.insertHakusana = function (req, res, next) {
  const { sana, sanaluokka } = req.body;

  if (sana == null) {
    return res.status(500).json({ error: "sana on null!" });
  }

  // Lisataan sana hakusana tauluun, jos sita ei viela ole.
  let kysely =
    "INSERT INTO hakusana (sana, sanaluokka) VALUES ($1, $2) ON CONFLICT (sana, sanaluokka) DO UPDATE SET sana=EXCLUDED.sana RETURNING id";
  connection.query(kysely, [sana, sanaluokka], (error, results) => {
    if (error) {
      next(error);
    } else {
      req.sanaId = results.rows[0].id;
      next();
    }
  });
};

// Tarkistaa onko ilmentyma jo tietokannassa
exports.tarkistaIlmentyma = function (req, res, next) {
  const { hs_osio, paivays, selite, tyyli, kayttoala, lause } = req.body;

  let pvm;
  if (paivays != null) {
    let pv = paivays.substring(2, 10);
    // date YYYY-MM-DD
    pvm =
      pv.substring(0, 4) + "-" + pv.substring(4, 6) + "-" + pv.substring(6, 8);
  }

  let kysely =
    "SELECT * FROM ilmentyma WHERE sana_id = $1 AND lause = $2 AND sivunumero = $3 AND paivays = $4 AND hs_osio = $5 AND tyyli = $6 AND kayttoala = $7 AND selite = $8";
  connection.query(
    kysely,
    [req.sanaId, lause, paivays, pvm, hs_osio, tyyli, kayttoala, selite],
    (error, results) => {
      if (error) {
        return next(error);
      }
      // Jos ilmentyma ei ole jo tietokannassa
      else if (results.rows[0] == null) {
        next();
      } else {
        return res
          .status(400)
          .json({ error: "Kyseinen ilmentyma on jo olemassa!" });
      }
    }
  );
};

// Lisaa ilmentyman tietokantaan
exports.insertIlmentyma = function (req, res, next) {
  const {
    hs_osio,
    paivays,
    selite,
    tyyli,
    kayttoala,
    lause,
    valmis,
    viesti,
  } = req.body;

  let pvm;
  if (paivays != null) {
    let pv = paivays.substring(2, 10);
    // date YYYY-MM-DD
    pvm =
      pv.substring(0, 4) + "-" + pv.substring(4, 6) + "-" + pv.substring(6, 8);
  }

  // Lisataan ilmentyma
  let kysely =
    "INSERT INTO ilmentyma (sana_id, lause, sivunumero, paivays, hs_osio, tyyli, kayttoala, selite, valmis, viesti) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT ON CONSTRAINT uniikki_ilmentyma DO UPDATE SET sana_id=EXCLUDED.sana_id RETURNING *";
  connection.query(
    kysely,
    [
      req.sanaId,
      lause,
      paivays,
      pvm,
      hs_osio,
      tyyli,
      kayttoala,
      selite,
      valmis,
      viesti,
    ],
    (error, results) => {
      if (error) {
        return next(error);
      } else {
        req.ilmentymaId = results.rows[0].id;
        req.ilmentyma = results.rows[0];
        next();
      }
    }
  );
};

// Palautetaan response
exports.vastaus = function (req, res, next) {
  res.status(201).json({ ilmentyma: req.ilmentyma, token: req.token });
};

// Poistaa yhteydet asiasanojen ja ilmentyman valilla
exports.deleteAsiasana = function (req, res, next) {
  const id = parseInt(req.params.id);

  connection.query(
    "DELETE FROM edustaa WHERE ilmentyma_id = $1 RETURNING *",
    [id],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        req.ilmentymaId = id;
        next();
      }
    }
  );
};

// Lisaa asiasanat ja yhdistaa asiasanat ilmentymaan
exports.addAsiasana = function (req, res, next) {
  const { kuvaus } = req.body;

  if (kuvaus != null) {
    // Asiasanat erotetaan toisistaan
    let aSanat = kuvaus.split(";");
    for (let k = 0; k < aSanat.length; k++) {
      // Lisataan uudet asiasanat asiasana tauluun
      let asiasanaId = connection.query(
        "INSERT INTO asiasana (kuvaus) VALUES ($1) ON CONFLICT (kuvaus) DO UPDATE SET kuvaus=EXCLUDED.kuvaus RETURNING id",
        [aSanat[k]],
        (error, results) => {
          if (error) {
            next(error);
          } else {
            asiasanaId = results.rows[0].id;

            // Luodaan yhteydet asiasanojen ja ilmentyman välille
            connection.query(
              "INSERT INTO edustaa (asiasana_id, ilmentyma_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
              [asiasanaId, req.ilmentymaId],
              (error, results) => {
                if (error) {
                  next(error);
                }
              }
            );
          }
        }
      );
    }
    next();
  } else {
    next();
  }
};

// Muuttaa ilmentymaa
exports.updateIlmentyma = function (req, res, next) {
  const id = parseInt(req.params.id);
  const {
    hs_osio,
    paivays,
    selite,
    tyyli,
    kayttoala,
    lause,
    valmis,
    viesti,
  } = req.body;

  let pv = paivays.substring(2, 10);
  // date YYYY-MM-DD
  let pvm =
    pv.substring(0, 4) + "-" + pv.substring(4, 6) + "-" + pv.substring(6, 8);

  connection.query(
    "UPDATE ilmentyma SET hs_osio = $1, paivays = $2, sivunumero = $3, selite = $4, tyyli = $5, kayttoala = $6, lause = $7, valmis = $8, viesti = $9 WHERE id = $10 RETURNING *",
    [
      hs_osio,
      pvm,
      paivays,
      selite,
      tyyli,
      kayttoala,
      lause,
      valmis,
      viesti,
      id,
    ],
    (error, results) => {
      if (error) {
        next(error);
      } else if (results.rows[0] == null) {
        res
          .status(404)
          .json({ error: "Occurence with given id does not exist!" });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
};

// Muutetaan hakusanaa
exports.updateWord = function (req, res, next) {
  const id = parseInt(req.params.id);
  const { sana, sanaluokka } = req.body;

  if (sana != null) {
    // Muokataan hakusanan sanaa ja sanaluokkaa
    connection.query(
      "UPDATE hakusana SET sana = $1, sanaluokka = $2 WHERE id = $3 RETURNING *",
      [sana, sanaluokka, id],
      (error, results) => {
        if (error) {
          next(error);
        } else if (results.rows[0] == null) {
          res.status(404).json({ error: "Word with given id does not exist!" });
        } else {
          res.status(200).json(results.rows[0]);
        }
      }
    );
  } else {
    res.status(400).json({ error: "Sana needs a value!" });
  }
};

// Poistaa ilmentyman
exports.deleteOccurence = function (req, res, next) {
  const id = parseInt(req.params.id);

  // Poistaa ilmentyman yhteyden asiasanaan
  connection.query(
    "DELETE FROM edustaa WHERE ilmentyma_id = $1 RETURNING *",
    [id],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        // Poistaa ilmentyman
        connection.query(
          "DELETE FROM ilmentyma WHERE id = $1 RETURNING *",
          [id],
          (error, results) => {
            if (error) {
              next(error);
            } else if (results.rows[0] == null) {
              res
                .status(404)
                .json({ error: "Occurence with given id does not exist!" });
            } else {
              res.poistettu = results.rows[0];
              req.params.id = results.rows[0].sana_id;
              next();
            }
          }
        );
      }
    }
  );
};

// Tarkistaa onko hakusanalla ilmentymia jaljella
exports.onkoViimeinen = function (req, res, next) {
  connection.query(
    "SELECT * FROM ilmentyma WHERE sana_id = $1",
    [req.params.id],
    (error, results) => {
      if (error) {
        next(error);
      }
      // Jos hakusanalla ei ilmentymia, poista hakusana
      else if (results.rows[0] == null) {
        next();
      } else {
        res.status(200).json(res.poistettu);
      }
    }
  );
};

// Poistetaan hakusanan ilmentymat
exports.poistaIlmentymat = function (req, res, next) {
  const id = parseInt(req.params.id);

  // Poistaa hakusanan ilmentymat
  connection.query(
    "DELETE FROM ilmentyma WHERE sana_id = $1",
    [id],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        next();
      }
    }
  );
};

// Poistaa hakusanan
exports.deleteWord = function (req, res, next) {
  const id = parseInt(req.params.id);

  // Poistaa hakusanan
  connection.query(
    "DELETE FROM hakusana WHERE id = $1 RETURNING *",
    [id],
    (error, results) => {
      if (error) {
        next(error);
      } else if (results.rows[0] == null) {
        res.status(404).json({ error: "Word with given id does not exist!" });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
};
