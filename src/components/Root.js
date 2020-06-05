import React from 'react'
import Navigation from './Navigation'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

// This is for the highcharts example
// https://www.highcharts.com/blog/tutorials/highcharts-wrapper-for-react-101/
// All Charts and Map should be their own component
const options = {
  title: {
    text: 'My stock chart'
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9]
    }
  ]
}

class Root extends React.Component {
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
                <h1 className="display-4">CrimeHawk</h1>
                <p className="lead">
                  Crime information for the city of baltimore. Select crime type and year to display results.
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
                      <Form.Control as="select">
                        <option value="0">Search By Crime Type</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={5}>
                    <Form.Group>
                      <Form.Control as="select">
                        <option value="0">Search By Crime Year</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={2}>
                    <Form.Group>
                      <Button variant="primary" type="submit" className="mx-auto d-block">Go</Button>
                    </Form.Group>
                  </Col>
                </Form.Row>
              </Form>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Card>
                <Card.Header className="bg-dark text-white">Chart</Card.Header>
                <Card.Body>
                  <Card.Title>Title</Card.Title>
                  <Card.Text>Text</Card.Text>
                  <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options}></HighchartsReact>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Card>
                <Card.Header className="bg-dark text-white">Data</Card.Header>
                <Card.Body>
                  <Card.Title>Title</Card.Title>
                  <Card.Text>Text</Card.Text>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Root
