const mongoose = require('mongoose');
const { Schema } = mongoose;

const Category = new Schema({
    userID: String,
    name: String,
});

module.exports = mongoose.model('Category', Category);
