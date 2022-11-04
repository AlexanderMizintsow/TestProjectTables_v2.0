const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "matrix1988",
    host: "localhost",
    port: 5432,
    database: "TestBase"
})

module.exports = pool;