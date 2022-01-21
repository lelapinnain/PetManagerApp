import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="container-fluid justify-content-center">
      <Nav.Item>
        {step1 ? (
          <Nav.Link>
            <Link className="nav-link" to="/Checkout" style={{ color: 'teal' }}>
              Puppy <i className="fas fa-check"></i>
            </Link>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <Link className="nav-link" to="/Checkout">
              Puppy
            </Link>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Nav.Link>
            {/* <Button variant="secondary" className="rounded">
              1
            </Button> */}
            <Link
              className="nav-link"
              to="/CheckoutCustomer"
              style={{ color: 'teal' }}
            >
              Customer <i className="fas fa-check"></i>
            </Link>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <Link className="nav-link" to="/CheckoutCustomer">
              Customer
            </Link>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Nav.Link>
            <Link className="nav-link" to="/payment" style={{ color: 'teal' }}>
              Payment <i className="fas fa-check"></i>
            </Link>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <Link className="nav-link" to="/payment">
              Payment
            </Link>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <Nav.Link>
            <Link
              className="nav-link"
              to="/placeorder"
              style={{ color: 'teal' }}
            >
              Invoice <i className="fas fa-check"></i>
            </Link>
          </Nav.Link>
        ) : (
          <Nav.Link disabled>
            <Link className="nav-link" to="/placeorder">
              Invoice
            </Link>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
