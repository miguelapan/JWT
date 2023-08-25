require('dotenv').config()
const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validationReg = require('../modules/validation')
const authenticateToken = require('../modules/authenticateToken')

// GET ALL 
router.get('/', authenticateToken, async (req, res) => {
    try{
        const user = await Users.find()
        res.json(user.filter(users => users.username === req.user.name))
    }catch(err){
        res.json()
    }
})
// GET ONE 
router.get('/:id', async (req, res)=> {

})

// POST ONE 

router.post('/', async (req, res)=> {
    validationReg(req.body)
    const {error} = validationReg(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const userExist = await Users.findOne({username: req.body.username})
    if(userExist) return res.status(400).send('USERNAME IS TAKEN')

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new Users({
        username: req.body.username,
        password: hashedPassword
    })
    try{
        const newUser = await user.save()
        res.json(newUser)
    }catch(err){
        res.json({message: err.message})
    }
})

// PUT ONE 

router.put('/:id', async (req, res)=> {
    
})
// DELETE ONE 
router.delete('/:id', authenticateToken, async (req, res)=> {
    const user = await Users.findById(req.params.id)
    if(!user) {
        res.json('cannot find user')
        return
    }
    try{
        user.deleteOne()
        res.json('user is deleted')
    }catch(err){
        res.json({message: err.message})
    }
})

module.exports = router