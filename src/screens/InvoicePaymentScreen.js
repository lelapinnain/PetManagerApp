import React from 'react'

import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import PaymentInfo from '../components/Checkout/PaymentInfo'

function InvoicePaymentScreen() {
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <PaymentInfo />
    </div>
  )
}

export default InvoicePaymentScreen
