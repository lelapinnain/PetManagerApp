import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'

import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userLogin } from '../actions/userActions'
import FormikControl from '../components/FormikControl'

function LoginScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
  })

  const validationSchema = Yup.object({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
  })

  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo, loading, error } = userInfo
  const { token } = uInfo

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [navigate, token])

  const submitHandeler = async (values) => {
    dispatch(userLogin(values.email, values.password))
    //console.log(values)

    //
  }
  return (
    <FormContainer>
      <h1>Sign In </h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandeler}
      >
        {(formik) => (
          <FormikForm>
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
            />

            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </FormikForm>
        )}
      </Formik>
      <Row className="py-3">
        <Col>
          New Customer?
          <Link to={'/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
