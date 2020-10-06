const { Pool, Client } = require('pg');
require('dotenv').config();

//otetaan tietokantayhteys .env muuttujilla
const connection = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});
//testataan yhteys
connection.query('SELECT NOW()', (err, res) => {
   console.log(err, res)
})

module.exports = connection;