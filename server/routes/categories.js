const express = require('express');
const router = express.Router();

const Category = require('../models/Category');

router.get('/', async (req,res) => {
    const categories = await Category.find(req.params.userID);
    res.json(categories);
});

router.post('/', async (req, res) => {
    const category = new Category(req.body);
    await category.save();
    res.json({
        staus: 'Category saved!',
    });
})

router.put('/:id', async (req, res) => {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "Category updated!",
    })
})

router.delete('/:id', async (req, res) => {
    await Category.findByIdAndRemove(req.params.id);
    res.json({
        status: "Category deleted",
    })
})

module.exports = router;