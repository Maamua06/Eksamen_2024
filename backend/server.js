// Require the .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Handlers
const DB = require('./handler/dbHandler'); 

// Import Routes
const userRoutes = require('./routes/user');
const quoteRoutes = require('./routes/quote');

// Import env config
const PORT = process.env.PORT || 6001;
const MONGO_URI = process.env.MONGO_URI;
const CORS = process.env.CORS;




const app = express();

// App listen
app.listen(PORT, DB(MONGO_URI));

// middelware
app.use(express.json())
app.use(cors({
    origin: CORS
}))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})


// Routes
app.use('/api/quotes', quoteRoutes);
app.use('/api/user', userRoutes);