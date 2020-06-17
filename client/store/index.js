import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import orders from './orders'
import reviews from './reviews'
import tamagotchis from './tamagotchis'

const reducer = combineReducers({user, orders, reviews, tamagotchis})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './orders'
export * from './reviews'
export * from './tamagotchis'
