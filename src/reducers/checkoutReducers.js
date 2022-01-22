import {
  CHECKOUT_CUSTOMER_ADD,
  CHECKOUT_CUSTOMER_RESET,
  CHECKOUT_PET_ADD,
  CHECKOUT_PET_RESET,
  CHECKOUT_PAYMENT_ADD,
  CHECKOUT_PAYMENT_RESET,
  CHECKOUT_RESET,
  INVOICE_CREATE_REQUEST,
  INVOICE_CREATE_SUCCESS,
  INVOICE_CREATE_FAIL,
} from '../constants/checkoutConstants'

export const checkoutReducer = (
  // state = { cartItems: [], shippingAddress: {}, paymentMethod: {} },
  state = {
    Checkout: {
      Pet: {},
      Customer: {},
      Payment: {},
    },
  },

  action
) => {
  switch (action.type) {
    case CHECKOUT_CUSTOMER_ADD:
      return {
        ...state,
        Checkout: { ...state.Checkout, Customer: action.payload },
      }

    case CHECKOUT_CUSTOMER_RESET:
      return {
        ...state,
        Checkout: { Customer: {} },
      }
    case CHECKOUT_PET_ADD:
      return {
        ...state,
        Checkout: { ...state.Checkout, Pet: action.payload },
      }

    case CHECKOUT_PET_RESET:
      return {
        ...state,
        Checkout: { CustPetomer: {} },
      }

    case CHECKOUT_PAYMENT_ADD:
      return {
        ...state,
        Checkout: { ...state.Checkout, Payment: action.payload },
      }

    case CHECKOUT_PAYMENT_RESET:
      return {
        ...state,
        Checkout: { Payment: {} },
      }

    case CHECKOUT_RESET:
      return {
        ...state,
        Checkout: {
          Pet: {},
          Customer: {},
          Payment: {},
        },
      }

    default:
      return state
  }
}

export const generateInvoiceReducer = (state = {}, action) => {
  switch (action.type) {
    case INVOICE_CREATE_REQUEST:
      return { loading: true }
    case INVOICE_CREATE_SUCCESS:
      return { loading: false, response: action.payload, success: true }
    case INVOICE_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}
