import {
  CHECKOUT_CUSTOMER_ADD,
  // CHECKOUT_CUSTOMER_RESET,
  CHECKOUT_PET_ADD,
  // CHECKOUT_PET_RESET,
  CHECKOUT_PAYMENT_ADD,
  // CHECKOUT_PAYMENT_RESET,
  CHECKOUT_RESET,
} from '../constants/checkoutConstants'

export const savePetInfo = (data) => (dispatch) => {
  dispatch({
    type: CHECKOUT_PET_ADD,
    payload: data,
  })

  localStorage.setItem('petInfo', JSON.stringify(data))
}

export const saveCustomerInfo = (data) => (dispatch) => {
  dispatch({
    type: CHECKOUT_CUSTOMER_ADD,
    payload: data,
  })

  localStorage.setItem('customerInfo', JSON.stringify(data))
}

export const savePaymentInfo = (data) => (dispatch) => {
  dispatch({
    type: CHECKOUT_PAYMENT_ADD,
    payload: data,
  })

  localStorage.setItem('paymentInfo', JSON.stringify(data))
}

export const resetCheckout = (data) => (dispatch) => {
  dispatch({
    type: CHECKOUT_RESET,
    payload: data,
  })

  localStorage.removeItem('customerInfo')
  localStorage.removeItem('paymentInfo')
  localStorage.removeItem('petInfo')
}
