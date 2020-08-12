import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Get crime data then load html
fetch('/crime_data')
  .then(response => response.json())
  .then(data => {
    ReactDOM.render(<Root crimeData={data} />, document.getElementById('app'))
  })
