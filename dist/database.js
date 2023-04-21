"use strict";
// connection
const { Pool } = require('pg');
const { database } = {
    database: null
};
const pool = new Pool(database);
module.exports = pool;
