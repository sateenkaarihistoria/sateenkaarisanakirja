const { Pool, Client } = require('pg');
require('dotenv').config();

var connection = {};
//otetaan tietokantayhteys .env muuttujilla
if (process.env.NODE_ENV !== "production") {
	connection = new Pool({
	    user: process.env.DB_USER,
	    host: process.env.DB_HOST,
	    database: process.env.DB_DATABASE,
	    password: process.env.DB_PASS,
	    port: process.env.DB_PORT,
	});
} else {
	connection = new Pool({
	    connectionString: process.env.DATABASE_URL,
	    ssl: { rejectUnauthorized: false }
	});
}

//testataan yhteys
connection.query('SELECT NOW()', (err, res) => {
   console.log(err, res)
})

module.exports = connection;