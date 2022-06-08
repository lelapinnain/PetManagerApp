import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Image, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { createPet, listPets, UpdatePet } from '../actions/petActions'
import FormikControl from '../components/FormikControl'
import { listBreeds } from '../actions/petActions'
import ImageUploadWidget from '../components/ImageUpload/ImageUploadWidget'

const PetAddScreen = () => {
  const [blob, setBlob] = useState('')
  const [initialValues, setInitialValues] = useState({
    petName: '',
    Color: '',
    BuyPrice: '',
    Microchip: '',
    DOB: '',
    TransportationPrice: '',
    Gender: '',
    Images: '',
  })
  const pGender = [
    {
      key: 'Select',
      value: '',
    },
    {
      key: 'Male',
      value: 'Male',
    },
    {
      key: 'Female',
      value: 'Female',
    },
  ]

  const validationSchema = Yup.object({
    petName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),

    Color: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    BuyPrice: Yup.number()
      .required('ERROR: The number is required!')
      .test('Is positive?', 'ERROR: The number must be greater than 0!', (value) => value > 0),
    Microchip: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    DOB: Yup.date().min(new Date('01-01-2019')).max(new Date()).required('Required'),
    TransportationPrice: Yup.number()
      .required('ERROR: The number is required!')
      .test('Is positive?', 'ERROR: The number must be greater than 0!', (value) => value > 0),
    Gender: Yup.string().required('Required'),
    Breed: Yup.string().required('Required'),
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useParams()

  const petId = match.id

  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const petList = useSelector((state) => state.petList)
  const { pets } = petList

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
    dispatch(listBreeds())
    if (petId) {
      pets.map((p, index) => {
        // console.log(pets[index])
        // console.log(dropDownBreedList.find((x) => x.key === pets[index].breed))
        if (pets[index].petId == petId) {
          setInitialValues({
            petName: pets[index].petName,
            Color: pets[index].color,
            BuyPrice: pets[index].buyPrice,
            Microchip: pets[index].microchip,
            DOB: pets[index].dob.substring(0, 10),
            TransportationPrice: pets[index].transportationPrice,
            Gender: pets[index].gender,
            Breed: pets[index].breed,
            Images: pets[index].images,
          })
          // console.log(initialValues)
        }
        return true
      })
    }
  }, [petId, pets, token, navigate, dispatch])

  const petCreate = useSelector((state) => state.petCreate)
  const { loading, error } = petCreate

  const petBreeds = useSelector((state) => state.petBreeds)
  const { breeds } = petBreeds

  const dropDownBreedList = breeds.map((a) => {
    return {
      key: a.name,
      value: a.name,
    }
  })

  const dropDownBreedListWithSelect = [{ key: 'Select', value: '0' }, ...dropDownBreedList]

  const onSubmit = (values) => {
    if (petId) {
      let dataSent = {
        petName: values.petName,
        buyPrice: values.BuyPrice,
        microchip: values.Microchip,
        // Images:
        //   'https://images.theconversation.com/files/319652/original/file-20200310-61148-vllmgm.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip',
        //  File: formData,
        dob: values.DOB,
        transportationPrice: values.TransportationPrice,
        color: values.Color,
        gender: values.Gender,
        breed: values.Breed,
        images: initialValues.Images,
      }
      dataSent = { ...dataSent, petId }
      dispatch(UpdatePet(dataSent))
      dispatch(listPets())
      navigate('/')
    } else {
      let formData = new FormData()
      formData.append('PetName', values.petName)
      formData.append('BuyPrice', values.BuyPrice)
      formData.append('Microchip', values.Microchip)
      formData.append('File', blob)
      formData.append('DOB', values.DOB)
      formData.append('TransportationPrice', values.TransportationPrice)
      formData.append('Gender', values.Gender)
      formData.append('Color', values.Color)
      formData.append('Breed', values.Breed)

      dispatch(createPet(formData))
      dispatch(listPets())
      navigate('/')
    }

    try {
      if (!petId) {
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}

      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <Row>{!petId && <ImageUploadWidget loading={true} setBlob={setBlob} />}</Row>

        <Row>
          <Col md={4}></Col>
          <Col md={4}>{petId && <Image roundedCircle src={initialValues.Images} width={300} height={300} />}</Col>
          <Col md={4}></Col>
        </Row>
        {/* <h3>{initialValues.DOB}123</h3> */}
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <FormikForm>
              <FormikControl control="input" type="text" name="petName" label="Pet Name" />

              <FormikControl control="input" type="text" name="Color" label="Color" />
              <Form.Group className="mb-3">
                {/* <Form.Label>Breed</Form.Label> */}
                {/* <Form.Control
                  as={Field}
                  id="Images"
                  type="text"
                  name="Images"
                /> */}
                <FormikControl
                  control="select"
                  label="Breed"
                  type="text"
                  name="Breed"
                  options={dropDownBreedListWithSelect}
                />
              </Form.Group>

              <FormikControl control="input" type="number" name="BuyPrice" label="Buy Price" />
              <FormikControl control="input" type="number" name="TransportationPrice" label="Transportation Price" />
              <FormikControl control="input" type="text" name="Microchip" label="Microchip" />
              <FormikControl control="input" type="date" label="Date of birth" name="DOB" />
              <FormikControl control="select" label="Gender" type="text" name="Gender" options={pGender} />

              {!petId ? (
                <Button type="submit" disabled={!formik.isValid} variant="primary">
                  Add
                </Button>
              ) : (
                <Button type="submit" disabled={!formik.isValid || formik.isSubmitting} variant="danger">
                  Update
                </Button>
              )}
            </FormikForm>
          )}
        </Formik>
      </FormContainer>
    </>
  )
}

export default PetAddScreen
