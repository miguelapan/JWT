const express = require('express')
const router = express.Router()
const Products = require('../models/products')
const authenticateToken = require('../modules/authenticateToken')

// GET ALL 
router.get('/', authenticateToken, async (req, res)=> {
    try{
        const product = await Products.find()
        res.status(200).json(product)
    }catch(err){
        res.status(404).json({message: err.message})
    }
})
// GET ONE 
router.get('/:id', authenticateToken, async (req, res)=> {
    const product = await Products.findById(req.params.id)
    res.json(product)
})

// POST ONE 

router.post('/', authenticateToken, async (req, res)=> {
    const product = new Products({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageURL: req.body.imageURL
    })
    try{
        const newProduct = await product.save()
        res.status(200).json(newProduct)
    }catch(err) {
        res.status(400).json({message: err.message})
    }
})
// PUT ONE 

router.put('/:id', async (req, res)=> {
    const product = await Products.findById(req.params.id)
    if(product == null){
        res.json({message: "No product is found"})
        return false
    }
    if(req.body.name != null){
        product.name = req.body.name
    }
    if(req.body.description != null){
        product.description = req.body.description
    }
    if(req.body.price != null){
        product.price = req.body.price
    }
    if(req.body.imageURL != null){
        product.imageURL = req.body.imageURL
    }
    try{
        const updatedProduct = await product.save()
        res.status(200).json(updatedProduct)
    }catch(err) {
        res.status(400).json({message: err.message})
    }
})
// DELETE ONE 
router.delete('/:id', async (req, res)=> {
    const product = await Products.findById(req.params.id)
    if(product == null){
        res.json({message: "No product is found"})
        return false
    }
    try{
        product.deleteOne()
        res.json(product.name + " is deleted")
    }catch(err){
        res.json(err)
    } 
})

module.exports = router