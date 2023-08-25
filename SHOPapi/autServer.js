require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
const cors = require('cors')

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to db'))

app.use(express.json())

const loginRouter = require('./routes/login')

app.use('/login', loginRouter)

app.listen(4000, console.log('server 4000 has started'))