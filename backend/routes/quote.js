const { Router } = require('express');

//Controller functions
const {getQuotes, getQuote, createQuotes} = require('../controller/quoteController');
const requireAuth = require('../middleware/requireAuth');

const router = Router();

// Get one quote
router.get('/random', getQuote)

//get all quotes for the username
router.get('/:username', getQuotes)


// create a new quote
router.post('/',requireAuth, createQuotes)

module.exports = router;

