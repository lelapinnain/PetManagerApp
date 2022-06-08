import React, { useState } from 'react'

import { Form } from 'react-bootstrap'

function SearchComponent({ setSearchTerm }) {
  return (
    <Form.Group controlId="search">
      <Form.Control
        autoComplete="off"
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
      />
    </Form.Group>
  )
}

export default SearchComponent
