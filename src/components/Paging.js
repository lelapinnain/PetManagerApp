import React from 'react'
import { Pagination } from 'react-bootstrap'

function Paging({ items, totalPages, currentPage, handleClick }) {
  return (
    <Pagination>
      <Pagination.First
        onClick={(e) => {
          e.preventDefault()
          handleClick(0)
        }}
      />

      <Pagination.Prev />

      <Pagination.Ellipsis />
      {Array.from(Array(totalPages), (e, index) => {
        return (
          <Pagination.Item
            active={currentPage === index + 1}
            key={index + 1}
            onClick={(e) => {
              e.preventDefault()
              handleClick(index + 1)
            }}
          >
            {index + 1}
          </Pagination.Item>
        )
      })}

      <Pagination.Ellipsis />
      <Pagination.Next />
      <Pagination.Last
        onClick={(e) => {
          e.preventDefault()
          handleClick(items.length)
        }}
      />
    </Pagination>
  )
}

export default Paging
