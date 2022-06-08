import axios from 'axios'
import download from 'downloadjs'
import {
  CHECKOUT_CUSTOMER_ADD,
  // CHECKOUT_CUSTOMER_RESET,
  CHECKOUT_PET_ADD,
  // CHECKOUT_PET_RESET,
  CHECKOUT_PAYMENT_ADD,
  // CHECKOUT_PAYMENT_RESET,
  CHECKOUT_RESET,
  INVOICE_CREATE_REQUEST,
  INVOICE_CREATE_SUCCESS,
  INVOICE_CREATE_FAIL,
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

export const generateInvoiceAction = (data) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    dispatch({ type: INVOICE_CREATE_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
        // Accept: 'application/pdf',
        // responseType: 'blob',
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.post(`/PetManager/SubmitInvoice/`, data, { config, responseType: 'blob' })

    const content = response.headers['content-type']
    download(response.data, '7enkesh', content)

    dispatch({
      type: INVOICE_CREATE_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: INVOICE_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
