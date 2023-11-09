const express = require('express')
const app = express()
const cors = require('cors')
const mainRoute = require('./route/mainRoute')
const db = require('./db')
const env = require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

console.log('conn');
app.use('/',mainRoute)


app.listen(process.env.PORT, () => {
  console.log(`app listening at http://localhost:${process.env.PORT}`)
})