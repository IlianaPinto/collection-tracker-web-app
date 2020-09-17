const mongoose = require('mongoose');
const { Schema } = mongoose;

const Collection = new Schema({
    userID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Collection', Collection);
