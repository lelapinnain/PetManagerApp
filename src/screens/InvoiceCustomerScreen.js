import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import CustomerInfo from '../components/Checkout/CustomerInfo'

function InvoiceCustomerScreen() {
  return (
    <div>
      <CheckoutSteps step1 step2 />
      <CustomerInfo />
    </div>
  )
}

export default InvoiceCustomerScreen
