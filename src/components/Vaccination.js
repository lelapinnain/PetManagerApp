import React, { useEffect, useState } from 'react'
import { Table, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form as FormikForm, Field } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'

import FormikControl from './FormikControl'
import { addVaccine } from '../actions/vaccineActions'
import { detailsPet } from '../actions/petActions'

function Vaccination(props) {
  const dispatch = useDispatch()
  const petDetails = useSelector((state) => state.petDetails)
  const { pet } = petDetails
  const [Data, setData] = useState([''])
  const [petId, setPetId] = useState('')

  useEffect(() => {
    if (Object.keys(pet).length > 0) {
      setData(pet.vaccinations)
      setPetId(props.petId)
    }
  }, [pet])

  const vaccineList = [
    {
      key: 'Select',
      value: '',
    },
    {
      key: 'IntraTrac3',
      value: 'IntraTrac3',
    },
    {
      key: 'DAPPV',
      value: 'DAPPV',
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

  const initialValues = {
    name: '',
    date: '',
    notes: '',
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    notes: Yup.string().required('Required'),
  })
  const handleSubmit = (values) => {
    //dispatch
    let data = {
      PetId: '75',
      VaccinationId: '2',
      VaccinationDate: '2021-12-24',
      Notes: '123',
    }
    dispatch(addVaccine(data))
    dispatch(detailsPet(petId))
    //console.log(values)
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
          {/* {pet.vaccinations.length > 0
            ? pet.vaccinations.map((item, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{pet.vaccinations[index].name}</td>
                  <td>
                    {moment(pet.vaccinations[index].date).format('MM-DD-yyyy')}
                  </td>
                  <td>{pet.vaccinations[index].notes}</td>
                  <td>Edit/Delete</td>
                </tr>
              ))
            : null} */}
          {Data.map((item, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{Data[index].name}</td>
              <td>{moment(Data[index].date).format('MM-DD-YY')}</td>
              <td>{Data[index].notes}</td>
              <td>Edit/Delete</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Formik
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
                <Button type="submit">
                  <i class="fab fa-plus"></i>
                </Button>
              </div>
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  )
}

export default Vaccination
