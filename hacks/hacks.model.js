const mongoose = require('mongoose');


const hackSchema = new mongoose.Schema({
     category: String,
     description: String,
     item: String,
     userId: String,
});


module.exports = mongoose.model('hacks', hackSchema);