/* jslint es6 */
const {Pool} = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "904793",
    database: "texta",
    port: "5432"

});

module.exports = pool;