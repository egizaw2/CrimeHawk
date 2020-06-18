import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

class Theft extends React.Component {
  static propTypes = {
    year: PropTypes.string
  }

  render () {
    return (
      <Row>
        <Col>
          <h1>Theft Page</h1>
          <h2>The year is {this.props.year}</h2>
        </Col>
      </Row>
    )
  }
}

export default Theft
