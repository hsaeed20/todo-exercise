const path = require('path'); //hanldes file paths
const express = require('express'); //Loads express library
const app = require(path.join(__dirname, 'src', 'app')); //Loads Express app
require('dotenv').config(); //handles confidential info not being seen in server.

const { Pool } = require('pg'); // Manages a pool of reusable TCP connections for running Postgres queries efficiently
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const PORT = process.env.PORT || 4000;

//Used to check if the table exists via ASYNC call and using wait-for file
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE
      );
    `);
    console.log("Table 'todos' guranteed in database!");
  } catch (err) {
    console.error("Error getting 'todos' table:", err);
  }
})();

app.use(express.static('frontend')); /// Serve static frontend files (HTML, CSS, JS) from the 'frontend' folder
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//File listens to HTTP requests from either frontend or Postman, or any client making HTTP calls to the API 