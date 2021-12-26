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

function Vaccination(props) {
  const dispatch = useDispatch()
  const petDetails = useSelector((state) => state.petDetails)
  const { pet } = petDetails
  const [Data, setData] = useState([''])
  const [petId, setPetId] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [initialValues, setInitialValues] = useState({
    name: '',
    date: '',
    notes: '',
    vId: '',
  })

  useEffect(() => {
    if (Object.keys(pet).length > 0) {
      setData(pet.vaccinations)
      setPetId(props.petId)
    }
  }, [pet, props.petId])

  const vaccineList = [
    {
      key: 'Select',
      value: '',
    },
    {
      key: 'DAPPV',
      value: '1',
    },
    {
      key: 'Intratrac3',
      value: '2',
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
      value: 'Panacur',
    },
  ]
  const { type } = props

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    notes: Yup.string().required('Required'),
  })
  const handleSubmit = (values, { resetForm }) => {
    let data = {
      PetId: petId,
      VaccinationId: values.name,
      VaccinationDate: values.date,
      Notes: values.notes,
    }

    dispatch(addVaccine(data))
    resetForm()
  }

  return (
    <>
      <Table responsive striped hover size="sm" style={{ background: 'white' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>{type} Name</th>
            <th>{type} Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((item, index) => (
            <tr key={Data[index].id}>
              <td>{index + 1}</td>
              <td>{Data[index].name}</td>
              <td>{moment(Data[index].date).format('MM-DD-YY')}</td>
              <td>{Data[index].notes}</td>
              <td>
                <a
                  onClick={() => {
                    setInitialValues({
                      name: Data[index].vId,
                      date: moment(Data[index].date).format('YYYY-MM-DD'),
                      notes: Data[index].notes,
                      vId: Data[index].id,
                    })
                    setIsUpdating(true)
                  }}
                >
                  Edit
                </a>
                /
                <a
                  onClick={() => {
                    dispatch(deleteVaccine(Data[index].id))
                  }}
                >
                  Delete
                </a>
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

              <FormikControl
                control="input"
                type="text"
                label="Notes"
                name="notes"
                options={vaccineList}
              />

              <div className="padding">
                {!isUpdating ? (
                  <Button type="submit">
                    <i class="fab fa-plus"></i>
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        let data = {
                          VHistoryID: formik.values.vId,
                          VaccinationId: formik.values.name,
                          VaccinationDate: formik.values.date,
                          Notes: formik.values.notes,
                        }

                        dispatch(updateVaccine(data))
                        setIsUpdating(false)
                        setInitialValues({
                          name: '',
                          date: '',
                          notes: '',
                          vId: '',
                        })
                      }}
                    >
                      <i class="fas fa-pencil-alt"></i>
                    </Button>
                    <Button
                      onClick={() => {
                        setIsUpdating(false)
                        setInitialValues({
                          name: '',
                          date: '',
                          notes: '',
                          vId: '',
                        })
                      }}
                    >
                      <i class="fas fa-window-close"></i>
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

export default Vaccination
