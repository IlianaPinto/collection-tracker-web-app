const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.get('/:collectionID', async (req,res) => {
    try {
        const items = await Item.find(req.params);
        if(!items) throw new Error('No item');
        const sorted = items.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();       
        })
        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: error.message })   
    }    
});

router.post('/', async (req, res) => {
    const newitem = new Item(req.body);
    try {
        const item = await newitem.save();
        if(!item) throw new Error('Something went wrong saving an item');
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Item.findByIdAndUpdate(id, req.body);
        if (!response) throw Error('Something went wrong while updating');
        const update = { ...response._doc, ...req.body }
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const removed = await Item.findByIdAndDelete(id)
        if (!removed) throw Error ('Something went wrong while deleting');
        res.status(200).json(removed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;