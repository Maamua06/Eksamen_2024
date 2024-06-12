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

// Delete quotes
const deleteQuotes = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json(({ error: 'No such idea' }));
    }

    const quote = await Quote.findOneAndDelete({ _id: id });

    if(!quote) {
        return res.status(400).json({ error: 'No such idea' });
    }

    res.status(200).json(quote);
};

// Update quotes
const updateQuotes = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Quotes to update'});
    }

    const quote = await Quote.findOneAndUpdate({ _id: id }, {...req.body });

    if(!quote) {
        return res.status(400).json({ error: 'No Quotes to update'});
    }

    res.status(200).json(quote);
};

module.exports = {
    getQuotes,
    getQuote,
    createQuotes,
    deleteQuotes,
    updateQuotes
}