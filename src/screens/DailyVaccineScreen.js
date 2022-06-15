import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import DailyVaccines from '../components/DailyVaccines'
import { getDailyVaccinesList } from '../actions/dailyVaccinesActions'
import Message from '../components/Message'

function DailyVaccineScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useParams()
  const userInfo = useSelector((state) => state.userInfo)
  const { uInfo } = userInfo
  const { token } = uInfo

  const addVaccine = useSelector((state) => state.addVaccine)
  const { success: successAdd, error: errorAdd } = addVaccine

  const dailyVaccines = useSelector((state) => state.dailyVaccines)
  const { data } = dailyVaccines

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }

    dispatch(getDailyVaccinesList(match.id))
  }, [token, dispatch, navigate, successAdd, errorAdd, match.id])
  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <h1>
        Todays{' '}
        {match.id == 1 ? `IntraTrac3` : match.id == 2 ? `DAPPV` : `Rabies`}{' '}
      </h1>
      <>
        {data && Object.keys(data).length ? (
          <>
            <DailyVaccines />
            {errorAdd && <Message>{errorAdd}</Message>}
          </>
        ) : (
          <>No Vaccines for today</>
        )}
      </>
    </>
  )
}

export default DailyVaccineScreen
