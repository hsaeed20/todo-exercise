const path = require('path');
const express = require('express');
const app = require(path.join(__dirname, 'src', 'app'));
require('dotenv').config();

const { Pool } = require('pg');
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

app.use(express.static('frontend'));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//File listens to HTTP requests from either frontend or Postman, or any client making HTTP calls to the API 