const express = require('express')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const path = require('path')
const schedule = require('node-schedule')
const fetch = require('node-fetch')

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
const collectionName = 'CrimeData'
let db

MongoClient.connect(url, (error, client) => {
  if (error) throw error
  console.log('Connected successfully to MongoDB Atlas server')

  db = client.db(dbName)

  db.createCollection(collectionName)
})

app.listen(port, () => {
  console.log('Server is up!')
})

// API request for crime data
const getCrimeData = async () => {
  const response = await fetch('https://data.baltimorecity.gov/resource/nhwe-7c7x.json')
  const data = await response.json()
  return data
}

// Node schedule
const getDataAtMidnight = schedule
getDataAtMidnight.scheduleJob(
  { hour: 0, minute: 0 },
  async () => {
    // Get crime data
    const data = getCrimeData()

    // Overwrite all data if there
    if (data) {
      await db.dropCollection(collectionName)
      await db.createCollection(collectionName)
      db.collection(collectionName).insertMany(data)
    }
  }
)
