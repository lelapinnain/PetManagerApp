import axios from 'axios'
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
        Accept: 'application/pdf',
        Authorization: `Bearer ${token}`,
      },
    }
    // axios
    //   .post(`/PetManager/SubmitInvoice/`, data, {
    //     responseType: 'arraybuffer',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/pdf',
    //     },
    //   })
    //   .then((response) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]))
    //     const link = document.createElement('a')
    //     link.href = url
    //     link.setAttribute('download', 'file.pdf') //or any other extension
    //     document.body.appendChild(link)
    //     link.click()
    //   })
    //   .catch((error) => console.log(error))

    const response = await axios.post(
      `/PetManager/SubmitInvoice/`,
      data,
      config
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'file.pdf') //or any other extension
    document.body.appendChild(link)
    link.click()
    console.log(response)
    dispatch({
      type: INVOICE_CREATE_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    dispatch({
      type: INVOICE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
