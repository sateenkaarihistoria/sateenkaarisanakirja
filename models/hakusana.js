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
