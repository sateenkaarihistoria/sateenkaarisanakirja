const connection = require('../config.js');

const sqlHaku = `
with y as (SELECT teos.id, json_agg(DISTINCT kuvaus) asiasanat
FROM teos, asiasana, sisaltaa
WHERE asiasana.id = asiasana_id AND teos.id = teos_id
    GROUP BY teos.id),
     t as (SELECT teos.id, json_build_object(
    'id', teos.id,
    'nimi', teos.nimi,
    'lajityyppi', teos.lajityyppi,
    'valmis', teos.valmis,
    'viesti', teos.viesti,
         'teos_maa', maa,
         'teos_paikkakunta', paikkakunta,
    'asiasana', asiasanat
                      ) js
    FROM teos, y, tapahtuu_teos, sijainti
    WHERE teos.id = y.id AND sijainti_id = sijainti.id AND teos_id = teos.id)

SELECT henkilo.id, etunimi, sukunimi, ammattinimike, maa, paikkakunta, json_agg(t.js) teokset
FROM henkilo, sijainti, toimii_henkilo, t, tekee
WHERE sijainti_id = sijainti.id AND henkilo.id = toimii_henkilo.henkilo_id AND t.id = tekee.teos_id and tekee.henkilo_id = henkilo.id
GROUP BY henkilo.id, etunimi, sukunimi, ammattinimike, maa, paikkakunta
ORDER BY sukunimi ASC;`;

exports.haeHenkilot = async () => {
  try {
    const tulos = await connection.query(sqlHaku);
    return tulos.rows;
  } catch (e) {
    return e;
  }
};
