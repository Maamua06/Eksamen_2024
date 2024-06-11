const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const userRoutes = require('./routes/user');
const quoteRoutes = require('./routes/quote');


// Require the .env file
require('dotenv').config();

const app = express();

// App listen
app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(console.log('mongo conect'))
        .catch((err) => console.log(err));
});

// middelware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})


// Routes
app.use('/api/quotes', quoteRoutes);
app.use('/api/user', userRoutes);