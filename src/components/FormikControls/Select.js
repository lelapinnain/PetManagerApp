import React from 'react'
import { Form } from 'react-bootstrap'
import { Field, ErrorMessage } from 'formik'
import Message from '../Message'

function Select({ label, name, options }) {
  return (
    <Form.Group>
      <Form.Label>{label} </Form.Label>
      <Field as={Form.Select} id={name} name={name}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        ))}
      </Field>
      <ErrorMessage component={Message} name={name} />
    </Form.Group>
  )
}

export default Select
