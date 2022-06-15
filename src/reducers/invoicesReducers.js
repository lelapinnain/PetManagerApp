import {
  INVOICES_LIST_FAIL,
  INVOICES_LIST_REQUEST,
  INVOICES_LIST_SUCCESS,
  INVOICE_DETAILS_FAIL,
  INVOICE_DETAILS_REQUEST,
  INVOICE_DETAILS_SUCCESS,
} from '../constants/invoicesConstants'

export const invoiceListReducer = (
  state = { invoices: [], pagination: {} },
  action
) => {
  switch (action.type) {
    case INVOICES_LIST_REQUEST:
      return { loading: true, invoices: [], pagination: {} }
    case INVOICES_LIST_SUCCESS:
      return {
        loading: false,
        invoices: action.payload,
        pagination: action.pagination,
        success: true,
      }
    case INVOICES_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const invoiceDetailsReducer = (
  state = { selectedInvoice: {} },
  action
) => {
  switch (action.type) {
    case INVOICE_DETAILS_REQUEST:
      return { loading: true, selectedInvoice: [] }
    case INVOICE_DETAILS_SUCCESS:
      return { loading: false, selectedInvoice: action.payload }
    case INVOICE_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
