// haetaan tietokantayhteys config.js:stä
const connection = require("../config.js");
const asiasana = require("./asiasanaController");

("use strict");

exports.tulostaSanat = async function (req, res, next) {
  // const result = "Tulostus. Tähän tulee sanalista";
  // const result = await hakusanat();
  const result = await hakusanat();

  res.set('Content-Type', 'text/html');
  res.status(200).send(result);
};

const hakusanat = async () => {
  // Etsitään kaikki hakusanat
  const hakusanat = await new Promise((resolve, reject) =>
    connection.query("SELECT * FROM hakusana", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    })
 	);

  //const res = await kaikkiSanat(hakusanat);
  const sanalista = await kaikkiSanat(hakusanat);
  var res = "<html><body>";

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
  		ilm += "(" + pvm.getDay() + "." + pvm.getMonth() + "." + pvm.getFullYear() + ", " + sanalista.sanat[i].ilmentymat[j].sivunumero;

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

  res += "</html></body>";

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