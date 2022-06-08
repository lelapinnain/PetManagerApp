import axios from 'axios'

import { USER_LOGOUT } from '../constants/userConstants'
import {
  INVOICES_LIST_FAIL,
  INVOICES_LIST_REQUEST,
  INVOICES_LIST_SUCCESS,
  INVOICE_DETAILS_FAIL,
  INVOICE_DETAILS_REQUEST,
  INVOICE_DETAILS_SUCCESS,
} from '../constants/invoicesConstants'

export const listInvoices = () => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    dispatch({ type: INVOICES_LIST_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get('/PetManager/GetInvoicesAll/', config)

    dispatch({
      type: INVOICES_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    if (error.toString().includes('401')) {
      dispatch({ type: USER_LOGOUT })
    }
    dispatch({
      type: INVOICES_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const detailsInvoice = (id) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    dispatch({ type: INVOICE_DETAILS_REQUEST })

    const { data } = await axios.get(`/PetManager/GetInvoiceDetails/?id=${id}`, config)

    dispatch({
      type: INVOICE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    if (error.toString().includes('401')) {
      dispatch({ type: USER_LOGOUT })
    }

    dispatch({
      type: INVOICE_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
