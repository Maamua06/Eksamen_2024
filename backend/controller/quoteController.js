const Quote = require('../models/quotesModel');
const mongoose = require('mongoose');

// Get all quotes
const getQuotes = async (req, res) => {
    const username = req.params.username
    const quotes = await Quote.find({author: username }).sort({ createdAt: -1});
    
    res.status(200).json({quotes});
}

// Get one quote
const getQuote = async (req, res) => {

    try{
        const quotes = await Quote.find()
        const randomIndex = Math.random()*quotes.length
        const quote = quotes[Math.floor(randomIndex)]
        
        if(!quotes) {
            throw Error("No quotes found")
        }
        res.status(200).json(quote);
    }catch(error){
        res.status(400).json({ error: error.message});
    }



}

// Create quotes
const createQuotes = async (req, res) => {
    const {body, author} = req.body;

    try {
        if(!body || !author){
            throw Error('Please fill in all the fields')
        }

        //add to db
        const user_id = req.user._id;
        const quote = await Quote.create({ body, author, user_id});

        res.status(200).json(quote);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

module.exports = {
    getQuotes,
    getQuote,
    createQuotes
}