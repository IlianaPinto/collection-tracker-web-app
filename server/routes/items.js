const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.get('/', async (req,res) => {
    const items = await Item.find(req.params.categoryID);
    res.json(items);
});

router.post('/', async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.json({
        staus: 'Item saved!',
    });
})

router.put('/:id', async (req, res) => {
    await Item.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "Item updated!",
    })
})

router.delete('/:id', async (req, res) => {
    await Item.findByIdAndRemove(req.params.id);
    res.json({
        status: "Item deleted",
    })
})

module.exports = router;