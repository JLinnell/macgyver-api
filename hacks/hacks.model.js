const mongoose = require('mongoose');

const hackSchema = new mongoose.Schema({
     type: String,
     description: String,
     item: String
});


module.exports = mongoose.model('hacks', hackSchema);