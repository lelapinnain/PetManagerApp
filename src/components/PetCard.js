import React from 'react'
import Moment from 'react-moment'
import { useNavigate } from 'react-router'
import { Card, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deletePet, listPets } from '../actions/petActions'

function PetCard({ data }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const editHandeler = () => {
    navigate(`/${data.petId}`)
  }
  const deleteHandeler = () => {
    if (window.confirm(`are you sure you want to delete ${data.petId} ?`)) {
      dispatch(deletePet(data.petId))
      //navigate('/')
    }
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img
        variant="top"
        fuild="true"
        src={data.images}
        onClick={() => navigate(`/PetDetails/${data.petId}`)}
      />
      <Card.Body>
        <Card.Title>{data.petName}</Card.Title>
        <Card.Text>
          Dob: <Moment format="MM/DD/YYYY" date={data.dob} />
        </Card.Text>
        <Card.Text>Microchip: {data.microchip}</Card.Text>
      </Card.Body>
      <div style={{ display: 'flex' }}>
        <Button onClick={editHandeler}>Edit</Button>
        <Button variant={'danger'} onClick={deleteHandeler}>
          Delete
        </Button>
      </div>
    </Card>
  )
}

export default PetCard
