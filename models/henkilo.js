const connection = require('../config.js');

const sqlHaku = `
with y as (SELECT teos.id, json_agg(DISTINCT kuvaus) asiasanat
FROM teos, asiasana, sisaltaa
WHERE asiasana.id = asiasana_id AND teos.id = teos_id
    GROUP BY teos.id), u as (SELECT henkilo.id, MAX(maa) as maa, MAX(paikkakunta) as paikkakunta
        FROM henkilo, sijainti, toimii_henkilo
        WHERE henkilo_id = henkilo.id AND sijainti_id = sijainti.id
        GROUP BY henkilo.id),
     t as (SELECT teos.id, json_build_object(
    'id', teos.id,
    'nimi', teos.nimi,
    'lajityyppi', teos.lajityyppi,
    'valmis', teos.valmis,
    'viesti', teos.viesti,
         'teos_maa', maa,
         'teos_paikkakunta', paikkakunta,
    'asiasanat', asiasanat
                      ) js
    FROM teos, y, tapahtuu_teos, sijainti
    WHERE teos.id = y.id AND sijainti_id = sijainti.id AND teos_id = teos.id)

SELECT henkilo.id, etunimi, sukunimi, ammattinimike, maa, paikkakunta, json_agg(t.js ORDER BY js->>'nimi') teokset
FROM (henkilo join tekee ON henkilo.id = tekee.henkilo_id) JOIN t ON t.id = teos_id, u
WHERE u.id = henkilo.id
GROUP BY henkilo.id, u.maa, u.paikkakunta
ORDER BY sukunimi;`;

exports.haeHenkilot = async () => {
  try {
    const tulos = await connection.query(sqlHaku);
    return tulos.rows;
  } catch (e) {
    return e;
  }
};
