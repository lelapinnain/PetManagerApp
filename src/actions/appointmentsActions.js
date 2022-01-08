import axios from 'axios'

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
import { USER_LOGOUT } from '../constants/userConstants'

export const listAppointments =
  (AppointmentDate) => async (dispatch, getState) => {
    const {
      userInfo: {
        uInfo: { token },
      },
    } = getState()

    try {
      dispatch({ type: APPOINTMENT_LIST_REQUEST })
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios.get(
        `/PetManager/GetAppointmentByDate/?AppointmentDate=${AppointmentDate}`,
        config
      )

      dispatch({
        type: APPOINTMENT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      if (error.toString().includes('401')) {
        dispatch({ type: USER_LOGOUT })
      }
      dispatch({
        type: APPOINTMENT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const createAppointment = (data) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    dispatch({ type: APPOINTMENT_CREATE_REQUEST })

    await axios.post('/PetManager/AddAppointment', data, config)

    dispatch({
      type: APPOINTMENT_CREATE_SUCCESS,
    })
  } catch (error) {
    if (error.toString().includes('401')) {
      dispatch({ type: USER_LOGOUT })
    }
    dispatch({
      type: APPOINTMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const DeleteAppointment = (ApptId) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    dispatch({ type: APPOINTMENT_DELETE_REQUEST })
    axios.delete(
      '/PetManager/DeleteAppointment',
      { data: { ApptId: ApptId } },
      config
    )

    dispatch({ type: APPOINTMENT_DELETE_SUCCESS })
  } catch (error) {
    if (error.toString().includes('401')) {
      dispatch({ type: USER_LOGOUT })
    }
    dispatch({
      type: APPOINTMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const UpdateAppointment = (data) => async (dispatch, getState) => {
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    dispatch({ type: APPOINTMENT_UPDATE_REQUEST })

    await axios.put('/PetManager/UpdateAppointment', data, config)

    dispatch({
      type: APPOINTMENT_UPDATE_SUCCESS,
    })
  } catch (error) {
    if (error.toString().includes('401')) {
      dispatch({ type: USER_LOGOUT })
    }
    dispatch({
      type: APPOINTMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
