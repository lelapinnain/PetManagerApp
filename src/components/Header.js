import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo

  //console.log(userInfo.uInfo.token)

  const logoutHandeler = () => {
    dispatch(logout())
    navigate('/login')
  }
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
              {uInfo ? (
                <>
                  <Nav.Link id="RouterNavLink" as={Link} to="/Appointments">
                    <i className="fas fa-table"></i>Appointments
                  </Nav.Link>
                  <NavDropdown
                    title={`Vaccines`}
                    id="nav-dropdown"
                    menuVariant="dark"
                  >
                    <NavDropdown.Item>
                      <Nav.Link
                        id="RouterNavLink"
                        as={Link}
                        to="/DailyVaccines/2"
                      >
                        DAPPV
                      </Nav.Link>
                      {/* <Link to="/test">test</Link> */}
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link
                        id="RouterNavLink"
                        as={Link}
                        to="/DailyVaccines/1"
                      >
                        IntraTrac3
                      </Nav.Link>
                      {/* <Link to="/test">test</Link> */}
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link
                        id="RouterNavLink"
                        as={Link}
                        to="/DailyVaccines/3"
                      >
                        Rabies
                      </Nav.Link>
                      {/* <Link to="/test">test</Link> */}
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={`Welcome ${uInfo.firstName}`}
                    id="nav-dropdown"
                    menuVariant="dark"
                  >
                    <NavDropdown.Item>
                      <Nav.Link id="RouterNavLink" as={Link} to="/profile">
                        Profile
                      </Nav.Link>
                      {/* <Link to="/test">test</Link> */}
                    </NavDropdown.Item>
                    <Link to="/test">test</Link>

                    <NavDropdown.Item onClick={logoutHandeler}>
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link id="RouterNavLink" as={Link} to="/login">
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
