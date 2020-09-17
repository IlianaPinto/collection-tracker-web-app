const express = require('express');
const router = express.Router();

const Collection = require('../models/Collection');

router.get('/', async (req,res) => {
    try {
        const collections = await Collection.find(req.params.userID);
        if(!collections) throw new Error('No collection');
        const sorted = collections.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();       
        })
        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: error.message })   
    }    
});

router.post('/', async (req, res) => {
    const newcollection = new Collection(req.body);
    try {
        const collection = await newcollection.save();
        if(!collection) throw new Error('Something went wrong saving a collection');
        res.status(200).json(collection);
    } catch (error) {
        console.log("error");
        res.status(500).json({message: error.message});
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Collection.findByIdAndUpdate(id, req.body);
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
        const removed = await Collection.findByIdAndDelete(id)
        if (!removed) throw Error ('Something went wrong while deleting');
        res.status(200).json(removed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;