require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
const cors = require('cors')

const shopRouter = require('./routes/shop')
const usersRouter = require('./routes/users')

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to db'))

app.use(express.json())


app.use('/shop', shopRouter)
app.use('/users', usersRouter)

app.listen(3000, console.log('server 3000 has started'))