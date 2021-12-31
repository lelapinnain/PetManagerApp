import {
  DEWORMING_ADD_FAIL,
  DEWORMING_ADD_REQUEST,
  DEWORMING_ADD_SUCCESS,
  DEWORMING_DELETE_FAIL,
  DEWORMING_DELETE_REQUEST,
  DEWORMING_DELETE_SUCCESS,
  DEWORMING_UPDATE_FAIL,
  DEWORMING_UPDATE_REQUEST,
  DEWORMING_UPDATE_SUCCESS,
} from '../constants/dewormingConstants'

export const dewormingAddReducer = (state = {}, action) => {
  switch (action.type) {
    case DEWORMING_ADD_REQUEST:
      return { loading: true }
    case DEWORMING_ADD_SUCCESS:
      return { loading: false, response: action.payload, success: true }
    case DEWORMING_ADD_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

export const dewormingUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEWORMING_UPDATE_REQUEST:
      return { loading: true }
    case DEWORMING_UPDATE_SUCCESS:
      return { loading: false, response: action.payload, success: true }
    case DEWORMING_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

export const dewormingDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEWORMING_DELETE_REQUEST:
      return { loading: true }
    case DEWORMING_DELETE_SUCCESS:
      return { loading: false, response: action.payload, success: true }
    case DEWORMING_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}
