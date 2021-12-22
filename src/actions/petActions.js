import axios from 'axios'

import {
  PET_CREATE_FAIL,
  PET_CREATE_REQUEST,
  PET_CREATE_SUCCESS,
  PET_DELETE_FAIL,
  PET_DELETE_REQUEST,
  PET_DELETE_SUCCESS,
  PET_DETAILS_FAIL,
  PET_DETAILS_REQUEST,
  PET_DETAILS_SUCCESS,
  PET_LIST_FAIL,
  PET_LIST_REQUEST,
  PET_LIST_SUCCESS,
  PET_UPDATE_FAIL,
  PET_UPDATE_REQUEST,
  PET_UPDATE_SUCCESS,
} from '../constants/petConstants'
import { USER_LOGOUT } from '../constants/userConstants'

export const listPets = () => async (dispatch, getState) => {
  //console.log(getState())
  const {
    userInfo: {
      uInfo: { token },
    },
  } = getState()

  try {
    dispatch({ type: PET_LIST_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get('/PetManager/GetAllPetInfo/', config)

    dispatch({
      type: PET_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    if (error.toString().includes('401')) {
      // console.log(error)
      dispatch({ type: USER_LOGOUT })
    }
    dispatch({
      type: PET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsPet = (id) => async (dispatch) => {
  try {
    dispatch({ type: PET_DETAILS_REQUEST })

    const { data } = await axios.get(`/PetManager/GetPetInfo/?petId=${id}`)

    dispatch({
      type: PET_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPet = (data) => async (dispatch) => {
  try {
    dispatch({ type: PET_CREATE_REQUEST })
    const config = {
      headers: {
        // "Content-type": "multipart/form-data"
        'Content-type': 'application/json',
      },
    }
    await axios.post('PetManager/AddPetInfo', data, config)

    dispatch({
      type: PET_CREATE_SUCCESS,
    })
    dispatch(listPets())
  } catch (error) {
    //console.log(error);
    dispatch({
      type: PET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const deletePet = (PetId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    console.log({ PetId })
    let data = { PetId: PetId }
    dispatch({ type: PET_DELETE_REQUEST })
    // axios.delete()
    await axios.delete(`PetManager/DeletePetInfo`, data, config)
    dispatch({ type: PET_DELETE_SUCCESS })
    dispatch(listPets())
  } catch (error) {
    console.log(error)
    dispatch({
      type: PET_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const UpdatePet = (data) => async (dispatch) => {
  try {
    dispatch({ type: PET_UPDATE_REQUEST })
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    console.log(data)
    await axios.put('PetManager/UpdatePetInfo', data, config)

    dispatch({
      type: PET_UPDATE_SUCCESS,
    })
    dispatch(listPets())
  } catch (error) {
    console.log(error.response.data)
    dispatch({
      type: PET_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
