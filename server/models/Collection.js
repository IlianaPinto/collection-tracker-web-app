const mongoose = require('mongoose');
const { Schema } = mongoose;

const Collection = new Schema({
    userID: String,
    name: String,
});

module.exports = mongoose.model('Collection', Collection);
