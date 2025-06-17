const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const path = require('path');

const app = express();

app.use(cors()); //cors allows cross-origin requirements (utilization of front-end)
app.use(express.json()); //allows express to parse JSON on any incoming requests

app.use(express.static(path.join(__dirname, '../../frontend'))); //Handles static files because we do not need routes for non-API files

// API routes that will handle all routes in the todoRoutes file and makes it accessible to clientsß
app.use('/api', todoRoutes); 

module.exports = app;


//File is Express app config file. Handles building server features. 