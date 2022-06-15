import React, { useEffect, useState } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { listInvoices } from '../../actions/InvoiceActions'
import { useNavigate } from 'react-router'
import moment from 'moment'

import SearchComponent from '../SearchComponent'
import Paging from '../Paging'

function InvoicesTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const invoicesList = useSelector((state) => state.invoicesList)
  const { invoices, pagination } = invoicesList

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    dispatch(listInvoices(0))
  }, [dispatch, token, navigate])

  const handleClick = (nextPageIndex) => {
    dispatch(listInvoices(nextPageIndex))
  }

  return (
    <>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <SearchComponent setSearchTerm={setSearchTerm} />
        </Col>
        <Col md={4}></Col>
      </Row>

      <Table
        responsive
        hover
        striped
        size='sm'
        className='tableBorder'
        style={{ margin: '20px' }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Pet Name </th>
            <th>Date</th>
            <th>Price</th>
            <th>Desposit</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices &&
            invoices
              .filter((val) => {
                if (searchTerm === '') {
                  return val
                } else if (
                  val.firstName
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase()) ||
                  val.lastName
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
                ) {
                  return val
                } else {
                }
              })
              .map((inv) => (
                <tr key={inv.invoiceId}>
                  <td>{inv.invoiceId}</td>
                  <td>
                    {inv.firstName} {inv.lastName}
                  </td>
                  <td>{inv.petName}</td>
                  <td>{moment(inv.dateOfPurchase).format('MM-DD-YY')}</td>
                  <td>{inv.priceAfterTax}</td>
                  <td>{inv.depositAmount}</td>
                  <td>{inv.remainingBalance}</td>

                  <td>
                    <Button
                      variant='info'
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/Invoices/${inv.invoiceId}`)
                      }}
                    >
                      Edit
                    </Button>
                    <Button variant='danger'>Delete</Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      {pagination && (
        <Paging
          items={invoices}
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          handleClick={handleClick}
        />
      )}
    </>
  )
}

export default InvoicesTable
