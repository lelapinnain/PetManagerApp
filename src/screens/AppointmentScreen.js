import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import AppointmentsTable from '../components/Appointment/AppointmentsTable'

function AppointmentScreen() {
  const [todayDate, setTodayDate] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd
    console.log(today)
    setTodayDate(today)
  }, [])
  return (
    <>
      <Row>
        <Col md={4}>
          <h2>Appointments</h2>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Control
              type="date"
              value={todayDate}
              onChange={(e) => {
                setTodayDate(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Button
            variant="outline-success"
            onClick={() => navigate('/appointmentForm')}
          >
            <i className="fas fa-plus-square"></i>
          </Button>
        </Col>
      </Row>
      <AppointmentsTable todayDate={todayDate} />

      {/* <Appointments /> */}
    </>
  )
}

export default AppointmentScreen
