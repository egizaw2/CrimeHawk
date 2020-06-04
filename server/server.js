const express = require('express')
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

app.listen(port, () => {
  console.log('Server is up!')
})
