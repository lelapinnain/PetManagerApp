import {
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
} from '../constants/appointmentsConstants'

export const appointmentAddReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REQUEST:
      return { loading: true }
    case APPOINTMENT_CREATE_SUCCESS:
      return { loading: false, response: action.payload, success: true }
    case APPOINTMENT_CREATE_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

export const appointmentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_UPDATE_REQUEST:
      return { loading: true }
    case APPOINTMENT_UPDATE_SUCCESS:
      return { loading: false, response: action.payload, success: true }
    case APPOINTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

export const appointmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_DELETE_REQUEST:
      return { loading: true }
    case APPOINTMENT_DELETE_SUCCESS:
      return { loading: false, response: action.payload, success: true }
    case APPOINTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

export const appointmentListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return { loading: true }
    case APPOINTMENT_LIST_SUCCESS:
      return { loading: false, appointments: action.payload, success: true }
    case APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}
