import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import DailyVaccines from '../components/DailyVaccines'
import { getDailyVaccinesList } from '../actions/dailyVaccinesActions'
import FormContainer from '../components/FormContainer'

function DailyVaccineScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useParams()
  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const addVaccine = useSelector((state) => state.addVaccine)
  const { success: successAdd, error: errorAdd } = addVaccine

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }

    dispatch(getDailyVaccinesList(match.id))
  }, [token, dispatch, navigate, successAdd])
  return (
    <>
      <h1>Todays Vaccines </h1>
      <FormContainer>
        <DailyVaccines />
      </FormContainer>
    </>
  )
}

export default DailyVaccineScreen
