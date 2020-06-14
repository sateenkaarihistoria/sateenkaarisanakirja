//haetaan tietokantayhteys config.js:stä
const connection = require('../config.js');

'use strict';

  // Palautetaan tietokannan organisaatiot
  exports.listOrganizations = async function (req, res, next) {

    let result = await haeOrganisaatiot();
    res.status(200).json(result)
  }

  const haeOrganisaatiot = async () => {
    // Etsitään kaikki organisaatiot
    let organisaatiot = await new Promise((resolve, reject) => connection.query('SELECT * FROM organisaatio', (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.rows);
      }
    }));

    let res = await haeTiedot(organisaatiot);
    return res;
  }

  const haeTiedot = async (organisaatiot) => {
    // palautettava objekti
    let palautus = {"organisaatiot": []};

    for (let j = 0; j < organisaatiot.length; j++) {
      let org = organisaatiot[j];
      // Etsitään organisaation tapahtumat
      let tapahtumat = await new Promise((resolve, reject) => connection.query('SELECT * FROM tapahtuma WHERE organisaatio_id = $1',
      [org.id], (error, results) => {
        if (error) {
          reject(error)
        } else {
          let sanat = results.rows
          // Etsitään tapahtuman asiasanat
          let kysely = 'SELECT DISTINCT (kuvaus) FROM tapahtuma, asiasana, liittyy WHERE asiasana.id = asiasana_id AND tapahtuma.id = tapahtuma_id AND tapahtuma_id = $1'
          for (let i = 0; i < results.rows.length; i++) {
            let aSanat = []
            connection.query(kysely, [results.rows[i].id], (error, results) => {
              if (error) {
                return (error)
              } else {
                // Jos tapahtumalla ei ole asiasanoja, palautetaan tapahtumat
                if (results.rows.length === 0) {
                  resolve(sanat)
                }
                // Etsitään tapahtuman kaikki asiasanat
                for (let k = 0; k < results.rows.length; k++) {
                  aSanat.push(results.rows[k].kuvaus)
                  // Jos viimeinen kierros
                  if (results.rows.length - k === 1) {
                    // Lisataan tapahtumaan asiasanat
                    sanat[i].asiasana = aSanat
                    // Jos kaikki tapahtumat tarkistettu palautetaan tapahtumat
                    if (sanat.length - i === 1) {
                      resolve(sanat)
                    }
                  }
                }
              }
            })
          }
          // Jos organisaatiolla ei tapahtumia
          if (results.rows.length === 0) {
            resolve([])
          }
        }
      }))

      // Etsitään organisaation sijainti
      let kysely = 'SELECT maa, paikkakunta FROM sijainti, org_toimii, organisaatio WHERE organisaatio_id = $1 AND sijainti.id = sijainti_id AND organisaatio.id = organisaatio_id'
      let sijainti = await new Promise((resolve, reject) => connection.query(kysely, [org.id], (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results.rows)
        }
      }))

      // jos organisaatiolla on sijainti
      if (sijainti.length > 0) {
        // Lisataan organisaatioon maa
        org.maa = sijainti[0].maa
        // Lisataan organisaatioon paikkakunta
        org.paikkakunta = sijainti[0].paikkakunta
      }
      // Lisataan organisaatioon tapahtumat
      org.tapahtumat = tapahtumat

      // Lisätään organisaatio ja sen tapahtumat listaan muiden organisaatojen kanssa
      palautus.organisaatiot.push(org);
    }
    return (palautus)
  }

  // Palautetaan organisaatio
  exports.returnOrganization = function (req, res, next) {
    const id = parseInt(req.params.id)
    connection.query('SELECT * FROM organisaatio WHERE id = $1', [id], (error, results) => {
      if (error) {
        next(error)
      } else if (results.rows[0] == null) {
        res.status(404).json({ error: "Organization with given id does not exist!" });      
      } else {
        res.status(200).json(results.rows[0])
      }
    })
  }

  // Lisataan organisaatio
  exports.insertOrganization = function (req, res, next) {
    const { org_nimi } = req.body

    if (org_nimi == null) {
      return res.status(500).json({ error: "organisaation nimi on null!" });
    }
    else {
      let kysely = 'INSERT INTO organisaatio (nimi) VALUES ($1) ON CONFLICT (nimi) DO UPDATE SET nimi=EXCLUDED.nimi RETURNING id'
      connection.query(kysely, [org_nimi], (error, results) => {
        if (error) {
          return next(error)
        } else {
          req.orgId = results.rows[0].id
          next()
        }
      })
    }
  }

  // Tarkistaa onko tapahtuma jo olemassa
  exports.tarkistaTapahtuma = function (req, res, next) {
    const { tapahtuma_nimi, luonne, paivays } = req.body

    let kysely = 'SELECT * FROM tapahtuma WHERE nimi = $1 AND paivays = $2 AND luonne = $3 AND organisaatio_id = $4'
    connection.query(kysely, [tapahtuma_nimi, paivays, luonne, req.orgId], (error, results) => {
      if (error) {
        return next(error)
      }
      else if (results.rows[0] == null) {
        next()
      }
      else {
        return res.status(400).json({ error: "Kyseinen tapahtuma on jo olemassa!" });
      }
    })
  }

  // Lisataan tapahtuma
  exports.insertEvent = function (req, res, next) {
    const { tapahtuma_nimi, luonne, paivays, valmis, viesti } = req.body

    connection.query('INSERT INTO tapahtuma (nimi, paivays, luonne, organisaatio_id, valmis, viesti) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT ON CONSTRAINT uniikki_tapahtuma DO UPDATE SET nimi=EXCLUDED.nimi RETURNING *',
    [tapahtuma_nimi, paivays, luonne, req.orgId, valmis, viesti], (error, results) => {
      if (error) {
        return next(error)
      }
      else {
        req.tapahtuma_id = results.rows[0].id
        req.tapahtuma = results.rows[0]
        next()
      }
    })
  }

  // Palautetaan response
  exports.vastaus = function (req, res, next) {
    res.status(201).json({ 'tapahtuma' : req.tapahtuma, 'token' : req.token });
  }

  // Poistetaan organisaation yhteys sijaintiin
  exports.deleteLocation = function (req, res, next) {
    const { org_nimi, maa, paikkakunta } = req.body
    const id = parseInt(req.params.id)

    if (org_nimi == null || maa == null || paikkakunta == null) {
      return res.status(500).json({ error: "org_nimi, maa, paikkakunta need values!" });
    }
    else {
      connection.query('DELETE FROM org_toimii WHERE organisaatio_id = $1', [id], (error, results) => {
        if (error) {
          next(error)
        }
        else {
          req.orgId = id
          next()
        }
      })      
    }
  }

  // Lisataan sijainti ja yhteys organisaation ja sijainnin valille
  exports.addLocation = function (req, res, next) {
    const { maa, paikkakunta } = req.body

    // Lisataan sijainti
    let sijaintiId = connection.query('INSERT INTO sijainti (maa, paikkakunta) VALUES ($1, $2) ON CONFLICT (maa, paikkakunta) DO UPDATE SET maa=EXCLUDED.maa RETURNING id',
    [maa, paikkakunta], (error, results) => {
      if (error) {
        next(error)
      } else {
        sijaintiId = (results.rows[0].id);

        // Luodaan yhteys organisaation ja sijainnin valille
        connection.query('INSERT INTO org_toimii (organisaatio_id, sijainti_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [req.orgId, sijaintiId], (error, results) => {
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

  // Muutetaan organisaatiota
  exports.updateOrg = function (req, res, next) {
    const id = parseInt(req.params.id)
    const { org_nimi } = req.body

    connection.query('UPDATE organisaatio SET nimi = $1 WHERE id = $2 RETURNING *',
    [org_nimi, id], (error, results) => {
      if (error) {
        res.status(500).json({ error: "Organization with given name already exists!" });
       } else if (results.rows[0] == null) {
         res.status(404).json({ error: "Organization with given id does not exist!" });
      } else {
        res.status(200).json(results.rows[0])
      }
    })
  }

  // Poistetaan asiasanojen yhteys tapahtumaan
  exports.deleteAsiasana = function (req, res, next) {
    const id = parseInt(req.params.id)

    connection.query('DELETE FROM liittyy WHERE tapahtuma_id = $1', [id], (error, results) => {
      if (error) {
        next(error)
      }
      else {
        req.tapahtuma_id = id
        next()
      }
    })
  }

  // Lisataan asiasanoja ja yhdistetaan ne tapahtumaan
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

            // Luodaan yhteydet asiasanojen ja tapahtuman välille
            connection.query('INSERT INTO liittyy (asiasana_id, tapahtuma_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [asiasanaId, req.tapahtuma_id], (error, results) => {
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

  // Muutetaan tapahtumaa
  exports.updateEvent = function (req, res, next) {
    const id = parseInt(req.params.id)
    const { tapahtuma_nimi, luonne, paivays, valmis, viesti } = req.body

    connection.query('UPDATE tapahtuma SET nimi = $1, luonne = $2, paivays = $3, valmis = $4, viesti = $5 WHERE id = $6 RETURNING *',
    [tapahtuma_nimi, luonne, paivays, valmis, viesti, id], (error, results) => {
      if (error) {
        next(error)
      } else if (results.rows[0] == null) {
        res.status(404).json({ error: "Event with given id does not exist!" });
      } else {
        res.status(200).json(results.rows[0])
      }
    })
  }

  // Poistetaan organisaatio
  exports.deleteOrganization = function (req, res, next) {
    const id = parseInt(req.params.id)

    connection.query('DELETE FROM organisaatio WHERE id = $1 RETURNING *', [id], (error, results) => {
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
      res.status(404).json({ error: "Organization with given id does not exist!" });
    } else {
      res.status(200).json(res.poistettu)
    }
  }

  // Poistetaan tapahtuma
  exports.deleteEvent = function (req, res, next) {
    const id = parseInt(req.params.id)

    connection.query('DELETE FROM tapahtuma WHERE id = $1 RETURNING *', [id], (error, results) => {
      if (error) {
        next(error)
      } else if (results.rows[0] == null) {
        res.status(404).json({ error: "Event with given id does not exist!" });
      } else {
        res.poistettu = results.rows[0]
        req.params.id = results.rows[0].organisaatio_id
        next()
      }
    })
  }

  // Testataan onko organisaatiolla tapahtumia
  exports.onkoViimeinen = function (req, res, next) {
    connection.query('SELECT * FROM tapahtuma WHERE organisaatio_id = $1', [req.params.id], (error, results) => {
      if (error) {
        next(error)
      }
      // Jos organisaatiolla ei tapahtumia, poista organisaatio
      else if (results.rows[0] == null) {
        next()
      }
      else {
        res.status(200).json(res.poistettu)
      }
    })
  }