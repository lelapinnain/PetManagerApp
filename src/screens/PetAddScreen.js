import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form as FormikForm, Field } from 'formik'
import * as Yup from 'yup'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { createPet, listPets, UpdatePet } from '../actions/petActions'
import FormikControl from '../components/FormikControl'

const PetAddScreen = () => {
  const [initialValues, setInitialValues] = useState({
    petName: '',
    Color: '',
    BuyPrice: '',
    Microchip: '',
    DOB: '',
    TransportationPrice: '',
    Gender: '',
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
    petName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    Color: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    BuyPrice: Yup.number()
      .required('ERROR: The number is required!')
      .test(
        'Is positive?',
        'ERROR: The number must be greater than 0!',
        (value) => value > 0
      ),
    Microchip: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    DOB: Yup.date()
      .min(new Date('01-01-2019'))
      .max(new Date())
      .required('Required'),
    TransportationPrice: Yup.number()
      .required('ERROR: The number is required!')
      .test(
        'Is positive?',
        'ERROR: The number must be greater than 0!',
        (value) => value > 0
      ),
    Gender: Yup.string().required('Required'),
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useParams()

  const petId = match.id

  const petList = useSelector((state) => state.petList)
  const { pets } = petList

  useEffect(() => {
    if (petId) {
      pets.map((p, index) => {
        if (pets[index].petId == petId) {
          setInitialValues({
            petName: pets[index].petName,
            Color: pets[index].color,
            BuyPrice: pets[index].buyPrice,
            Microchip: pets[index].microchip,
            DOB: pets[index].dob.substring(0, 10),
            TransportationPrice: pets[index].transportationPrice,
            Gender: pets[index].gender,
          })
        }
      })
    }
  }, [petId, pets])

  const petCreate = useSelector((state) => state.petCreate)
  const { loading, error } = petCreate

  const onSubmit = (values) => {
    console.log(values)
    let dataSent = {
      PetName: values.petName,
      BuyPrice: values.BuyPrice,
      Microchip: values.Microchip,
      Images:
        'https://images.theconversation.com/files/319652/original/file-20200310-61148-vllmgm.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip',
      DOB: values.DOB,
      TransportationPrice: values.TransportationPrice,
      Color: values.Color,
      Gender: values.Gender,
    }

    try {
      if (!petId) {
        dispatch(createPet(dataSent))
        dispatch(listPets())
        navigate('/')
      } else {
        dataSent = { ...dataSent, petId }
        dispatch(UpdatePet(dataSent))
        navigate('/')
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
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <FormikForm>
              <FormikControl
                control="input"
                type="text"
                name="petName"
                label="Pet Name"
              />

              <FormikControl
                control="input"
                type="text"
                name="Color"
                label="Color"
              />
              <Form.Group className="mb-3">
                <Form.Label>Choose Image</Form.Label>
                <Form.Control
                  as={Field}
                  id="Images"
                  type="text"
                  name="Images"
                />
              </Form.Group>

              <FormikControl
                control="input"
                type="number"
                name="BuyPrice"
                label="Buy Price"
              />
              <FormikControl
                control="input"
                type="number"
                name="TransportationPrice"
                label="Transportation Price"
              />
              <FormikControl
                control="input"
                type="text"
                name="Microchip"
                label="Microchip"
              />
              <FormikControl
                control="input"
                type="date"
                label="Date of birth"
                name="DOB"
              />
              <FormikControl
                control="select"
                label="Gender"
                type="text"
                name="Gender"
                options={pGender}
              />

              {!petId ? (
                <Button
                  type="submit"
                  disabled={!formik.isValid}
                  variant="primary"
                >
                  Add
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  variant="danger"
                >
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
