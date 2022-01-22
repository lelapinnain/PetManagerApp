import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  petListReducer,
  petCreateReducer,
  petDeleteReducer,
  petUpdateReducer,
  petDetailsReducer,
} from './reducers/petReducers'

import {
  vaccineAddReducer,
  vaccineUpdateReducer,
  vaccineDeleteReducer,
  vaccinePostponeReducer,
} from './reducers/vaccinesReducers'

import {
  dewormingAddReducer,
  dewormingUpdateReducer,
  dewormingDeleteReducer,
} from './reducers/dewormingReducers'

import { dailyVaccinesReducer } from './reducers/dailyVaccinesReducers'

import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  appointmentAddReducer,
  appointmentDeleteReducer,
  appointmentListReducer,
  appointmentUpdateReducer,
} from './reducers/appointmentReducers'

import {
  checkoutReducer,
  generateInvoiceReducer,
} from './reducers/checkoutReducers'
//import reducers

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : { token: '' }

const customerInfoFromStorage = localStorage.getItem('customerInfo')
  ? JSON.parse(localStorage.getItem('customerInfo'))
  : {}

const petInfoFromStorage = localStorage.getItem('petInfo')
  ? JSON.parse(localStorage.getItem('petInfo'))
  : {}

const paymentInfoFromStorage = localStorage.getItem('paymentInfo')
  ? JSON.parse(localStorage.getItem('paymentInfo'))
  : {}

const initialState = {
  userInfo: { uInfo: userInfoFromStorage },
  checkout: {
    Checkout: {
      Pet: petInfoFromStorage,
      Customer: customerInfoFromStorage,
      Payment: paymentInfoFromStorage,
    },
  },
}

const reducer = combineReducers({
  petList: petListReducer,
  petCreate: petCreateReducer,
  petDelete: petDeleteReducer,
  petUpdate: petUpdateReducer,
  petDetails: petDetailsReducer,

  userInfo: userLoginReducer,
  userRegister: userRegisterReducer,

  addVaccine: vaccineAddReducer,
  updateVaccine: vaccineUpdateReducer,
  deleteVaccine: vaccineDeleteReducer,
  postponeVaccine: vaccinePostponeReducer,

  addDeworming: dewormingAddReducer,
  updateDeworming: dewormingUpdateReducer,
  deleteDeworming: dewormingDeleteReducer,

  appointmentList: appointmentListReducer,
  addAppointment: appointmentAddReducer,
  updateAppointment: appointmentUpdateReducer,
  deleteAppointment: appointmentDeleteReducer,

  dailyVaccines: dailyVaccinesReducer,

  checkout: checkoutReducer,
  generateInvoice: generateInvoiceReducer,
})
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
