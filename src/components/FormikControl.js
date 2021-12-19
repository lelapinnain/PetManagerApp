import React from 'react'
import Input from './FormikControls/Input'
import Select from './FormikControls/Select'

function FormikControl(props) {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
    case 'select':
      return <Select {...rest} />
    case 'radio':
    case 'date':
    case 'checkbox':
    default:
      return null
  }
}

export default FormikControl
