require("dotenv").config();
// haetaan tietokantayhteys config.js:stä
const connection = require("../config.js");
const asiasana = require("./asiasanaController");

("use strict");

exports.tulostaSanat = async function (req, res, next) {
  const result = await hakusanat();

  res.set('Content-Type', 'text/html');
  res.status(200).send(result);
};

exports.tulostaTeokset = async function (req, res, next) {
	const result = await haeHenkilot();

	var resStr = "<html><body>";

	for (var i = 0; i < result.henkilot.length; i++) {
		resStr += "<div>";
		resStr += "<b>" + result.henkilot[i].etunimi + " " + result.henkilot[i].sukunimi + "</b>";
		resStr += " (" + result.henkilot[i].ammattinimike +")<br>";
		resStr += " (" + result.henkilot[i].paikkakunta + ", " + result.henkilot[i].maa +")<br>";

		resStr += "<div><b>Teokset:</b><br>";
		for (var j = 0; j < result.henkilot[i].teokset.length; j++) {
			resStr += "<div>";
			resStr +=  "<i>" + result.henkilot[i].teokset[j].nimi + "</i>" + "(" + result.henkilot[i].teokset[j].lajityyppi + ")<br>";
			resStr += result.henkilot[i].teokset[j].teos_paikkakunta + ", " + result.henkilot[i].teokset[j].teos_maa + "<br>";
			resStr += result.henkilot[i].teokset[j].viesti + "<br>";

			for (var k = 0; k < result.henkilot[i].teokset[j].asiasana.length; k++) {
				resStr += result.henkilot[i].teokset[j].asiasana[k];
				if (k < result.henkilot[i].teokset[j].asiasana.length-1) {
					resStr += ", "
				}
			}
			resStr += "</div>";
		}
		resStr += "</div>"

		resStr += "</div><hr>";
	}

	resStr += "</body></html>";

	//res.set('Content-Type', 'text/html');
  res.set('Content-Type', 'text/plain');
  res.status(200).send(resStr);
};

const hakusanat = async () => {
  // Etsitään kaikki hakusanat
  const hakusanat = await new Promise((resolve, reject) =>
    connection.query("SELECT * FROM hakusana ORDER BY sana", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    })
 	);

  //const res = await kaikkiSanat(hakusanat);
  const sanalista = await kaikkiSanat(hakusanat);
  //var res = "<html><body>";
  var res = "";

  for (var i = 0; i < sanalista.sanat.length; i++) {
  	res += "<div><b>";
  	res += sanalista.sanat[i].sana + "</b>("+ sanalista.sanat[i].sanaluokka + ")";

  	var edselite = "";

  	for (var j = 0; j < sanalista.sanat[i].ilmentymat.length; j++) {
  		var ilm = "<div>"

  		if (sanalista.sanat[i].ilmentymat[j].selite !== edselite) {
  			ilm += "<div>" + sanalista.sanat[i].ilmentymat[j].selite + "</div>";
  		}
  		edselite = sanalista.sanat[i].ilmentymat[j].selite;

  		ilm += "<div><i>" + sanalista.sanat[i].ilmentymat[j].lause + "</i>";
  		//ilm += "(" + sanalista.sanat[i].ilmentymat[j].paivays  + ", " + sanalista.sanat[i].ilmentymat[j].sivunumero;
  		var pvm = new Date(sanalista.sanat[i].ilmentymat[j].paivays);
  		ilm += "(" + pvm.getDate() + "." + (pvm.getMonth() + 1) + "." + pvm.getFullYear() + ", " + sanalista.sanat[i].ilmentymat[j].sivunumero;

  		ilm += ", " + sanalista.sanat[i].ilmentymat[j].hs_osio  + ", " + sanalista.sanat[i].ilmentymat[j].kayttoala + ")";

  		var asanat = "";

  		for (var k = 0; k < sanalista.sanat[i].ilmentymat[j].asiasana.length; k++) {
  			asanat += sanalista.sanat[i].ilmentymat[j].asiasana[k];
  			if (k != sanalista.sanat[i].ilmentymat[j].asiasana.length-1) {
  				asanat += ", ";
  			}
  		}
  		ilm += "(" + asanat + ")</div>";
  		ilm += "</div>"

  		res += ilm;
  	}

  	res += "</div><hr>";
  }

  //res += "</body></html>";

  return res;
};

const kaikkiSanat = async (hakusanat) => {
  // palautettava objekti
  const palautus = { sanat: [] };

  for (let j = 0; j < hakusanat.length; j++) {
    const hakuSana = hakusanat[j];
    // Etsitään sanan kaikki ilmentymät
    const sanaIlmentymat = await new Promise((resolve, reject) =>
      connection.query(
        "SELECT * FROM ilmentyma WHERE sana_id = $1",
        [hakuSana.id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const sanat = results.rows;
            // Etsitään ilmentyman asiasanat
            const kysely =
              "SELECT DISTINCT (kuvaus) FROM ilmentyma, asiasana, edustaa WHERE asiasana.id = asiasana_id AND ilmentyma.id = ilmentyma_id AND ilmentyma_id = $1";
            for (let i = 0; i < results.rows.length; i++) {
              const aSanat = [];
              connection.query(
                kysely,
                [results.rows[i].id],
                (error, results) => {
                  if (error) {
                    return error;
                  }
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
    const kysely =
      "SELECT DISTINCT (kuvaus) FROM ilmentyma, asiasana, edustaa WHERE asiasana.id = asiasana_id AND ilmentyma.id = ilmentyma_id AND sana_id = $1";
    const asiasanat = await new Promise((resolve, reject) =>
      connection.query(kysely, [hakuSana.id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const aSanat = [];
          for (let k = 0; k < results.rows.length; k++) {
            aSanat.push(results.rows[k].kuvaus);
          }

          resolve(aSanat);
        }
      })
    );

    // Etsitään aikaisin ilmentymä hakusanalle.
    const aikaisin = await new Promise((resolve, reject) =>
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
    const viimeisin = await new Promise((resolve, reject) =>
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

const haeHenkilot = async () => {
  // Etsitään kaikki henkilot
  const henkilot = await new Promise((resolve, reject) =>
    connection.query("SELECT * FROM henkilo", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    })
  );

  const res = await haeTiedot(henkilot);
  return res;
};

const haeTiedot = async (henkilot) => {
  // palautettava objekti
  const palautus = { henkilot: [] };

  for (let j = 0; j < henkilot.length; j++) {
    const henkilo = henkilot[j];
    // Etsitään henkilon teokset
    const kysely3 =
      "SELECT teos.id, teos.nimi, teos.lajityyppi, teos.valmis, teos.viesti FROM teos, tekee, henkilo WHERE henkilo_id = $1 AND henkilo.id = henkilo_id AND teos.id = teos_id";
    const teokset = await new Promise((resolve, reject) =>
      connection.query(kysely3, [henkilo.id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const tuotteet = results.rows;
          // Etsitään teoksen asiasanat
          const kysely =
            "SELECT DISTINCT (kuvaus) FROM teos, asiasana, sisaltaa WHERE asiasana.id = asiasana_id AND teos.id = teos_id AND teos_id = $1";
          for (let i = 0; i < results.rows.length; i++) {
            const aSanat = [];
            // Etsitaan teoksen sijainti
            connection.query(
              "SELECT maa, paikkakunta FROM sijainti, tapahtuu_teos, teos WHERE sijainti.id = sijainti_id AND teos.id = teos_id AND teos.id = $1",
              [results.rows[i].id],
              (error, results2) => {
                if (results2.rows.length > 0) {
                  // Lisataan teoksen sijainti teokseen
                  tuotteet[i].teos_maa = results2.rows[0].maa;
                  tuotteet[i].teos_paikkakunta = results2.rows[0].paikkakunta;
                }
                // Teoksen asiasanat
                connection.query(
                  kysely,
                  [results.rows[i].id],
                  (error, results) => {
                    if (error) {
                      return error;
                    }
                    // Jos ei asiasanoja palauta teokset
                    if (results.rows.length === 0) {
                      resolve(tuotteet);
                    } else {
                      // Lisää teokseen asiasanoja
                      for (let k = 0; k < results.rows.length; k++) {
                        aSanat.push(results.rows[k].kuvaus);
                        // Jos viimeinen kierros
                        if (results.rows.length - k === 1) {
                          // Lisataan teokseen asiasanojen lista
                          tuotteet[i].asiasana = aSanat;
                          // Jos kaikki teokset tarkistettu palauta teokset
                          if (tuotteet.length - i === 1) {
                            resolve(tuotteet);
                          }
                        }
                      }
                    }
                  }
                );
              }
            );
          }
          // Jos Henkilolla ei teoksia
          if (results.rows.length === 0) {
            resolve([]);
          }
        }
      })
    );

    // Etsitään henkilon sijainti
    const kysely =
      "SELECT maa, paikkakunta FROM sijainti, toimii_henkilo, henkilo WHERE henkilo_id = $1 AND sijainti.id = sijainti_id AND henkilo.id = henkilo_id";
    const sijainti = await new Promise((resolve, reject) =>
      connection.query(kysely, [henkilo.id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      })
    );

    // jos henkilolla on sijainti
    if (sijainti.length > 0) {
      // Lisataan henkiloon maa
      henkilo.maa = sijainti[0].maa;

      // Lisataan henkiloon paikkakunta
      henkilo.paikkakunta = sijainti[0].paikkakunta;
    }
    // Lisataan henkiloon teokset
    henkilo.teokset = teokset;

    // Lisätään henkilo listaan
    palautus.henkilot.push(henkilo);
  }
  return palautus;
};

// Palauttaa henkilon
exports.returnHenkilo = function (req, res, next) {
  const id = parseInt(req.params.id);
  connection.query(
    "SELECT * FROM henkilo WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        next(error);
      } else if (results.rows[0] == null) {
        res
          .status(404)
          .json({ error: "Henkilo with given id does not exist!" });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
};