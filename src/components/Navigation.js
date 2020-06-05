import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class Navigation extends React.Component {
  render () {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="/">CrimeHawk</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Resources</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation
