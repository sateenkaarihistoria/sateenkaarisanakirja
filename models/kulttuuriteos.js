const connection = require('../config');

const sqlHaku = `
with t as (SELECT henkilo.id, json_build_object(
  'id', henkilo.id,
  'etunimi', henkilo.etunimi,
  'sukunimi', henkilo.sukunimi,
  'ammattinimike', henkilo.ammattinimike,
  'maa', MAX(maa),
  'paikkakunta', MAX(paikkakunta)
  ) js FROM henkilo, sijainti, toimii_henkilo
  WHERE henkilo_id = henkilo.id AND sijainti_id = sijainti.id
  GROUP BY henkilo.id),
   y as (SELECT teos.id, array_agg(DISTINCT kuvaus) kuv
       FROM teos, sisaltaa, asiasana
       WHERE sisaltaa.asiasana_id = asiasana.id AND teos.id = sisaltaa.teos_id
       GROUP BY teos.id)


SELECT te.id, te.nimi, te.lajityyppi, te.valmis, te.viesti, MAX(maa) as teos_maa, MAX(paikkakunta) as teos_paikkakunta, array_to_json(kuv) as asiasanat, json_agg(js) as tekijat
FROM teos te, tapahtuu_teos tt, sijainti s, tekee tek, t, y
WHERE te.id = tt.teos_id AND s.id = tt.sijainti_id AND tek.henkilo_id = t.id AND tek.teos_id = te.id AND y.id = te.id
GROUP BY te.id, te.nimi, te.lajityyppi, te.valmis, te.viesti, y.kuv;`;

exports.haeTeokset = async () => {
  try {
    const tulos = await connection.query(sqlHaku);
    return tulos.rows;
  } catch (error) {
    return error;
  }
};
