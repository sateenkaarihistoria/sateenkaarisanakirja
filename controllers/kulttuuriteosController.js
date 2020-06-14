//haetaan tietokantayhteys config.js:stä
const connection = require('../config.js');

'use strict';

  // Hakee kaikki tietokannan kulttuuriteokset
  exports.listCulture = async function (req, res, next) {
  
    let result = await haeHenkilot();
    res.status(200).json(result)
  }
  
  const haeHenkilot = async () => {
    // Etsitään kaikki henkilot
    let henkilot = await new Promise((resolve, reject) => connection.query('SELECT * FROM henkilo', (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.rows);
      }
    }));
  
    let res = await haeTiedot(henkilot);
    return res;
  }  
  
  const haeTiedot = async (henkilot) => {
    // palautettava objekti
    let palautus = {"henkilot": []};

    for (let j = 0; j < henkilot.length; j++) {
      let henkilo = henkilot[j];
      // Etsitään henkilon teokset
      let kysely3 = 'SELECT teos.id, teos.nimi, teos.lajityyppi, teos.valmis, teos.viesti FROM teos, tekee, henkilo WHERE henkilo_id = $1 AND henkilo.id = henkilo_id AND teos.id = teos_id'
      let teokset = await new Promise((resolve, reject) => connection.query(kysely3, [henkilo.id], (error, results) => {
        if (error) {
          reject(error)
        } else {
          let tuotteet = results.rows
          // Etsitään teoksen asiasanat
          let kysely = 'SELECT DISTINCT (kuvaus) FROM teos, asiasana, sisaltaa WHERE asiasana.id = asiasana_id AND teos.id = teos_id AND teos_id = $1'
          for (let i = 0; i < results.rows.length; i++) {
            let aSanat = []
            // Etsitaan teoksen sijainti
            connection.query('SELECT maa, paikkakunta FROM sijainti, tapahtuu_teos, teos WHERE sijainti.id = sijainti_id AND teos.id = teos_id AND teos.id = $1',
            [results.rows[i].id], (error, results2) => {
              if (results2.rows.length > 0) {
                // Lisataan teoksen sijainti teokseen
                tuotteet[i].teos_maa = results2.rows[0].maa
                tuotteet[i].teos_paikkakunta = results2.rows[0].paikkakunta
              }
              // Teoksen asiasanat
              connection.query(kysely, [results.rows[i].id], (error, results) => {
                if (error) {
                  return (error)
                } else {
                  // Jos ei asiasanoja palauta teokset
                  if (results.rows.length === 0) {
                    resolve(tuotteet)
                  } else {
                    // Lisää teokseen asiasanoja
                    for (let k = 0; k < results.rows.length; k++) {
                      aSanat.push(results.rows[k].kuvaus)
                      // Jos viimeinen kierros
                      if (results.rows.length - k === 1) {
                        // Lisataan teokseen asiasanojen lista
                        tuotteet[i].asiasana = aSanat
                        // Jos kaikki teokset tarkistettu palauta teokset
                        if (tuotteet.length - i === 1) {
                          resolve(tuotteet)
                        }
                      }
                    }
                  }
                }
              })
            })
          }
          // Jos Henkilolla ei teoksia
          if (results.rows.length === 0) {
            resolve([])
          }
        }
      }))
  
      // Etsitään henkilon sijainti
      let kysely = 'SELECT maa, paikkakunta FROM sijainti, toimii_henkilo, henkilo WHERE henkilo_id = $1 AND sijainti.id = sijainti_id AND henkilo.id = henkilo_id'
      let sijainti = await new Promise((resolve, reject) => connection.query(kysely, [henkilo.id], (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results.rows)
        }
      }))

      // jos henkilolla on sijainti
      if (sijainti.length > 0) {
        // Lisataan henkiloon maa
        henkilo.maa = sijainti[0].maa

        // Lisataan henkiloon paikkakunta
        henkilo.paikkakunta = sijainti[0].paikkakunta
      }
      // Lisataan henkiloon teokset
      henkilo.teokset = teokset

      // Lisätään henkilo listaan
      palautus.henkilot.push(henkilo);
    }
    return (palautus)
  }

  // Palauttaa henkilon
  exports.returnHenkilo = function (req, res, next) {
    const id = parseInt(req.params.id)
    connection.query('SELECT * FROM henkilo WHERE id = $1', [id], (error, results) => {
      if (error) {
        next(error)
      } else if (results.rows[0] == null) {
        res.status(404).json({ error: "Henkilo with given id does not exist!" });
      } else {
        res.status(200).json(results.rows[0])
      }
    })
  }

  // Lisaa henkilon
  exports.insertHenkilo = function (req, res, next) {
    const { etunimi, sukunimi, ammattinimike } = req.body

    if (etunimi == null || sukunimi == null || ammattinimike == null) {
      return res.status(500).json({ error: "Henkilolla on null arvoja!" });
    }
    else {
      let kysely = 'INSERT INTO henkilo (etunimi, sukunimi, ammattinimike) VALUES ($1, $2, $3) ON CONFLICT (etunimi, sukunimi, ammattinimike) DO UPDATE SET etunimi=EXCLUDED.etunimi RETURNING id'
      connection.query(kysely, [etunimi, sukunimi, ammattinimike], (error, results) => {
        if (error) {
          return next(error)
        } else {
          req.henkiloId = results.rows[0].id
          next()
        }
      })
    }
  }

  // Tarkistaa onko teos jo olemassa
  exports.tarkistaTeos = function (req, res, next) {
    const { nimi, lajityyppi } = req.body

    let kysely = 'SELECT * FROM teos WHERE nimi = $1 AND lajityyppi = $2'
    connection.query(kysely, [nimi, lajityyppi], (error, results) => {
      if (error) {
        return next(error)
      }
      else if (results.rows[0] == null) {
        next()
      }
      else {
        connection.query('SELECT * FROM tekee WHERE henkilo_Id = $1 AND teos_Id = $2', [req.henkiloId, results.rows[0].id], (error, results) => {
          if (error) {
            return next(error)
          }
          // Jos henkilolla ei ole kyseista teosta
          else if (results.rows[0] == null) {
            next()
          }
          else {
            return res.status(400).json({ error: "Kyseinen teos on jo olemassa kyseisella henkilolla!" });
          }
        })
      }
    })
  }

  // Lisataan teos
  exports.insertTeos = function (req, res, next) {
    const { nimi, lajityyppi, valmis, viesti } = req.body

    connection.query('INSERT INTO teos (nimi, lajityyppi, valmis, viesti) VALUES ($1, $2, $3, $4) ON CONFLICT (nimi, lajityyppi) DO UPDATE SET nimi=EXCLUDED.nimi RETURNING *',
    [nimi, lajityyppi, valmis, viesti], (error, results) => {
      if (error) {
        return next(error)
      }
      else {

        // Yhdistetaan teos henkiloon
        connection.query('INSERT INTO tekee (henkilo_id, teos_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [req.henkiloId, results.rows[0].id], (error, results2) => {
          if (error) {
            return next(error)
          }
          else {
            req.teos_id = results.rows[0].id
            req.teos = results.rows[0]
            next()
          }
          })
      }
    })
  }

  // Lisaa teoksen sijainti
  exports.insertTeosSijainti = function (req, res, next) {
    const { teos_maa, teos_paikkakunta } = req.body

    if (teos_maa != null) {
      let kysely = 'INSERT INTO sijainti (maa, paikkakunta) VALUES ($1, $2) ON CONFLICT (maa, paikkakunta) DO UPDATE SET maa=EXCLUDED.maa RETURNING id'
      connection.query(kysely, [teos_maa, teos_paikkakunta], (error, results) => {
        if (error) {
          return next(error)
        } else {
          connection.query('INSERT INTO tapahtuu_teos (sijainti_id, teos_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [results.rows[0].id, req.teos_id], (error, results) => {
            if (error) {
              return next(error)
            }
            else {
              next()
            }
          })
        }
      });
    }
    else {
      next()
    }
  }

  // Palautetaan response
  exports.vastaus = function (req, res, next) {
    res.status(201).json({ 'teos' : req.teos, 'token' : req.token });
  }

  // Poistetaan asiasanojen yhteys teokseen
  exports.deleteAsiasana = function (req, res, next) {
    const id = parseInt(req.params.id)

    connection.query('DELETE FROM sisaltaa WHERE teos_id = $1 RETURNING *', [id], (error, results) => {
      if (error) {
        next(error)
      }
      else {
        req.teos_id = id
        next()
      }
    })
  }

  // Lisataan asiasanoja ja yhdistetaan ne teokseen
  exports.addAsiasana = function (req, res, next) {
    const id = parseInt(req.params.id)
    const { kuvaus } = req.body

    if (kuvaus != null) {
      // Asiasanat erotetaan toisistaan
      let aSanat = kuvaus.split(";");
      for (let k = 0; k < aSanat.length; k++) {
        // Lisataan uudet asiasanat asiasana tauluun
        let asiasanaId = connection.query('INSERT INTO asiasana (kuvaus) VALUES ($1) ON CONFLICT (kuvaus) DO UPDATE SET kuvaus=EXCLUDED.kuvaus RETURNING id',
        [aSanat[k]], (error, results) => {
          if (error) {
            next(error)
          } else {
            asiasanaId = (results.rows[0].id);

            // Luodaan yhteydet asiasanojen ja teoksen välille
            connection.query('INSERT INTO sisaltaa (asiasana_id, teos_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [asiasanaId, req.teos_id], (error, results) => {
              if (error) {
                next(error)
              }
            })
          }
        });
      }
      next()
    }
    else {
      next()
    }
  }

  // Poistetaan teoksen sijainti
  exports.deleteTeosSijainti = function (req, res, next) {
    const id = parseInt(req.params.id)

    connection.query('DELETE FROM tapahtuu_teos WHERE teos_id = $1', [id], (error, results) => {
      if (error) {
        next(error)
      }
      else {
        next()
      }
    })
  }

  // Muutetaan teosta
  exports.updateTeos = function (req, res, next) {
    const id = parseInt(req.params.id)
    const { nimi, lajityyppi, valmis, viesti } = req.body

    connection.query('UPDATE teos SET nimi = $1, lajityyppi = $2, valmis = $3, viesti = $4 WHERE id = $5 RETURNING *',
    [nimi, lajityyppi, valmis, viesti, id], (error, results) => {
      if (error) {
        next(error)
      } else if (results.rows[0] == null) {
        res.status(404).json({ error: "Teos with given id does not exist!" });
      } else {
        res.status(200).json(results.rows[0])
      }
    })
  }

  // Poistetaan sijainnin yhteys henkiloon
  exports.deleteLocation = function (req, res, next) {
    const { ammattinimike, etunimi, sukunimi, henkilo_maa, henkilo_paikkakunta } = req.body
    const id = parseInt(req.params.id)

    if (etunimi == null || sukunimi == null || ammattinimike == null || henkilo_maa == null || henkilo_paikkakunta == null) {
      return res.status(500).json({ error: "etunimi, sukunimi, ammattinimike, henkiloMaa, henkilo_paikkakunta need values!" });
    }
    else {
      connection.query('DELETE FROM toimii_henkilo WHERE henkilo_id = $1', [id], (error, results) => {
        if (error) {
          next(error)
        }
        else {
          req.henkiloId = id
          next()
        }
      })
    }
  }

  // Lisataan sijainti ja yhdistetaan se henkiloon
  exports.addLocation = function (req, res, next) {
    const id = parseInt(req.params.id)
    const { henkilo_maa, henkilo_paikkakunta } = req.body

    // Lisataan sijainti
    let sijaintiId = connection.query('INSERT INTO sijainti (maa, paikkakunta) VALUES ($1, $2) ON CONFLICT (maa, paikkakunta) DO UPDATE SET maa=EXCLUDED.maa RETURNING id',
    [henkilo_maa, henkilo_paikkakunta], (error, results) => {
      if (error) {
        next(error)
      } else {
        sijaintiId = (results.rows[0].id);

        // Luodaan yhteys henkilon ja sijainnin valille
        connection.query('INSERT INTO toimii_henkilo (sijainti_id, henkilo_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [sijaintiId, req.henkiloId], (error, results) => {
          if (error) {
            next(error)
          }
          else {
            next()
          }
        })
      }
    });
  }

  // Muutetaan henkiloa
  exports.updatePerson = function (req, res, next) {
    const id = parseInt(req.params.id)
    const { ammattinimike, etunimi, sukunimi } = req.body

    // Paivitetaan henkilo
    connection.query('UPDATE henkilo SET etunimi = $1, sukunimi = $2, ammattinimike = $3 WHERE id = $4 RETURNING *',
    [etunimi, sukunimi, ammattinimike, id], (error, results) => {
      if (error) {
        res.status(500).json({ error: "Person with given profession already exists! Give another name or profession!" });
      } else if (results.rows[0] == null) {
        res.status(404).json({ error: "Person with given id does not exist!" });
      } else {
        res.status(200).json(results.rows[0])
      }
    })
  }

  // Poistetaan teos
  exports.deleteCulture = function (req, res, next) {
  
    // Poistaa teoksen yhteyden asiasanaan
    connection.query('DELETE FROM sisaltaa WHERE teos_id = $1 RETURNING *', [req.teos_id], (error, results) => {
      if (error) {
        next(error)
      } else {
        // Poistaa teoksen
        connection.query('DELETE FROM teos WHERE id = $1 RETURNING *', [req.teos_id], (error, results) => {
          if (error) {
            next(error)
          } else if (results.rows[0] == null) {
            res.status(404).json({ error: "Culture with given id does not exist!" });
          } else {
            res.poistettu = results.rows[0]
            next()
          }
        })
      }
    })
  }

  // Poistetaan teoksen yhteys henkiloihin
  exports.poistaHenkiloYhteys = function (req, res, next) {
    const id = parseInt(req.params.id)

    connection.query('DELETE FROM tekee WHERE teos_id = $1 RETURNING *', [id], (error, results) => {
      if (error) {
        next(error)
      }
      else {
        req.teos_id = id
        next()
      }
    })
  }

  // Poistetaan teokset jotka eivat liity yhteenkaan henkiloon
  exports.deleteTeokset = function (req, res, next) {
    let kysely = 'DELETE FROM teos WHERE id NOT IN (SELECT teos_id FROM tekee)'

    connection.query(kysely, (error, results) => {
      if (error) {
        next(error)
      }
      else {
        next()
      }
    })
  }

  // Poistetaan henkilot jotka eivat liity yhteenkaan teokseen
  exports.deletePeople = function (req, res, next) {
    let kysely = 'DELETE FROM henkilo WHERE id NOT IN (SELECT henkilo_id FROM tekee)'

    connection.query(kysely, (error, results) => {
      if (error) {
        next(error)
      }
      else {
        next()
      }
    })
  }

  // Poistetaan henkilo
  exports.deletePerson = function (req, res, next) {
    const id = parseInt(req.params.id)

    connection.query('DELETE FROM henkilo WHERE id = $1 RETURNING *', [id], (error, results) => {
      if (error) {
        next(error)
      } else {
        res.poistettu = results.rows[0]
        next()
      }
    })
  }

  // Palautetaan response
  exports.poistoVastaus = function (req, res, next) {

    if (res.poistettu == null) {
      res.status(404).json({ error: "Person with given id does not exist!" });
    } else {
      res.status(200).json(res.poistettu)
    }
  }