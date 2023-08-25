require('dotenv').config()
const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validationLogin = require('../modules/validation')

// AUTHENTICATE POST 




router.post('/', async (req, res) => {
    validationLogin(req.body)
        const {error} = validationLogin(req.body);
        if(error) return res.status(400).send(error.details[0].message)
    const user = await Users.findOne({username: req.body.username})
    if(!user) {
        res.json('NO USER CAN BE FOUND')
        return
    }try{
        if(await bcrypt.compare(req.body.password, user.password)){
            const username = user.username
            const payload = { name: username }

            const accessToken = generateToken(payload)
            res.json({ accessToken: accessToken})

        }else{
            res.status(400).json('NOT ALLOWED')
        }

    }catch(err){
        res.json('WRONG PASSWORD ')
    }
})

function generateToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN)
}

module.exports = router 