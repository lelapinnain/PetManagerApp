import React from 'react'
import { Form } from 'react-bootstrap'
import { Field, ErrorMessage } from 'formik'

function Input(props) {
  const { label, name, ...rest } = props

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Field
        as={Form.Control}
        id={name}
        name={name}
        {...rest}
        placeholder={`Enter ${label}`}
      ></Field>
      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </Form.Group>
  )
}

export default Input
