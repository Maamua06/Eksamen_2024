const mongoose = require('mongoose');

const DB = (URI) => {
    mongoose.connect(URI)
        .then(console.log('Connected to mongoDB'))
        .catch((err) => console.log(err))
        .finally(console.log('MongoDB connection process complete'));
}
 
module.exports = DB