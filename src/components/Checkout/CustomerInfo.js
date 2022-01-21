import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'

import FormContainer from '../../components/FormContainer'

import FormikControl from '../../components/FormikControl'
import { saveCustomerInfo } from '../../actions/checkoutActions'

function CustomerInfo() {
  const [initialValues, setInitialValues] = useState({
    FirstName: '',
    LastName: '',
    Address: '',
    Email: '',
    Phone: '',
  })

  const validationSchema = Yup.object({
    FirstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('*'),

    LastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('*'),
    Address: Yup.string().required('*'),
    Email: Yup.string().email().required('*'),
    Phone: Yup.string().required('*'),
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const checkout = useSelector((state) => state.checkout)
  const { Checkout } = checkout
  const { Customer } = Checkout
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
    if (Customer) {
      setInitialValues({
        FirstName: Customer.FirstName,
        LastName: Customer.LastName,
        Address: Customer.Address,
        Email: Customer.Email,
        Phone: Customer.Phone,
      })
    }
  }, [Customer, token, navigate])

  const onSubmit = (values) => {
    let dataSent = {
      FirstName: values.FirstName,
      LastName: values.LastName,
      Address: values.Address,
      Email: values.Email,
      Phone: values.Phone,
    }

    dispatch(saveCustomerInfo(dataSent))
    navigate('/payment')
    //dispatch
  }

  return (
    <>
      {/* {loading && <Loader />}
      {error && <Message>{error}</Message>} */}

      <Link to="/checkout" className="btn btn-light my-3">
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
                name="FirstName"
                label="First Name"
              />

              <FormikControl
                control="input"
                type="text"
                name="LastName"
                label="Last Name"
              />

              <FormikControl
                control="input"
                type="text"
                name="Address"
                label="Address"
              />
              <FormikControl
                control="input"
                type="email"
                name="Email"
                label="Email"
              />
              <FormikControl
                control="input"
                type="text"
                name="Phone"
                label="Phone"
              />

              <Button
                type="submit"
                disabled={!formik.isValid && formik.isSubmitting}
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

export default CustomerInfo
