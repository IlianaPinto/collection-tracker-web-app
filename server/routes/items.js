const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.get('/', async (req,res) => {
    const item = await Item.find();
});

module.exports = router;