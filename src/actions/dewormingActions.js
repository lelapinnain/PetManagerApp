import axios from 'axios'

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

export const addDeworming = (inputData) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    dispatch({ type: DEWORMING_ADD_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.post(
      '/PetManager/AddDeworming/',
      inputData,
      config
    )

    dispatch({
      type: DEWORMING_ADD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DEWORMING_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateDeworming = (inputData) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    dispatch({ type: DEWORMING_UPDATE_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.put(
      '/PetManager/UpdateDeworming/',
      inputData,
      config
    )

    dispatch({
      type: DEWORMING_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DEWORMING_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteDeworming = (id) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    dispatch({ type: DEWORMING_DELETE_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.delete(
      '/PetManager/DeleteDeworming/',
      { data: { DewormingHistoryId: id } },
      config
    )

    dispatch({
      type: DEWORMING_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DEWORMING_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
