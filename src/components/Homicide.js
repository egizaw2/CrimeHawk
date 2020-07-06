import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import moment from 'moment'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Table from 'react-bootstrap/Table'

class Homicide extends React.Component {
  static propTypes = {
    crimeData: PropTypes.array,
    year: PropTypes.string
  }

  tableStyle = {
    border: '1px solid lightgray',
    width: '100%'
  }

  theadStyle = {

  }

  tbodyStyle = {
    height: '10rem',
    overflowY: 'scroll',
    width: '100%'
  }

  getHomicides = () => {
    return this.props.crimeData.filter(crime => {
      const crimeYear = moment(crime.crimedate).year().toString()
      return crime.description === 'HOMICIDE' && crimeYear === this.props.year
    })
  }

  createData = (property) => {
    const homicides = this.getHomicides()
    const dict = {}
    if (property === 'district') {
      homicides.forEach(homicide => {
        if (dict[homicide[property]]) {
          dict[homicide[property]] += 1
        } else {
          dict[homicide[property]] = 1
        }
      })
    } else if (property === 'crimedate') {
      let month
      for (let i = 0; i < 12; i++) {
        dict[i] = 0
      }
      homicides.forEach(homicide => {
        month = moment(homicide.crimedate).month()
        dict[month] += 1
      })
    }

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
        text: 'Homicides per District'
      },
      series: [
        {
          name: 'districts',
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
        text: 'Homicides per Month'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: '# of Homicides'
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
        name: 'Homicides',
        data: data.map(month => month.y)
      }]
    }
  }
  // Construct

  render () {
    const districtOptions = this.getDistrictOptions()
    const monthlyOptions = this.getMonthlyOptions()
    return (
      <div>
        <Row>
          <Col>
            <h1>Homicide Page</h1>
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
            <h2>Details of Each Homicide</h2>
            <Table responsive striped bordered ="lg">
              <thead style={this.theadStyle}>
                <tr>
                  <th>
                    Date
                  </th>
                  <th>
                    code
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
                {this.getHomicides()
                  .sort((a, b) => {
                    if (moment(a.crimedate).isBefore(b.crimedate)) return -1
                    if (moment(a.crimedate).isBefore(b.crimedate)) return 1
                    return 0
                  })
                  .map(homicide => {
                    return (
                      <tr key={homicide._id}>
                        <td>
                          {moment(homicide.crimedate).format('MM/DD/YYYY')}
                        </td>
                        <td>
                          {homicide.crimecode}
                        </td>
                        <td>
                          {homicide.description}
                        </td>
                        <td>
                          {homicide.location}
                        </td>
                        <td>
                          {homicide.district}
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

export default Homicide
