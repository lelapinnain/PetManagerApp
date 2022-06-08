import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'

import FormikControl from './FormikControl'
import {
  addVaccine,
  deleteVaccine,
  updateVaccine,
} from '../actions/vaccineActions'

import {
  addDeworming,
  deleteDeworming,
  updateDeworming,
} from '../actions/dewormingActions'

function VacDewormingTable(props) {
  const { type } = props
  const dispatch = useDispatch()
  const petDetails = useSelector((state) => state.petDetails)
  const { pet } = petDetails
  const [vaccination, setVaccination] = useState([''])
  const [deworming, setDeworming] = useState([''])
  const [petId, setPetId] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [initialValues, setInitialValues] = useState({
    name: '',
    date: '',
    notes: '',
    vId: '',
    dewormingHistoryId: '',
    numOfDays: '',
    endDate: '',
  })

  useEffect(() => {
    if (Object.keys(pet).length > 0) {
      setVaccination(pet.vaccinations)
      setDeworming(pet.deworming)
      setPetId(props.petId)
    }
  }, [pet, props])

  const vaccineList = [
    {
      key: 'Select',
      value: '',
    },
    {
      key: 'DAPPV',
      value: '2',
    },
    {
      key: 'Intratrac',
      value: '1',
    },
    {
      key: 'Rabies',
      value: '3',
    },
  ]
  const DewormingList = [
    {
      key: 'Select',
      value: '',
    },
    {
      key: 'Panacur',
      value: '1',
    },
    {
      key: 'Another',
      value: '2',
    },
  ]

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
  })
  const handleSubmit = (values, { resetForm }) => {
    if (type === 'Vaccinations') {
      let data = {
        PetId: petId,
        VaccinationId: values.name,
        VaccinationDate: values.date,
        Notes: values.notes,
      }

      dispatch(addVaccine(data))
      resetForm()
    } else {
      let data = {
        PetId: petId,
        DeWormingId: values.name,
        DewormingDate: values.date,
        NumberOfDays: values.numOfDays,
      }

      dispatch(addDeworming(data))
      resetForm()
    }
  }

  return (
    <>
      <Table responsive hover size="sm" style={{ background: 'white' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>{type} Name</th>
            <th>{type} Date</th>
            <th> {type === 'Vaccinations' ? 'Notes' : 'End Date'}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {type === 'Vaccinations'
            ? vaccination.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{vaccination[index].name}</td>
                  <td>{moment(vaccination[index].date).format('MM-DD-YY')}</td>
                  <td>{vaccination[index].notes}</td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => {
                        setInitialValues({
                          name: vaccination[index].vId,
                          date: moment(vaccination[index].date).format(
                            'YYYY-MM-DD'
                          ),
                          notes: vaccination[index].notes,
                          vId: vaccination[index].id,
                        })
                        setIsUpdating(true)
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="light"
                      onClick={() => {
                        dispatch(deleteVaccine(vaccination[index].id))
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            : deworming.map((item, index) => (
                // <tr key={deworming[index].id}>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{deworming[index].name}</td>
                  <td>
                    {moment(deworming[index].startDate).format('MM-DD-YY')}
                  </td>
                  <td>{moment(deworming[index].endDate).format('MM-DD-YY')}</td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => {
                        //CheckAgain
                        // console.log(deworming[index].dewormingId)
                        setInitialValues({
                          name: deworming[index].dewormingId,
                          date: moment(deworming[index].startDate).format(
                            'YYYY-MM-DD'
                          ),
                          dewormingHistoryId:
                            deworming[index].dewormingHistoryId,

                          numOfDays:
                            moment(deworming[index].startDate).diff(
                              deworming[index].endDate,
                              'days'
                            ) * -1,
                        })

                        setIsUpdating(true)
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="light"
                      onClick={() => {
                        console.log(deworming[index].dewormingHistoryId)
                        dispatch(
                          deleteDeworming(deworming[index].dewormingHistoryId)
                        )
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <FormikForm>
            <div className="flex">
              {type === 'Vaccinations' ? (
                <FormikControl
                  control="select"
                  type="text"
                  label={type}
                  name="name"
                  options={vaccineList}
                />
              ) : (
                <FormikControl
                  control="select"
                  type="text"
                  label={type}
                  name="name"
                  options={DewormingList}
                />
              )}

              <FormikControl
                control="input"
                type="date"
                label="Date"
                name="date"
              />
              {type === 'Vaccinations' ? (
                <FormikControl
                  control="input"
                  type="text"
                  label="Notes"
                  name="notes"
                  options={vaccineList}
                />
              ) : (
                <>
                  <FormikControl
                    control="input"
                    type="number"
                    label="No. of days"
                    name="numOfDays"
                    required
                    options={vaccineList}
                  />
                </>
              )}
              <div className="padding">
                {!isUpdating ? (
                  <Button type="submit">
                    <i className="fab fa-plus"></i>
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        if (type === 'Vaccinations') {
                          let data = {
                            VHistoryID: formik.values.vId,
                            VaccinationId: formik.values.name,
                            VaccinationDate: formik.values.date,
                            Notes: formik.values.notes,
                          }

                          dispatch(updateVaccine(data))
                        } else {
                          let data = {
                            DeWormingHistoryId:
                              formik.values.dewormingHistoryId,
                            DeWormingId: formik.values.name,
                            DewormingDate: formik.values.date,
                            NumberOfDays: formik.values.numOfDays,
                          }
                          console.log(formik.values)

                          dispatch(updateDeworming(data))
                        }
                        setIsUpdating(false)
                        setInitialValues({
                          name: '',
                          date: '',
                          notes: '',
                          vId: '',
                          dewormingHistoryId: '',
                          numOfDays: '',
                        })
                      }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </Button>
                    <Button
                      onClick={() => {
                        setIsUpdating(false)
                        setInitialValues({
                          name: '',
                          date: '',
                          notes: '',
                          vId: '',
                          dewormingHistoryId: '',
                          numOfDays: '',
                        })
                      }}
                    >
                      <i className="fas fa-window-close"></i>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  )
}

export default VacDewormingTable
