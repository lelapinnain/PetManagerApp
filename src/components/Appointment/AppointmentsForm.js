import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'

import Loader from '../../components/Loader'
//import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import {
  UpdateAppointment,
  createAppointment,
} from '../../actions/appointmentsActions'
import FormikControl from '../../components/FormikControl'

function AppointmentsForm() {
  const [initialValues, setInitialValues] = useState({
    CustomerName: '',
    CustomerPhone: '',
    AppointmentDate: '',
    AppointmentTime: '',
    AppointmentDuration: '',
    Notes: '',
  })
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validationSchema = Yup.object({
    CustomerName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('*'),

    CustomerPhone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('*'),
    AppointmentDate: Yup.date().required('*'),
    AppointmentTime: Yup.string().required('*'),
    AppointmentDuration: Yup.number().required('*'),
    Notes: Yup.string().required('*'),
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useParams()

  const apptId = match.id

  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const appointmentList = useSelector((state) => state.appointmentList)
  const { appointments, loading } = appointmentList

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
    if (apptId) {
      if (!loading) {
        appointments.map((p, index) => {
          if (appointments[index].appointmentId == apptId) {
            setInitialValues({
              CustomerName: appointments[index].customerName,
              CustomerPhone: appointments[index].customerPhoneNumber,
              AppointmentDate: appointments[index].appointmentDate.substring(
                0,
                10
              ),
              AppointmentTime: appointments[index].appointmentStartTime,
              AppointmentDuration: appointments[index].appointmentDuration,
              Notes: appointments[index].notes,
            })
          }
          return
        })
      }
    }
  }, [apptId, appointments, token, navigate, loading])

  const onSubmit = (values) => {
    console.log(values)
    let dataSent = {
      CustomerName: values.CustomerName,
      CustomerPhone: values.CustomerPhone,
      AppointmentDate: values.AppointmentDate,
      AppointmentTime: values.AppointmentTime,
      AppointmentDuration: values.AppointmentDuration,
      Notes: values.Notes,
    }

    try {
      if (!apptId) {
        dispatch(createAppointment(dataSent))
        navigate('/Appointments')
      } else {
        dataSent = { ...dataSent, ApptId: apptId }
        console.log(dataSent)
        dispatch(UpdateAppointment(dataSent))
        console.log('here')
        navigate('/Appointments')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {loading && <Loader />}

      <Link to="/Appointments" className="btn btn-light my-3">
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
                name="CustomerName"
                label="Customer Name"
                autoComplete="off"
              />

              <FormikControl
                control="input"
                type="text"
                name="CustomerPhone"
                label="Customer Phone"
                autoComplete="off"
              />

              <FormikControl
                control="input"
                type="date"
                name="AppointmentDate"
                label="Appointment Date"
                autoComplete="off"
              />

              <FormikControl
                control="input"
                type="time"
                name="AppointmentTime"
                label="Appointment Time"
                autoComplete="off"
              />
              <FormikControl
                control="input"
                type="number"
                name="AppointmentDuration"
                label="Appointment Duration"
                autoComplete="off"
              />
              <FormikControl
                control="input"
                type="string"
                name="Notes"
                label="Notes"
                autoComplete="off"
              />

              {!apptId ? (
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

export default AppointmentsForm
