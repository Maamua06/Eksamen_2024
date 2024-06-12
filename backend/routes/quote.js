const { Router } = require('express');

//Controller functions
const {getQuotes, getQuote, createQuotes, deleteQuotes, updateQuotes} = require('../controller/quoteController');
const requireAuth = require('../middleware/requireAuth');

const router = Router();

// Get one quote
router.get('/random', getQuote)

//get all quotes for the username
router.get('/:username', getQuotes)


// create a new quote
router.post('/',requireAuth, createQuotes)

// Delete quote
router.delete('/:id',requireAuth, deleteQuotes)

// Update quote
router.patch('/:id', requireAuth, updateQuotes)


module.exports = router;

