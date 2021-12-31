import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import Loader from '../components/Loader'
import Message from '../components/Message'
import PetCard from '../components/PetCard'
import { listPets } from '../actions/petActions'

function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const petList = useSelector((state) => state.petList)
  const { loading, error, pets } = petList

  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const petDelete = useSelector((state) => state.petDelete)
  const { success: successDelete } = petDelete

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    dispatch(listPets())
  }, [dispatch, token, successDelete, navigate])

  return (
    <>
      {loading && <Loader />}
      {error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={2}>
              <h2>Available</h2>
            </Col>
            <Col md={8}>
              <Form.Group controlId="search">
                <Form.Control
                  autoComplete="off"
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button
                variant="outline-success"
                onClick={() => {
                  navigate('/add')
                }}
              >
                <i className="fas fa-plus-square"></i>
              </Button>
            </Col>
          </Row>
          <Row>
            {pets
              .filter((val) => {
                if (searchTerm === '') {
                  return val
                } else if (
                  val.petName
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase()) ||
                  val.microchip
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase()) ||
                  val.dob
                    .toLocaleLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
                ) {
                  return val
                } else {
                }
              })
              .map((pet, i) => (
                <Col key={i + 1} sm={12} md={6} lg={4} xl={3}>
                  <PetCard data={pet} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
