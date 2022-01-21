import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import DailyVaccines from '../components/DailyVaccines'
import { getDailyVaccinesList } from '../actions/dailyVaccinesActions'

function DailyVaccineScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useParams()
  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const addVaccine = useSelector((state) => state.addVaccine)
  const { success: successAdd } = addVaccine

  const dailyVaccines = useSelector((state) => state.dailyVaccines)
  const { data } = dailyVaccines

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }

    dispatch(getDailyVaccinesList(match.id))
  }, [token, dispatch, navigate, successAdd, match.id])
  return (
    <>
      <h1>Todays Vaccines </h1>
      <>
        {data && Object.keys(data).length ? (
          <DailyVaccines />
        ) : (
          <>No Vaccines for today</>
        )}
      </>
    </>
  )
}

export default DailyVaccineScreen
