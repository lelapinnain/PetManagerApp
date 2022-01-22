import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Formik, Form as FormikForm, Field } from 'formik'
import * as Yup from 'yup'

import FormContainer from '../FormContainer'
import FormikControl from '../FormikControl'
import { savePaymentInfo } from '../../actions/checkoutActions'

function PaymentInfo() {
  const [initialValues, setInitialValues] = useState({
    ActualPrice: '',
    RegistrationFees: '',
    PriceAfterDiscount: '',
    PaymentMethod: '',
    PickupDate: '',
    DepositAmount: '',
    RemaningBalance: '',
    Tax: '',
    PriceAfterTax: '',
  })
  const pMethod = [
    {
      key: 'Select',
      value: '',
    },
    {
      key: 'CASH',
      value: 'CASH',
    },
    {
      key: 'CARD',
      value: 'CARD',
    },
    {
      key: 'Financing',
      value: 'Financing',
    },
  ]

  const validationSchema = Yup.object({
    ActualPrice: Yup.number().required('*'),
    RegistrationFees: Yup.string().required('*'),
    PriceAfterDiscount: Yup.number().required('*'),
    PaymentMethod: Yup.string().required('Required'),
    PickupDate: Yup.date().required('Required'),
    DepositAmount: Yup.string().required('Required'),
    // RemaningBalance: Yup.string().required('Required'),
    Tax: Yup.string().required('Required'),
    //PriceAfterTax: Yup.string().required('Required'),
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const checkout = useSelector((state) => state.checkout)
  const { Checkout } = checkout
  const { Payment } = Checkout
  useEffect(() => {
    if (!token) {
      navigate('/')
    }

    if (Object.keys(Payment).length > 0) {
      setInitialValues({
        ActualPrice: Payment.ActualPrice,
        RegistrationFees: Payment.RegistrationFees,
        PriceAfterDiscount: Payment.PriceAfterDiscount,
        PaymentMethod: Payment.PaymentMethod,
        PickupDate: Payment.PickupDate,
        DepositAmount: Payment.DepositAmount,
        RemaningBalance: Payment.RemaningBalance,
        Tax: Payment.Tax,
        PriceAfterTax: Payment.PriceAfterTax,
      })
    } else {
      setInitialValues({
        ActualPrice: '',
        RegistrationFees: '',
        PriceAfterDiscount: '',
        PaymentMethod: '',
        PickupDate: moment(new Date()).format('yyyy-MM-DD'),
        DepositAmount: '',
        RemaningBalance: '',
        Tax: 8.375,
        PriceAfterTax: '',
      })
    }
  }, [Payment, token, navigate])

  const onSubmit = (values) => {
    let data = {
      ActualPrice: values.ActualPrice,
      DiscountAmount: values.ActualPrice - values.PriceAfterDiscount,
      RegistrationFees: values.RegistrationFees,
      PriceAfterDiscount: values.PriceAfterDiscount,
      PaymentMethod: values.PaymentMethod,
      PickupDate: values.PickupDate,
      DepositAmount: values.DepositAmount,
      Tax: values.Tax,
      PriceAfterTax:
        parseFloat(values.PriceAfterDiscount) +
        parseFloat(values.RegistrationFees) +
        ((parseFloat(values.PriceAfterDiscount) +
          parseFloat(values.RegistrationFees)) *
          8.375) /
          100,
      RemaningBalance:
        parseFloat(values.PriceAfterDiscount) +
        parseFloat(values.RegistrationFees) +
        ((parseFloat(values.PriceAfterDiscount) +
          parseFloat(values.RegistrationFees)) *
          8.375) /
          100 -
        parseFloat(values.DepositAmount),
    }
    dispatch(savePaymentInfo(data))
    navigate('/Summary')
  }

  return (
    <>
      {/* {loading && <Loader />}
      {error && <Message>{error}</Message>} */}

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
                name="ActualPrice"
                label="Actual Price"
              />

              <FormikControl
                control="input"
                type="text"
                name="PriceAfterDiscount"
                label="Price After Discound"
              />
              <Form.Group className="mb-3">
                <Form.Label>Discount Amount</Form.Label>
                <Form.Control
                  as={Field}
                  id="DiscoundAmount"
                  type="text"
                  name="DiscoundAmount"
                  value={
                    formik.values.ActualPrice -
                      formik.values.PriceAfterDiscount ==
                    'NaN'
                      ? 0
                      : formik.values.ActualPrice -
                        formik.values.PriceAfterDiscount
                  }
                  disabled
                />
              </Form.Group>

              <FormikControl
                control="select"
                label="PaymentMethod"
                type="text"
                name="PaymentMethod"
                options={pMethod}
              />

              <FormikControl
                control="input"
                type="text"
                name="RegistrationFees"
                label="Registration Fees"
              />
              <FormikControl
                control="input"
                type="decimal"
                name="Tax"
                label="Tax"
              />
              <FormikControl
                control="input"
                type="date"
                label="Pickup Date"
                name="PickupDate"
              />

              <Form.Group className="mb-3">
                <Form.Label>Total Balance</Form.Label>
                <Form.Control
                  as={Field}
                  id="Total"
                  type="text"
                  name="Total"
                  value={
                    formik.values.PriceAfterDiscount +
                      formik.values.RegistrationFees +
                      ((formik.values.PriceAfterDiscount +
                        formik.values.RegistrationFees) *
                        formik.values.Tax) /
                        100 ==
                    'NaN'
                      ? 0
                      : parseFloat(formik.values.PriceAfterDiscount) +
                        parseFloat(formik.values.RegistrationFees) +
                        ((parseFloat(formik.values.PriceAfterDiscount) +
                          parseFloat(formik.values.RegistrationFees)) *
                          parseFloat(8.375)) /
                          100
                  }
                  disabled
                />
              </Form.Group>

              <FormikControl
                control="input"
                type="decimal"
                name="DepositAmount"
                label="Deposit Amount"
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

export default PaymentInfo
