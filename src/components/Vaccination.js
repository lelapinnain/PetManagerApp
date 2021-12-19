import React from 'react'
import { Table, Form, Button } from 'react-bootstrap'
import { Formik, Form as FormikForm, Field } from 'formik'
import * as Yup from 'yup'

import FormikControl from './FormikControl'

function Vaccination(props) {
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
  const { type, data } = props
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
    console.log(values)
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
          {data.map((item, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{data[index].name}</td>
              <td>{data[index].date}</td>
              <td>{data[index].notes}</td>
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
