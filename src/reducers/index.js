import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import portfolio from './portfolio'

export default combineReducers({
  routing: routerReducer,
  portfolio
})
