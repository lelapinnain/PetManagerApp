import axios from 'axios'

import {
  DAILY_VACCINE_FAIL,
  DAILY_VACCINE_REQUEST,
  DAILY_VACCINE_SUCCESS,
} from '../constants/dailyVaccinesConstants'

export const getDailyVaccinesList = (id) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    dispatch({ type: DAILY_VACCINE_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(
      `/PetManager/GetDailyVaccinations/?VaccineType=${id}`,
      config
    )
    // console.log(response)
    dispatch({
      type: DAILY_VACCINE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DAILY_VACCINE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
