const mongoose = require('mongoose');
const { Schema } = mongoose;

const Item = new Schema({
    collectionID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Item', Item);
