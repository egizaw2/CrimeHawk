import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'

class Burglary extends React.Component {
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

  tbodyStyle = {
    // display: 'block',
    height: '10rem',
    overflowY: 'scroll',
    width: '100%'
  }

  getBurglaries = () => {
    return this.props.crimeData.filter(crime => {
      const crimeYear = moment(crime.crimedate).year().toString()
      return crime.description === 'BURGLARY' && crimeYear === this.props.year
    })
  }

  createData = (property) => {
    // Create dictionary of burglary types
    const burglaries = this.getBurglaries()
    const dict = {}
    if (property === 'district') {
      burglaries.forEach(burglary => {
        if (dict[burglary[property]]) {
          dict[burglary[property]] += 1
        } else {
          dict[burglary[property]] = 1
        }
      })
    } else if (property === 'crimedate') {
      let month
      for (let i = 0; i < 12; i++) {
        dict[i] = 0
      }
      burglaries.forEach(burglary => {
        month = moment(burglary.crimedate).month()
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
        text: 'Burglaries per District'
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
        text: 'Burglaries per Month'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: '# of Burglaries'
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
        name: 'Burglaries',
        data: data.map(month => month.y)
      }]
    }
  }

  render () {
    const districtOptions = this.getDistrictOptions()
    const monthlyOptions = this.getMonthlyOptions()
    return (
      <div>
        <Row>
          <Col>
            <h1>Burglary Page</h1>
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
            <h2>Details of Each Burglary</h2>
            <table style={this.tableStyle}>
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
                {this.getBurglaries()
                  .sort((a, b) => {
                    if (moment(a.crimedate).isBefore(b.crimedate)) return -1
                    if (moment(a.crimedate).isBefore(b.crimedate)) return 1
                    return 0
                  })
                  .map(burglary => {
                    return (
                      <tr key={burglary._id}>
                        <td>
                          {moment(burglary.crimedate).format('MM/DD/YYYY')}
                        </td>
                        <td>
                          {burglary.crimecode}
                        </td>
                        <td>
                          {burglary.description}
                        </td>
                        <td>
                          {burglary.location}
                        </td>
                        <td>
                          {burglary.district}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Burglary
