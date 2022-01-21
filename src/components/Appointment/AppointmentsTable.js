import React, { useEffect } from 'react'
import { Button, Table, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { listAppointments } from '../../actions/appointmentsActions'
import DeleteButton from '../DeleteButton'

function AppointmentsTable({ todayDate }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const appointmentList = useSelector((state) => state.appointmentList)
  const { appointments } = appointmentList

  const addAppointment = useSelector((state) => state.addAppointment)
  const { success: successAdd } = addAppointment

  const updateAppointment = useSelector((state) => state.updateAppointment)
  const { success: successUpdate } = updateAppointment

  const deleteAppointment = useSelector((state) => state.deleteAppointment)
  const { success: successDelete } = deleteAppointment

  useEffect(() => {
    console.log(todayDate)
    if (todayDate) dispatch(listAppointments(todayDate))
  }, [dispatch, todayDate, successAdd, successUpdate, successDelete])
  return appointments ? (
    <Table responsive hover striped size="sm" className="tableBorder">
      <thead>
        <tr>
          <th>#</th>
          <th>Customer Name</th>
          <th>Phone </th>
          <th>Time</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments &&
          appointments.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{appointments[index].customerName}</td>
              <td>{appointments[index].customerPhoneNumber}</td>
              <td>
                <Form.Control
                  control="input"
                  type="time"
                  value={appointments[index].appointmentStartTime}
                  disabled
                  style={{ border: 'none' }}
                />
              </td>
              <td>{appointments[index].notes}</td>
              <td>
                <Button
                  variant="light"
                  onClick={() =>
                    navigate(
                      `/appointmentForm/${appointments[index].appointmentId}`
                    )
                  }
                >
                  Edit
                </Button>
                <DeleteButton id={appointments[index].appointmentId} />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  ) : (
    <>No appointments booked yet</>
  )
}

export default AppointmentsTable
