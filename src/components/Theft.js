import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'
import Table from 'react-bootstrap/Table'

class Theft extends React.Component {
  static propTypes = {
    crimeData: PropTypes.array,
    year: PropTypes.string
  }

  tableStyle = {
    border: '1px solid lightgray',
    width: '100%'
  }

  theadStyle = {
    // display: 'block'
  }

  tableStyle = {
    // display: 'block',
    height: '10rem',
    overflowY: 'scroll',
    width: '100%'
  }

  
  getLarcenies = () => {
    return this.props.crimeData.filter(crime => {
      const crimeYear = moment(crime.crimedate).year().toString()
      return crime.description.includes('LARCENY') && crimeYear === this.props.year
    })
  }

  createData = (property) => {
    // Create dictionary of larceny types
    const larcenies = this.getLarcenies()
    const dict = {}
    if (property === 'district' || property === 'description') {
      larcenies.forEach(larceny => {
        if (dict[larceny[property]]) {
          dict[larceny[property]] += 1
        } else {
          dict[larceny[property]] = 1
        }
      })
    } else if (property === 'crimedate') {
      let month
      for (let i = 0; i < 12; i++) {
        dict[i] = 0
      }
      larcenies.forEach(larceny => {
        month = moment(larceny.crimedate).month()
        dict[month] += 1
      })
    }

    // Construct highcharts data set
    const data = []
    for (const key in dict) {
      data.push(
        {
          name: key,
          y: dict[key]
        }
      )
    }
    return data
  }

  
  getDistrictOptions = () => {
    const data = this.createData('district')
    return {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Larcenies per District'
      },
      series: [
        {
          name: 'Thefts',
          data: data
        }
      ]
    }
  }

  
  getMonthlyOptions = () => {
    const data = this.createData('crimedate')
    return {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Larcenies per Month'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: '# of Larcenies'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        name: 'Larcenies',
        data: data.map(month => month.y)
      }]
    }
  }

  
  getLarcenyTypeOptions = () => {
    const data = this.createData('description')
    console.log(data.map(larceny => ({
      name: larceny.name,
      data: [larceny.y]
    })))
    return {
      chart: {
        type: 'bar'
      },
      title: {
        text: `Types of Larcenies in ${this.props.year}`
      },
      xAxis: {
        categories: data.map(larceny => larceny.name),
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Larcenies'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        name: 'Larcenies',
        data: data.map(month => month.y)
      }]
    }
  }

  
  render () {
    const districtOptions = this.getDistrictOptions()
    const monthlyOptions = this.getMonthlyOptions()
    const typeOptions = this.getLarcenyTypeOptions()
    return (
      <div>
        <Row>
          <Col>
            <h1>Larceny Page</h1>
            <h2>The year is {this.props.year}</h2>
            <HighchartsReact
              highcharts={Highcharts}
              options={districtOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <HighchartsReact
              highcharts={Highcharts}
              options={monthlyOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <HighchartsReact
              highcharts={Highcharts}
              options={typeOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Details of Each Larceny</h2>
            <Table responsive striped bordered="lg">
              <thead style={this.theadStyle}>
                <tr>
                  <th>
                    Date
                  </th>
                  <th>
                    Code
                  </th>
                  <th>
                    Description
                  </th>
                  <th>
                    Location
                  </th>
                  <th>
                    District
                  </th>
                </tr>
              </thead>
              <tbody style={this.tbodyStyle}>
                {this.getLarcenies()
                  .sort((a, b) => {
                    if (moment(a.crimedate).isBefore(b.crimedate)) return -1
                    if (moment(a.crimedate).isBefore(b.crimedate)) return 1
                    return 0
                  })
                  .map(larceny => {
                    return (
                      <tr key={larceny._id}>
                        <td>
                          {moment(larceny.crimedate).format('MM/DD/YYYY')}
                        </td>
                        <td>
                          {larceny.crimecode}
                        </td>
                        <td>
                          {larceny.description}
                        </td>
                        <td>
                          {larceny.location}
                        </td>
                        <td>
                          {larceny.district}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Theft
