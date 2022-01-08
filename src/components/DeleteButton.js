import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

import { DeleteAppointment } from '../actions/appointmentsActions'

function DeleteButton({ id }) {
  const dispatch = useDispatch()
  return (
    <Button variant="light" onClick={() => dispatch(DeleteAppointment(id))}>
      Delete
    </Button>
  )
}

export default DeleteButton
