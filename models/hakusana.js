const connection  = require('../config.js');

exports.haeHakuSanat = async (alku = 0, loppu = 9999) => {
    const alkuPvm = new Date(alku, 1, 1);
    const loppuPvm = new Date(loppu, 12, 31);
    try{
    const tulos = await connection
    .query( "SELECT DISTINCT hakusana.id AS id, sana FROM hakusana INNER JOIN ilmentyma ON hakusana.id = ilmentyma.sana_id " +
            "WHERE paivays>=$1 AND paivays<=$2", [alkuPvm, loppuPvm] );
      return tulos.rows;
    } catch (err) {
      console.log(err);
      return err;
    }
}
