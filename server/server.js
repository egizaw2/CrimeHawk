const express = require('express')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const path = require('path')

// Express Setup
const app = express()
const port = process.env.PORT || 8000
const publicPath = path.join(__dirname, '..', 'public')
app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

// MongoDB Setup
const url = 'mongodb+srv://CrimeHawk:BpgWODrXCT8u0pZS@crimehawk-bdw7f.mongodb.net/CrimeHawk?retryWrites=true&w=majority'
const dbName = 'CrimeHawk'
const MongoClient = mongodb.MongoClient

MongoClient.connect(url, (error, client) => {
  if (error) throw error
  console.log('Connected successfully to MongoDB Atlas server')

  const db = client.db(dbName)

  db.createCollection('CrimeData')
  db.listCollections().toArray((error, collections) => {
    if (error) throw error
    console.log(collections)
  })
})

app.listen(port, () => {
  console.log('Server is up!')
})
