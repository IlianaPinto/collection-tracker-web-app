const mongoose = require('mongoose');
const { Schema } = mongoose;

const Item = new Schema({
    name: String,
    value: Number,
    year: Number,
    condition: String,
    location: String
});

module.exports = mongoose.model('Item', Item);
