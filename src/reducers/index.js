import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import portfolio from './portfolio'

export default combineReducers({
  routing: routerReducer,
  auth,
  portfolio
})
