import {
  VACCINE_ADD_FAIL,
  VACCINE_ADD_REQUEST,
  VACCINE_ADD_SUCCESS,
  VACCINE_DELETE_FAIL,
  VACCINE_DELETE_REQUEST,
  VACCINE_DELETE_SUCCESS,
  VACCINE_UPDATE_FAIL,
  VACCINE_UPDATE_REQUEST,
  VACCINE_UPDATE_SUCCESS,
} from '../constants/vaccineConstants'

export const vaccineAddReducer = (state = {}, action) => {
  switch (action.type) {
    case VACCINE_ADD_REQUEST:
      return { loading: true }
    case VACCINE_ADD_SUCCESS:
      return { loading: false, response: action.payload, success: true }
    case VACCINE_ADD_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

export const vaccineUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case VACCINE_UPDATE_REQUEST:
      return { loading: true }
    case VACCINE_UPDATE_SUCCESS:
      return { loading: false, response: action.payload, success: true }
    case VACCINE_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

export const vaccineDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VACCINE_DELETE_REQUEST:
      return { loading: true }
    case VACCINE_DELETE_SUCCESS:
      return { loading: false, response: action.payload, success: true }
    case VACCINE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}
