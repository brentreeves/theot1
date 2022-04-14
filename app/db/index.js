require("dotenv").config();
const { Pool } = require("pg"); // client vs pool

const { RUNNING, DATABASE_URL_LOCAL, DATABASE_URL } = process.env;
console.log("DATABASE_URL_LOCAL", DATABASE_URL_LOCAL);
console.log("DATABASE_URL", DATABASE_URL);

var pool = ''
if (typeof DATABASE_URL !== "undefined") {
    console.log('Setting: PRODUCTION: ', DATABASE_URL);
    pool = new Pool({
	connectionString: DATABASE_URL,
	ssl: { rejectUnauthorized: false },
    });
} else {
    console.log('Setting: TEST: ', DATABASE_URL_LOCAL);
    var ssl = false
    pool = new Pool({
	connectionString: DATABASE_URL_LOCAL,
	idleTimeoutMillis: 15000,
	connectionTimeoutMillis: 3000,
	ssl: ssl
    });
}
// pool.connect()



module.exports = {
    query: (text, params) => pool.query(text, params),
}

// const sql = "select table_catalog, table_schema, table_name, table_type from information_schema.tables where table_catalog = 'local_acufifa' and table_schema = 'public'";

