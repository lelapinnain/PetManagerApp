import {
  DAILY_VACCINE_FAIL,
  DAILY_VACCINE_REQUEST,
  DAILY_VACCINE_SUCCESS,
} from '../constants/dailyVaccinesConstants'

export const dailyVaccinesReducer = (state = {}, action) => {
  switch (action.type) {
    case DAILY_VACCINE_REQUEST:
      return { loading: true }
    case DAILY_VACCINE_SUCCESS:
      return { loading: false, data: action.payload, success: true }
    case DAILY_VACCINE_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}
