import axios from 'axios'

import {
  VACCINE_ADD_FAIL,
  VACCINE_ADD_REQUEST,
  VACCINE_ADD_SUCCESS,
  VACCINE_DELETE_FAIL,
  VACCINE_DELETE_REQUEST,
  VACCINE_DELETE_SUCCESS,
  VACCINE_POSTPONE_FAIL,
  VACCINE_POSTPONE_REQUEST,
  VACCINE_POSTPONE_SUCCESS,
  VACCINE_UPDATE_FAIL,
  VACCINE_UPDATE_REQUEST,
  VACCINE_UPDATE_SUCCESS,
} from '../constants/vaccineConstants'

export const addVaccine = (inputData) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    dispatch({ type: VACCINE_ADD_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.post(
      '/PetManager/AddVaccination/',
      inputData,
      config
    )

    dispatch({
      type: VACCINE_ADD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VACCINE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateVaccine = (inputData) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    dispatch({ type: VACCINE_UPDATE_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.put(
      '/PetManager/UpdateVaccination/',
      inputData,
      config
    )

    dispatch({
      type: VACCINE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VACCINE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteVaccine = (id) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    dispatch({ type: VACCINE_DELETE_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.delete(
      '/PetManager/DeleteVaccination/',
      { data: { Id: id } },
      config
    )

    dispatch({
      type: VACCINE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VACCINE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const postponeVaccine = (id) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()
  try {
    dispatch({ type: VACCINE_POSTPONE_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.post(
      '/PetManager/PostponeVaccine/',
      { PetId: id },
      config
    )

    dispatch({
      type: VACCINE_POSTPONE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VACCINE_POSTPONE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
