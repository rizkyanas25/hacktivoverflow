require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const PORT = process.env.PORT
const route = require('./routes/routes')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL,{ useNewUrlParser : true })

app.use(cors()) 
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(route)

app.listen(PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)  
})