import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Summary from '../components/Checkout/Summary'

function InvoiceSummaryScreen() {
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Summary />
    </>
  )
}

export default InvoiceSummaryScreen
