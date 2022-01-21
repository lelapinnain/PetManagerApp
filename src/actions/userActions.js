import axios from 'axios'

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants'

import { resetCheckout } from '../actions/checkoutActions'

export const userLogin = (email, password) => (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST })

  axios
    .get(`/PetManager/Login/?email=${email}&password=${password}`)
    .then((res) => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: res.data,
      })
      localStorage.setItem('userInfo', JSON.stringify(res.data))
    })
    .catch((error) => {
      // console.log(error.response.data.errors.Password);
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.erros,
      })
    })
  // console.log(data)
}

export const userRegister = (sentData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    await axios.post('/PetManager/Register', sentData, config)
    // console.log(data)
    dispatch({
      type: USER_REGISTER_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch(resetCheckout())
  dispatch({ type: USER_LOGOUT })
}
