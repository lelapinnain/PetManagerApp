import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import moment from 'moment'

import { addVaccine, postponeVaccine } from '../actions/vaccineActions'
import Loader from './Loader'

function DailyVaccines() {
  const match = useParams()
  const dispatch = useDispatch()
  const type = match.id

  const dailyVaccines = useSelector((state) => state.dailyVaccines)
  const { data: vaccineList, loading } = dailyVaccines

  useEffect(() => {}, [type, dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Table
          responsive
          hover
          striped
          size="sm"
          style={{ border: '1px solid', 'border-width': '3px' }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Pet Name</th>
              <th>Date of birth</th>
              <th>Microchip</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vaccineList &&
              vaccineList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{vaccineList[index].petName}</td>
                  <td>{vaccineList[index].dob}</td>
                  <td>{vaccineList[index].microchip}</td>
                  <td>
                    <Button
                      variant="light"
                      onClick={(e) => {
                        // e.preventDefault()

                        let data = {
                          PetId: vaccineList[index].petId,
                          VaccinationId: type,
                          VaccinationDate: moment().toDate(),
                        }
                        dispatch(addVaccine(data))
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="light"
                      onClick={(e) => {
                        // e.preventDefault()
                        dispatch(postponeVaccine(vaccineList[index].petId))
                      }}
                    >
                      Postpone
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default DailyVaccines
