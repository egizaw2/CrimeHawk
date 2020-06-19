import React from 'react'
import Navigation from './Navigation'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Burglary from './Burglary'
import Homicide from './Homicide'
import Theft from './Theft'
import PropTypes from 'prop-types'
// import Card from 'react-bootstrap/Card'
// import Table from 'react-bootstrap/Table'
// import Highcharts from 'highcharts/highstock'
// import HighchartsReact from 'highcharts-react-official'

class Root extends React.Component {
  static propTypes = {
    crimeData: PropTypes.array.isRequired
  }

  state = {
    crimeType: '', // Can be Burglary, Homicide, or Theft
    year: '' // Can be 2014-2020
  }

  componentDidMount () {
    console.log(this.props.crimeData.length)
  }

  handleCrimeChange = (e) => {
    const type = e.target.value
    this.setState(() => (
      {
        crimeType: type
      }
    ))
  }

  handleYearChange = (e) => {
    const year = e.target.value
    this.setState(() => (
      {
        year
      }
    ))
  }

  render () {
    return (
      <div>
        <Container fluid className="pl-0 pr-0">
          <Navigation />
        </Container>
        <Container>
          <Row>
            <Col>
              <Jumbotron className="mt-2 bg-dark text-white">
                <h1 className="display-2 font-weight-bold">CrimeHawk</h1>
                <p className="lead">
                  Crime information for the city of Baltimore
                </p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Row>
                  <Col xs={12} sm={12} md={5}>
                    <Form.Group>
                      <Form.Control
                        as="select"
                        onChange={this.handleCrimeChange}
                      >
                        <option value="0">Search By Crime Type</option>
                        <option>Burglary</option>
                        <option>Homicide</option>
                        <option>Theft</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={5}>
                    <Form.Group>
                      <Form.Control
                        as="select"
                        onChange={this.handleYearChange}
                      >
                        <option value="0">Search By Crime Year</option>
                        <option>2014</option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={2}>
                    <Form.Group>
                      <Button variant="primary" type="submit" className="mx-auto d-block">Submit</Button>
                    </Form.Group>
                  </Col>
                </Form.Row>
              </Form>
            </Col>
          </Row>
          {this.state.crimeType === 'Burglary' && this.state.year && <Burglary year={this.state.year} />}
          {this.state.crimeType === 'Homicide' && this.state.year && <Homicide year={this.state.year} />}
          {this.state.crimeType === 'Theft' && this.state.year && <Theft year={this.state.year} />}
          {(!this.state.crimeType || !this.state.year) && <h1>Please select a Crime Type and Year</h1>}
        </Container>
      </div>
    )
  }
}

export default Root
