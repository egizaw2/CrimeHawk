const express = require('express')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const path = require('path')
const schedule = require('node-schedule')
const fetch = require('node-fetch')

// Express Setup
// Completed 6/28/2020 by Andrew Landis
const app = express()
const port = process.env.PORT || 8000
const publicPath = path.join(__dirname, '..', 'public')
app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

// MongoDB Setup
// Completed 6/28/2020 by Andrew Landis
const url = 'mongodb+srv://CrimeHawk:BpgWODrXCT8u0pZS@crimehawk-bdw7f.mongodb.net/CrimeHawk?retryWrites=true&w=majority'
const dbName = 'CrimeHawk'
const MongoClient = mongodb.MongoClient
const collectionName = 'CrimeData'
let db

MongoClient.connect(
  url,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) throw error
    console.log('Connected successfully to MongoDB Atlas server')

    db = client.db(dbName)

    db.createCollection(collectionName)
  }
)

// HTTP request handling
// Completed 6/28/2020 by Eske Gizaw
app.listen(port, () => {
  console.log('Server is up!')
})

app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

app.get('/crime_data', async (request, response) => {
  const data = await db.collection(collectionName).find().toArray()
  response.status(200).send(data)
})

// API request for crime data
// Completed 6/28/2020 by Andrew Landis
const getCrimeData = async () => {
  console.log('Getting crime data')
  const response = await fetch(
    'https://data.baltimorecity.gov/resource/nhwe-7c7x.json?$limit=10000',
    {
      method: 'get',
      headers: {
        'X-App-Token': '24EVQPJRNXkVYgAhaYeOX1kY0'
      }
    }
  )
  const data = await response.json()
  return data
}

// Node schedule
// Completed 6/28/2020 by Eske Gizaw
const getDataAtMidnight = schedule
getDataAtMidnight.scheduleJob(
  { hour: 0, minute: 0 },
  async () => {
    // Get crime data
    const data = await getCrimeData()

    // Overwrite all data if there
    if (data) {
      await db.dropCollection(collectionName)
      await db.createCollection(collectionName)
      db.collection(collectionName).insertMany(data)
    }
  }
)
