import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  petListReducer,
  petCreateReducer,
  petDeleteReducer,
  petUpdateReducer,
  petDetailsReducer
} from './reducers/petReducers'
//import reducers

const initialState = {}

const reducer = combineReducers({
  petList: petListReducer,
  petCreate: petCreateReducer,
  petDelete: petDeleteReducer,
  petUpdate:petUpdateReducer,
  petDetails:petDetailsReducer
})
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
