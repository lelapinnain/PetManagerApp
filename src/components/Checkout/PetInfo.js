import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'

import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { savePetInfo } from '../../actions/checkoutActions'
import FormikControl from '../../components/FormikControl'

function PetInfo() {
  const [initialValues, setInitialValues] = useState({
    petName: '',
    Microchip: '',
    DOB: '',
    Gender: '',
    Color: '',
  })

  const validationSchema = Yup.object({
    petName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    Color: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    Microchip: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    DOB: Yup.date()
      .min(new Date('01-01-2019'))
      .max(new Date())
      .required('Required'),
    Gender: Yup.string().required('Required'),
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useParams()

  const petId = match.id

  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const checkout = useSelector((state) => state.checkout)
  const { Checkout } = checkout
  const { Pet } = Checkout

  const petList = useSelector((state) => state.petList)
  const { pets } = petList

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
    if (Pet) {
      setInitialValues({
        petName: Pet.PetName,
        Microchip: Pet.Microchip,
        DOB: Pet.DOB,
        Color: Pet.Color,
        Gender: Pet.Gender,
      })
    }
    if (petId) {
      pets.map((p, index) => {
        if (pets[index].petId == petId) {
          setInitialValues({
            petName: pets[index].petName,
            Color: pets[index].color,
            Microchip: pets[index].microchip,
            DOB: pets[index].dob.substring(0, 10),
            Gender: pets[index].gender,
          })
        }
      })
    }
  }, [Pet, petId, pets, token, navigate])

  const petCreate = useSelector((state) => state.petCreate)
  const { loading, error } = petCreate

  const onSubmit = (values) => {
    let dataSent = {
      petId,
      PetName: values.petName,
      Microchip: values.Microchip,
      DOB: values.DOB,
      Color: values.Color,
      Gender: values.Gender,
    }
    dispatch(savePetInfo(dataSent))
    navigate('/CheckoutCustomer')
    // try {
    //   if (!petId) {
    //     dispatch(createPet(dataSent))
    //     dispatch(listPets())
    //     navigate('/')
    //   } else {
    //     dataSent = { ...dataSent, petId }
    //     dispatch(UpdatePet(dataSent))
    //     dispatch(listPets())
    //     navigate('/')
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
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
                disabled
              />

              <FormikControl
                control="input"
                type="text"
                name="Microchip"
                label="Microchip"
                disabled
              />
              <FormikControl
                control="input"
                type="date"
                label="Date of birth"
                name="DOB"
                disabled
              />
              <FormikControl
                control="input"
                label="Gender"
                type="text"
                name="Gender"
                disabled
              />
              <FormikControl
                control="input"
                type="text"
                name="Color"
                label="Color"
                disabled
              />

              <Button
                type="submit"
                disabled={!formik.isValid}
                variant="primary"
              >
                Next
              </Button>
            </FormikForm>
          )}
        </Formik>
      </FormContainer>
    </>
  )
}

export default PetInfo
