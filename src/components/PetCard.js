import React from 'react'
import Moment from 'react-moment'
import { useNavigate } from 'react-router'
import { Card, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deletePet } from '../actions/petActions'

function PetCard({ data }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const editHandeler = () => {
    navigate(`/add/${data.petId}`)
  }

  // const editHandeler = () => {
  //   navigate(`/PetDetails/${data.petId}`)
  // }

  const deleteHandeler = () => {
    if (window.confirm(`are you sure you want to delete ${data.petId} ?`)) {
      dispatch(deletePet(data.petId))
      //navigate('/')
    }
  }
  const sellHandeler = () => {
    navigate(`/checkout/${data.petId}`)
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img
        variant="top"
        fuild="true"
        src={data.images}
        width={60}
        height={160}
        onClick={() => navigate(`/PetDetails/${data.petId}`)}
      />
      {/* <ListGroup variant="flush" style={{ border: 'none' }}>
        <ListGroup.Item style={{ textAlign: 'center' }}>{data.petName}</ListGroup.Item>
        <ListGroup.Item style={{ textAlign: 'center' }}>
          Dob: <Moment format="MM/DD/YYYY" date={data.dob} />
        </ListGroup.Item>
        <ListGroup.Item style={{ textAlign: 'center' }}>Microchip: {data.microchip}</ListGroup.Item>
        <ListGroup.Item style={{ textAlign: 'center' }}>Gender: {data.gender}</ListGroup.Item>
      </ListGroup> */}
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}>{data.petName}</Card.Title>
        <Card.Text style={{ textAlign: 'center' }}>
          Dob: <Moment format="MM/DD/YYYY" date={data.dob} />
        </Card.Text>
        <Card.Text style={{ textAlign: 'center' }}>Microchip: {data.microchip}</Card.Text>
      </Card.Body>
      {/* <div style={{ display: 'flex' }}> */}
      <Row>
        <Col md={3}>
          <Button style={{ width: '100%' }} variant={'success'} onClick={sellHandeler}>
            <i className="fa-solid fa-cart-plus"></i>
          </Button>
        </Col>
        <Col md={3}>
          <Button style={{ width: '100%' }} onClick={editHandeler}>
            <i className="fa fa-info"></i>
          </Button>
        </Col>
        <Col md={3}>
          <Button variant={'danger'} onClick={deleteHandeler} style={{ width: '100%' }}>
            <i className="fa fa-trash"></i>
          </Button>
        </Col>
        <Col md={3}>
          <Button variant={'warning'} style={{ width: '100%' }} onClick={() => navigate(`/PetDetails/${data.petId}`)}>
            <i className="fa fa-syringe"></i>
          </Button>
        </Col>
      </Row>
      {/* </div> */}
    </Card>
  )
}

export default PetCard
