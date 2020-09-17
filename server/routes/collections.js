const express = require('express');
const router = express.Router();

const Collection = require('../models/Collection');

router.get('/', async (req,res) => {
    const collections = await Collection.find(req.params.userID);
    res.json(collections);
});

router.post('/', async (req, res) => {
    const collection = new Collection(req.body);
    await collection.save();
    res.json({
        staus: 'Collection saved!',
    });
})

router.put('/:id', async (req, res) => {
    await Collection.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "Collection updated!",
    })
})

router.delete('/:id', async (req, res) => {
    await Collection.findByIdAndRemove(req.params.id);
    res.json({
        status: "Collection deleted",
    })
})

module.exports = router;