import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { detailsInvoice } from '../../actions/InvoiceActions'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'

function InvoiceDetails({ invoice }) {
  const params = useParams()
  const invoiceId = params.id
  const dispatch = useDispatch()

  const invoiceDetails = useSelector((state) => state.invoiceDetails)
  const { selectedInvoice } = invoiceDetails

  useEffect(() => {
    dispatch(detailsInvoice(invoiceId))
  }, [invoiceId, dispatch])

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
                {selectedInvoice.petName}
              </p>
              <p>
                <strong>Microchip: {selectedInvoice.microchip}</strong>
              </p>
              <p>
                <strong>DOB: </strong>
                {selectedInvoice.dob}
              </p>
            </ListGroup.Item>
            <br></br>
            <ListGroup.Item>
              <h2>Customer Information</h2>
              <p>
                <strong>Name: </strong>
                {selectedInvoice.firstName} {selectedInvoice.lastName}
              </p>
              <p>
                <strong>Phone: </strong>
                {selectedInvoice.phone}
              </p>
              <p>
                <strong>Address: </strong>
                {selectedInvoice.address}
              </p>
              <p>
                <strong>Email: </strong>
                {selectedInvoice.email}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Payment Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    ${selectedInvoice.priceAfterDiscount} {'+(tax)'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>RegistrationFees</Col>
                  <Col>
                    ${selectedInvoice.registrationFees} {'+(tax)'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price After Tax:</Col>
                  <Col>${selectedInvoice.priceAfterTax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Deposit Amount</Col>
                  <Col>${selectedInvoice.depositAmount}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Payment Method</Col>
                  <Col>{selectedInvoice.paymentMethod}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Balance</Col>
                  <Col> ${selectedInvoice.remainingBalance}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <Button variant="success">Generate Invoice</Button>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default InvoiceDetails
