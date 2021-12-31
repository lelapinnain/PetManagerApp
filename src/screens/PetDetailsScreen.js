import React, { useEffect } from 'react'
import { Table, Row, Col, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import moment from 'moment'

import FormContainer from '../components/FormContainer'
import { detailsPet } from '../actions/petActions'
import VacDewormingTable from '../components/VacDewormingTable'
import Message from '../components/Message'
import Loader from '../components/Loader'

function PetDetailsScreen() {
  const dispatch = useDispatch()
  const match = useParams()
  const navigate = useNavigate()

  const petId = match.id

  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const petDetails = useSelector((state) => state.petDetails)
  const { pet, loading } = petDetails

  const addVaccine = useSelector((state) => state.addVaccine)
  const { success: successAdd, error: errorAdd } = addVaccine

  const deleteVaccine = useSelector((state) => state.deleteVaccine)
  const { success: successDelete } = deleteVaccine
  const updateVaccine = useSelector((state) => state.updateVaccine)
  const { success: successUpdate } = updateVaccine

  const addDeworming = useSelector((state) => state.addDeworming)
  const { success: successAddDeworming } = addDeworming
  const deleteDeworming = useSelector((state) => state.deleteDeworming)
  const { success: successDeleteDeworming } = deleteDeworming
  const updateDeworming = useSelector((state) => state.updateDeworming)
  const { success: successUpdateDeworming } = updateDeworming

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    dispatch(detailsPet(petId))
  }, [
    dispatch,
    navigate,
    petId,
    successAdd,
    successDelete,
    successUpdate,
    updateVaccine,
    token,
    successAddDeworming,
    successDeleteDeworming,
    successUpdateDeworming,
  ])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Table>
          <Row>
            <Col>
              <h1>Details on {pet.petName}</h1>
              <FormContainer>
                <Form>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={pet.images} fluid="true" />
                  </Card>

                  <Form.Group controlId="color">
                    <Form.Label>{pet.petName} Color </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter color"
                      value={pet.color}
                      required
                      disabled
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="buyPrice">
                    <Form.Label>Buy Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Price"
                      required
                      value={pet.buyPrice}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="transportationPrice">
                    <Form.Label>Transportation Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Price"
                      required
                      value={pet.transportationPrice}
                      disabled
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="microchip">
                    <Form.Label>Microchip </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter microchip"
                      value={pet.microchip}
                      required
                      disabled
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="dob">
                    <Form.Label>Date of birth </Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      value={moment(pet.dob).format('MM/DD/YYYY')}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Gender </Form.Label>
                    <Form.Select value={pet.gender} required disabled>
                      <option>Open this select menu</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </FormContainer>
            </Col>

            <Col>
              <h2>Vaccinations</h2>
              <VacDewormingTable type={'Vaccinations'} petId={petId} />
              {errorAdd && <Message>{errorAdd}</Message>}
              <hr className="solid"></hr>
              <h2>Deworming</h2>
              <VacDewormingTable type={'Deworming'} petId={petId} />
            </Col>
          </Row>
        </Table>
      )}
    </>
  )
}

export default PetDetailsScreen
