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

import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
//import reducers

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const test = {}
const initialState = {
  userInfo: { uInfo: { userInfoFromStorage } },
}

const reducer = combineReducers({
  petList: petListReducer,
  petCreate: petCreateReducer,
  petDelete: petDeleteReducer,
  petUpdate: petUpdateReducer,
  petDetails: petDetailsReducer,
  userInfo: userLoginReducer,
  userRegister: userRegisterReducer,
})
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
