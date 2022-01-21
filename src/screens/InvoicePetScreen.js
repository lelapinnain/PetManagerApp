import React from 'react'
import PetInfo from '../components/Checkout/PetInfo'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'

function InvoicePetScreen() {
  return (
    <div>
      <CheckoutSteps step1 />
      <PetInfo />
    </div>
  )
}

export default InvoicePetScreen
