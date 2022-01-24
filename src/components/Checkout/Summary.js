import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { generateInvoiceAction } from '../../actions/checkoutActions'

function Summary() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const checkout = useSelector((state) => state.checkout)
  const { Checkout } = checkout
  const { Payment } = Checkout
  const { Pet } = Checkout
  const { Customer } = Checkout

  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const generateInvoice = useSelector((state) => state.generateInvoice)
  const { success, data: invoiceData } = generateInvoice

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [invoiceData, success, token, navigate])

  const handleSubmit = () => {
    const data = {
      PetId: Pet.petId,
      Customer,
      Payment,
    }
    dispatch(generateInvoiceAction(data))
  }

  return (
    <>
      <h1>Order Summary</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush" style={{ background: 'white' }}>
            <ListGroup.Item>
              <h2>Puppy Information</h2>
              <p>
                <strong>Name: </strong>
                {Pet.PetName}
              </p>
              <p>
                <strong>Microchip: {Pet.Microchip}</strong>
              </p>
              <p>
                <strong>DOB: </strong>
                {Pet.DOB}
              </p>
            </ListGroup.Item>
            <br></br>
            <ListGroup.Item>
              <h2>Customer Information</h2>
              <p>
                <strong>Name: </strong>
                {Customer.FirstName} {Customer.LastName}
              </p>
              <p>
                <strong>Phone: </strong>
                {Customer.Phone}
              </p>
              <p>
                <strong>Address: </strong>
                {Customer.Address}
              </p>
              <p>
                <strong>Email: </strong>
                {Customer.Email}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    ${Payment.PriceAfterDiscount} {'+(tax)'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>RegistrationFees</Col>
                  <Col>
                    ${Payment.RegistrationFees} {'+(tax)'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price After Tax:</Col>
                  <Col>${Payment.PriceAfterTax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Deposit Amount</Col>
                  <Col>${Payment.DepositAmount}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Payment Method</Col>
                  <Col>{Payment.PaymentMethod}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Balance</Col>
                  <Col> ${Payment.RemaningBalance}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <Button variant="success" onClick={handleSubmit}>
              Generate Invoice
            </Button>
          </Card>
          <h4>{success}</h4>
        </Col>
      </Row>
    </>
  )
}

export default Summary
