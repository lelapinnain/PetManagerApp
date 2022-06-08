import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import './SideBar.css'
import { logout } from '../../actions/userActions'

function SideBar() {
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
    <div className="sidebar">
      <div className="profile">
        <img
          src="https://thumbs.dreamstime.com/z/puppy-icon-one-dog-breeds-hand-draw-white-background-155676318.jpg"
          onClick={() => {
            navigate('/')
          }}
        />
        {/* <h3>
          {' '}
          <Nav.Link id="RouterNavLink" as={Link} to="/">
            <Navbar.Brand className="white">PuppyManager</Navbar.Brand>
          </Nav.Link>
        </h3> */}
        <h3
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/')
          }}
        >
          PetManager
        </h3>
      </div>

      {uInfo ? (
        <ul>
          <li>
            <NavDropdown title={`Welcome ${uInfo.firstName}`} id="collasible-nav-dropdown" menuVariant="dark">
              <Link id="RouterNavLink" to="/profile">
                Profile
              </Link>

              <NavDropdown.Item onClick={logoutHandeler}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </li>

          <li>
            <NavDropdown title={`Vaccines`} id="nav-dropdown" menuVariant="dark">
              <Nav.Link id="RouterNavLink" as={Link} to="/DailyVaccines/2">
                DAPPV
              </Nav.Link>
              {/* <Link to="/test">test</Link> */}

              <Nav.Link id="RouterNavLink" as={Link} to="/DailyVaccines/1">
                IntraTrac3
              </Nav.Link>
              {/* <Link to="/test">test</Link> */}

              <Nav.Link id="RouterNavLink" as={Link} to="/DailyVaccines/3">
                Rabies
              </Nav.Link>
              {/* <Link to="/test">test</Link> */}
            </NavDropdown>
          </li>
          <li>
            <Nav.Link id="RouterNavLink" as={Link} to="/Appointments">
              <i className="fas fa-table"></i>Appointments
            </Nav.Link>
          </li>
          <li>
            <Nav.Link id="RouterNavLink" as={Link} to="/Invoices">
              <i className="fas fa-table"></i>Invoices
            </Nav.Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Nav.Link id="RouterNavLink" as={Link} to="/login">
              <i className="fas fa-user"></i>Sign In
            </Nav.Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default SideBar
