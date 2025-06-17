// Load environment variables from .env 
require('dotenv').config();
console.log(process.env.DATABASE_URL);

//Import pg's Pool class
const { Pool } = require('pg');

// Create a new connection pool using DATABASE_URL 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Export the pool so the other files can use it. 
module.exports = pool;

//This file was made to create a pool connection and to make it reuseable in the other backend JS files. 
//Wanted to complement DRY rule (Don't Repeat Yourself).