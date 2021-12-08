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



export const listPets = () => async (dispatch) => {
  try {
    dispatch({ type: PET_LIST_REQUEST })

    const { data } = await axios.get('/PetManager/GetAllPetInfo/')
    console.log(data)
    dispatch({
      type: PET_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
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
        'Content-type': 'application/json',
      },
    }
    await axios.post('PetManager/AddPetInfo', data, config)

    dispatch({
      type: PET_CREATE_SUCCESS,
    })
    dispatch (listPets())
    
  } catch (error) {
    console.log(error)
    dispatch({
      type: PET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const deletePet = (id) => async (dispatch) => {
  try {
    dispatch({ type: PET_DELETE_REQUEST })
    await axios.delete(`PetManager/DeletePetInfo/?petId=${id}`)
    dispatch({ type: PET_DELETE_SUCCESS })
    dispatch (listPets())
  } catch (error) {
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
    await axios.put('PetManager/UpdatePetInfo', data, config)

    dispatch({
      type: PET_UPDATE_SUCCESS,
    })
    
  } catch (error) {
    console.log(error)
    dispatch({
      type: PET_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}