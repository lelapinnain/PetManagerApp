import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Nav.Link id="RouterNavLink" as={Link} to="/">
            <Navbar.Brand>PuppyManager</Navbar.Brand>
          </Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link id="RouterNavLink" as={Link} to="/vaccines">
                <i class="fas fa-h-square"></i> Vaccines
              </Nav.Link>

              <Nav.Link id="RouterNavLink" as={Link} to="/login">
                <i className="fas fa-user"></i>Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
