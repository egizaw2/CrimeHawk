import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

class Homicide extends React.Component {
  static propTypes = {
    year: PropTypes.string
  }

  render () {
    return (
      <Row>
        <Col>
          <h1>Homicide Page</h1>
          <h2>The year is {this.props.year}</h2>
        </Col>
      </Row>
    )
  }
}

export default Homicide
// // This is for the highcharts example
// // https://www.highcharts.com/blog/tutorials/highcharts-wrapper-for-react-101/
// // All Charts and Map should be their own component
// const options = {
//   title: {
//     text: 'My stock chart'
//   },
//   series: [
//     {
//       data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9]
//     }
//   ]
// }

// <Row className="mt-3">
//             <Col>
//               <Card>
//                 <Card.Header className="bg-dark text-white">Chart</Card.Header>
//                 <Card.Body>
//                   <Card.Title>Title</Card.Title>
//                   <Card.Text>Text</Card.Text>
//                   <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options}></HighchartsReact>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//           <Row className="mt-3">
//             <Col>
//               <Card>
//                 <Card.Header className="bg-dark text-white">Data</Card.Header>
//                 <Card.Body>
//                   <Card.Title>Title</Card.Title>
//                   <Card.Text>Text</Card.Text>
//                   <Table striped bordered hover>
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Username</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>1</td>
//                         <td>Mark</td>
//                         <td>Otto</td>
//                         <td>@mdo</td>
//                       </tr>
//                       <tr>
//                         <td>2</td>
//                         <td>Jacob</td>
//                         <td>Thornton</td>
//                         <td>@fat</td>
//                       </tr>
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
