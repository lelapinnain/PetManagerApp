import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { createPet , listPets , UpdatePet } from '../actions/petActions'

const PetAddScreen = () => {
  const [PetName, setPetName] = useState('')
  const [BuyPrice, setBuyPrice] = useState('')
  const [Microchip, setMicrochip] = useState('')
  const [Images, setImages] = useState('')
  const [DOB, setDob] = useState('')
  const [TransportationPrice, setTransportationPrice] = useState('')
  const [Gender, setGender] = useState('')
  const [Color, setColor] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useParams()
  const petId = match.id

  const petList = useSelector((state) => state.petList)
  const { loading: test, pets } = petList

  useEffect(() => {
    if (petId) {
      const pet = pets.map((p, index) => {
        //p.petId === petId
        if (pets[index].petId == petId) {
          setPetName(pets[index].petName)
          setColor(pets[index].color)
          setBuyPrice(pets[index].buyPrice)
          setMicrochip(pets[index].microchip)
          setTransportationPrice(pets[index].transportationPrice)
          setDob(pets[index].dob.substring(0, 10))
          setGender(pets[index].gender)
        }
      })
    }
  }, [petId])

  const petCreate = useSelector((state) => state.petCreate)
  const { loading, error } = petCreate


  const updateHandeler = (e) => {
    e.preventDefault()
    const dataSent = {
      petId,
      PetName,
      BuyPrice,
      Microchip,
      Images:
        'https://images.theconversation.com/files/319652/original/file-20200310-61148-vllmgm.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip',
      DOB,
      TransportationPrice,
      Color,
      Gender,
    }
    dispatch(UpdatePet(dataSent))
    navigate('/')
  }
  const submitHandeler = (e) => {
    e.preventDefault()
    const dataSent = {
      PetName,
      BuyPrice,
      Microchip,
      Images:
        'https://images.theconversation.com/files/319652/original/file-20200310-61148-vllmgm.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip',
      DOB,
      TransportationPrice,
      Color,
      Gender,
    }

    try {
      dispatch(createPet(dataSent))
      dispatch(listPets())
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {loading && <Loader />}
      {error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <FormContainer>
            <h1>{!petId?"Add Pet":"Update Pet"}</h1>

            <Form onSubmit={submitHandeler}>
              <Form.Group controlId="petName">
                <Form.Label>Pet Name </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={PetName}
                  required
                  onChange={(e) => {
                    setPetName(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="color">
                <Form.Label>Pet Color </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter color"
                  value={Color}
                  required
                  onChange={(e) => {
                    setColor(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="images" className="mb-3">
                <Form.Label>Choose Image</Form.Label>
                <Form.Control type="file" />
              </Form.Group>

              <Form.Group controlId="buyPrice">
                <Form.Label>Buy Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  required
                  value={BuyPrice}
                  onChange={(e) => {
                    setBuyPrice(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="transportationPrice">
                <Form.Label>Transportation Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  required
                  value={TransportationPrice}
                  onChange={(e) => {
                    setTransportationPrice(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="microchip">
                <Form.Label>Microchip </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter microchip"
                  value={Microchip}
                  required
                  onChange={(e) => {
                    setMicrochip(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="dob">
                <Form.Label>Date of birth </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter dob"
                  value={DOB}
                  required
                  onChange={(e) => {
                    setDob(e.target.value)
                    console.log(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Gender </Form.Label>
                <Form.Select
                  value={Gender}
                  required
                  onChange={(e) => {
                    // console.log(e.target.value)
                    setGender(e.target.value)
                  }}
                >
                  <option>Open this select menu</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
              {!petId ? (
                <Button type="submit" variant="primary">
                  Add
                </Button>
              ) : (
                <Button variant="danger" onClick={updateHandeler}>
                  Update
                </Button>
              )}
            </Form>
          </FormContainer>
        </>
      )}
    </>
  )
}

export default PetAddScreen
