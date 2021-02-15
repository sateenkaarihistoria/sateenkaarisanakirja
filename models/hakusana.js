const connection  = require('../config.js');

exports.haeHakuSanat = async (alku, loppu) => {
    try{
    const tulos = await connection
    .query( "SELECT DISTINCT hakusana.id AS id, sana FROM hakusana INNER JOIN ilmentyma ON hakusana.id = ilmentyma.sana_id " +
            "WHERE paivays>=$1 AND paivays<=$2 ORDER BY sana;", [alku, loppu] );
      return tulos.rows;
    } catch (err) {
      return err;
    }
}

const sqlHaeSananTiedot =
`with t as (SELECT sana_id,
                paivays,
                json_build_object(
                        'lause', lause,
                        'paivays', paivays,
                        'sivunumero', sivunumero,
                        'hs_osio', hs_osio,
                        'tyyli', tyyli,
                        'kayttoala', kayttoala,
                        'selite', selite,
                        'kuvaus', jsonb_agg(kuvaus)
                    ) js
         FROM ilmentyma i,
              asiasana a,
              edustaa e
         WHERE a.id = asiasana_id
           AND i.id = ilmentyma_id
           AND sana_id = $1
         GROUP BY lause, paivays, sivunumero, hs_osio, tyyli, kayttoala, selite, sana_id)
SELECT t.sana_id as id, json_agg(js) ilmentymat, MIN(paivays) minpvm, MAX(paivays) maxpvm
FROM t
GROUP BY t.sana_id;`;

exports.haeSananTiedot = async (id) => {
  try {
    const tulos = await connection.query(sqlHaeSananTiedot, [id])
    return tulos.rows;
  } catch (e) {
    return e;
  }
}

const sqlHaeKaikkiTiedot =
`with t as (SELECT
                i.sana_id,
                i.id,
                json_build_object(
                        'id', i.id,
                        'sana_id', i.sana_id,
                        'lause', lause,
                        'paivays', paivays,
                        'sivunumero', sivunumero,
                        'hs_osio', hs_osio,
                        'tyyli',    tyyli,
                        'kayttoala', kayttoala,
                        'selite', selite,
                        'valmis', valmis,
                        'viesti', viesti,
                        'asiasana', json_agg(DISTINCT kuvaus)
                    ) js
         FROM ilmentyma i, edustaa e, asiasana a
        WHERE i.id = e.ilmentyma_id AND a.id = e.asiasana_id
         GROUP BY lause, i.id, paivays, sivunumero, hs_osio, tyyli, kayttoala, selite, sana_id, valmis, sana_id),
y as (SELECT i.sana_id,
                  array_agg(DISTINCT kuvaus) asiasanat
                  FROM ilmentyma i JOIN edustaa e ON i.id = e.ilmentyma_id JOIN asiasana a2 on e.asiasana_id = a2.id
    GROUP BY i.sana_id)

SELECT i.sana_id as id, sana, sanaluokka, array_to_json(asiasanat),  to_char(MIN(paivays), 'YYYY-MM-DD') aikaisin, to_char(MAX(paivays), 'YYYY-MM-DD') viimeisin, json_agg(js) ilmentymat
FROM t JOIN ilmentyma i ON i.id = t.id, y, hakusana h
WHERE t.sana_id = y.sana_id AND h.id = t.sana_id
GROUP BY t.sana_id, i.sana_id, sana, y.asiasanat, sanaluokka;
`

exports.haeKaikkiTiedot = async () => {
  try {
    const tulos = await connection.query(sqlHaeKaikkiTiedot)
    return tulos.rows;
  } catch (e) {
    return e;
  }
}
